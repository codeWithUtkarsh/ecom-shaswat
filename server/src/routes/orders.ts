import { Router, Request, Response, NextFunction } from 'express';
import { jsonOk, jsonError } from '../helpers/response';

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
 * Checkout: creates an order from the user's current cart.
 * Server calculates totals — never trusts client-sent amounts.
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { shipping_address } = req.body;

    if (!shipping_address) {
      return jsonError(res, 'shipping_address is required', 400);
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

    // 2. Calculate total server-side & validate stock
    let subtotal = 0;
    const orderItems: { product_id: string; product_name: string; product_price: number; quantity: number }[] = [];

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
    const tax = subtotal * 0.2; // 20% VAT
    const totalAmount = subtotal + shipping + tax;

    // TODO: Stripe PaymentIntent creation goes here
    // const paymentIntent = await stripe.paymentIntents.create({ ... });

    // 3. Create order
    const { data: order, error: orderError } = await req.supabase
      .from('orders')
      .insert({
        user_id: req.user!.id,
        status: 'pending',
        total_amount: Math.round(totalAmount * 100) / 100,
        shipping_address,
      })
      .select()
      .single();

    if (orderError) return jsonError(res, orderError.message, 500);

    // 4. Create order items
    const { error: itemsError } = await req.supabase
      .from('order_items')
      .insert(orderItems.map((item) => ({ ...item, order_id: order.id })));

    if (itemsError) return jsonError(res, itemsError.message, 500);

    // 5. Clear the cart
    await req.supabase
      .from('cart_items')
      .delete()
      .eq('user_id', req.user!.id);

    // 6. Return created order with items
    const { data: fullOrder } = await req.supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', order.id)
      .single();

    return jsonOk(res, {
      order: fullOrder,
      summary: {
        subtotal: Math.round(subtotal * 100) / 100,
        shipping,
        tax: Math.round(tax * 100) / 100,
        total: Math.round(totalAmount * 100) / 100,
      },
    }, 201);
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
