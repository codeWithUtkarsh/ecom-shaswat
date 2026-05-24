import { Router, Request, Response, NextFunction } from 'express';
import { jsonOk, jsonError } from '../helpers/response';
import { env } from '../config/env';
import { getPolar } from '../lib/polar';

const router = Router();

/**
 * GET /api/orders
 * User's orders, most recent first.
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await req.supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', req.user!.id)
      .order('created_at', { ascending: false });

    if (error) return jsonError(res, error.message, 500);

    return jsonOk(res, { orders: data });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/orders
 * Creates a pending order from the user's cart and a Polar checkout session.
 * Returns the Polar checkout URL for the frontend to redirect to.
 *
 * Polar acts as Merchant of Record: it collects payment, handles VAT/tax
 * for the buyer's jurisdiction, and reports completion via webhook.
 * We only pass the pre-tax goods + shipping amount; Polar adds tax on top.
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!env.POLAR_PRODUCT_ID) {
      return jsonError(
        res,
        'Payment is not configured. POLAR_PRODUCT_ID is missing.',
        503
      );
    }

    // 1. Fetch cart items with product details
    const { data: cartItems, error: cartError } = await req.supabase
      .from('cart_items')
      .select('id, quantity, product:products(id, name, price, in_stock)')
      .eq('user_id', req.user!.id);

    if (cartError) return jsonError(res, cartError.message, 500);
    if (!cartItems || cartItems.length === 0) {
      return jsonError(res, 'Cart is empty', 400);
    }

    // 2. Calculate subtotal server-side & validate stock.
    //    NOTE: Polar handles tax (VAT/sales tax) as Merchant of Record, so we
    //    only pre-tax goods + shipping. Tax is added at the Polar checkout.
    let subtotal = 0;
    const orderItems: {
      product_id: string;
      product_name: string;
      product_price: number;
      quantity: number;
    }[] = [];

    for (const item of cartItems) {
      const product = item.product as any;
      if (!product) continue;
      if (!product.in_stock) {
        return jsonError(res, `"${product.name}" is out of stock`, 400);
      }
      subtotal += product.price * item.quantity;
      orderItems.push({
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        quantity: item.quantity,
      });
    }

    const shipping = subtotal > 500 ? 0 : 14.99;
    const preTaxTotal = subtotal + shipping;
    const amountInPence = Math.round(preTaxTotal * 100);

    // Polar requires a minimum amount per checkout (configured on the product).
    // A cart full of £0 quote-only items would create an invalid checkout, so
    // we catch it here with a clear message.
    if (subtotal < 1) {
      return jsonError(
        res,
        'Your cart contains only quote-required items. Submit a quote request for each instead — once sales replies with pricing, you can place a normal order.',
        400
      );
    }

    // 3. Create pending order (no payment yet).
    const { data: order, error: orderError } = await req.supabase
      .from('orders')
      .insert({
        user_id: req.user!.id,
        status: 'pending',
        total_amount: preTaxTotal,
        currency: 'GBP',
      })
      .select()
      .single();

    if (orderError) return jsonError(res, orderError.message, 500);

    // 4. Create order items
    const { error: itemsError } = await req.supabase
      .from('order_items')
      .insert(orderItems.map((item) => ({ ...item, order_id: order.id })));

    if (itemsError) return jsonError(res, itemsError.message, 500);

    // 5. Create Polar checkout session
    let checkoutUrl: string;
    let polarCheckoutId: string;
    try {
      const polar = getPolar();
      const checkout = await polar.checkouts.create({
        products: [env.POLAR_PRODUCT_ID],
        amount: amountInPence,
        customerEmail: req.user!.email ?? undefined,
        externalCustomerId: req.user!.id,
        successUrl: `${env.FRONTEND_URL}/checkout/success?checkout_id={CHECKOUT_ID}`,
        requireBillingAddress: true,
        metadata: {
          order_id: order.id,
          user_id: req.user!.id,
        },
      });
      checkoutUrl = checkout.url;
      polarCheckoutId = checkout.id;
    } catch (err: any) {
      // Roll back the order so we don't leave orphaned pending rows.
      await req.supabase.from('orders').delete().eq('id', order.id);
      return jsonError(
        res,
        `Failed to create checkout: ${err.message || 'unknown error'}`,
        502
      );
    }

    // 6. Save checkout id on order for webhook reconciliation
    await req.supabase
      .from('orders')
      .update({ polar_checkout_id: polarCheckoutId })
      .eq('id', order.id);

    return jsonOk(
      res,
      {
        order_id: order.id,
        checkout_url: checkoutUrl,
        summary: {
          subtotal: Math.round(subtotal * 100) / 100,
          shipping,
          pre_tax_total: preTaxTotal,
          currency: 'GBP',
          tax_note: 'Tax is calculated by Polar at checkout based on billing address.',
        },
      },
      201
    );
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/orders/:id
 * Single order with items.
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { data: order, error } = await req.supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', id)
      .eq('user_id', req.user!.id)
      .single();

    if (error || !order) return jsonError(res, 'Order not found', 404);

    return jsonOk(res, { order });
  } catch (err) {
    next(err);
  }
});

export default router;
