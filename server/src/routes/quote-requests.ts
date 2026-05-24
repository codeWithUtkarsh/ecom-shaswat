import { Router, Request, Response, NextFunction } from 'express';
import { jsonOk, jsonError } from '../helpers/response';
import { env } from '../config/env';
import { getPolar } from '../lib/polar';
import {
  sendEmail,
  quoteRequestSalesNotification,
  quoteRequestCustomerConfirmation,
} from '../lib/email';

const router = Router();

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/* ------------------------------------------------------------------ *
 *  Batch grouping helper — collapses N rows sharing a batch_id into
 *  one object with nested items. Batch-level fields are taken from
 *  the first row (they're always equal across the batch).
 * ------------------------------------------------------------------ */
interface BatchShape {
  batch_id: string;
  user_id: string;
  message: string | null;
  status: string;
  sales_notes: string | null;
  order_id: string | null;
  created_at: string;
  quoted_at: string | null;
  items: Array<{
    id: string;
    product_id: string | null;
    product_name: string;
    quantity: number;
    quoted_price: number | null;
  }>;
}

function groupIntoBatches(rows: any[]): BatchShape[] {
  const byBatch = new Map<string, BatchShape>();
  for (const row of rows) {
    let batch = byBatch.get(row.batch_id);
    if (!batch) {
      batch = {
        batch_id: row.batch_id,
        user_id: row.user_id,
        message: row.message,
        status: row.status,
        sales_notes: row.sales_notes,
        order_id: row.order_id,
        created_at: row.created_at,
        quoted_at: row.quoted_at,
        items: [],
      };
      byBatch.set(row.batch_id, batch);
    }
    batch.items.push({
      id: row.id,
      product_id: row.product_id,
      product_name: row.product_name,
      quantity: row.quantity,
      quoted_price: row.quoted_price != null ? Number(row.quoted_price) : null,
    });
  }
  // Newest batch first (by created_at).
  return Array.from(byBatch.values()).sort((a, b) =>
    b.created_at.localeCompare(a.created_at)
  );
}

/**
 * GET /api/quote-requests
 * Current user's quote requests, grouped by batch_id (newest first).
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await req.supabase
      .from('quote_requests')
      .select('*')
      .eq('user_id', req.user!.id)
      .order('created_at', { ascending: false });

    if (error) return jsonError(res, error.message, 500);
    return jsonOk(res, { batches: groupIntoBatches(data ?? []) });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/quote-requests
 * Submit one row of a quote request. The frontend cart loops through quote
 * items in a basket and posts each one with a shared batch_id (generated
 * client-side) so the admin sees them as one logical submission.
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { product_id, quantity, message, batch_id } = req.body ?? {};

    if (!product_id || typeof product_id !== 'string') {
      return jsonError(res, 'product_id is required', 400);
    }
    const qty = Number(quantity);
    if (!Number.isInteger(qty) || qty < 1) {
      return jsonError(res, 'quantity must be a positive integer', 400);
    }
    if (message != null && (typeof message !== 'string' || message.length > 2000)) {
      return jsonError(res, 'message must be a string up to 2000 characters', 400);
    }
    if (batch_id != null && (typeof batch_id !== 'string' || !UUID_RE.test(batch_id))) {
      return jsonError(res, 'batch_id must be a valid UUID', 400);
    }

    // Verify the product exists and is genuinely quote-only.
    const { data: product, error: productError } = await req.supabase
      .from('products')
      .select('id, name, price')
      .eq('id', product_id)
      .single();

    if (productError || !product) {
      return jsonError(res, 'Product not found', 404);
    }
    if (Number(product.price) > 0) {
      return jsonError(
        res,
        'This product has a published price — add it to the cart and check out normally instead of requesting a quote.',
        400
      );
    }

    // Build insert payload — if no batch_id provided, the DB default
    // (uuid_generate_v4()) gives this row its own batch of 1.
    const insertPayload: Record<string, any> = {
      user_id: req.user!.id,
      product_id: product.id,
      product_name: product.name,
      quantity: qty,
      message: message ?? null,
    };
    if (batch_id) insertPayload.batch_id = batch_id;

    const { data: created, error: insertError } = await req.supabase
      .from('quote_requests')
      .insert(insertPayload)
      .select()
      .single();

    if (insertError) return jsonError(res, insertError.message, 500);

    // Fire-and-forget emails — don't block the response on email delivery.
    // Note: each item in a batch will currently send its own sales-notify email.
    // A nicer V2 would debounce/coalesce per batch, but for V1 the admin
    // dashboard groups them visually so multiple emails are tolerable.
    void (async () => {
      if (env.SALES_EMAIL) {
        await sendEmail({
          to: env.SALES_EMAIL,
          subject: `New quote request — ${product.name} (qty ${qty})`,
          html: quoteRequestSalesNotification({
            customerEmail: req.user!.email ?? 'unknown',
            productName: product.name,
            quantity: qty,
            message: message ?? null,
            quoteRequestId: created.id,
          }),
        });
      } else {
        console.log(
          `[quote-request] new from user=${req.user!.id} email=${req.user!.email ?? '?'} product="${product.name}" qty=${qty} batch=${created.batch_id} (SALES_EMAIL not set)`
        );
      }
      if (req.user!.email) {
        await sendEmail({
          to: req.user!.email,
          subject: `We received your quote request — ${product.name}`,
          html: quoteRequestCustomerConfirmation({
            productName: product.name,
            quantity: qty,
          }),
        });
      }
    })();

    return jsonOk(res, { quote_request: created }, 201);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/quote-requests/batch/:batchId/accept
 * Customer accepts the whole batch → creates ONE order with all items at
 * their quoted prices, links every quote row to it, and returns a Polar
 * checkout URL for the batch total.
 */
router.post('/batch/:batchId/accept', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!env.POLAR_PRODUCT_ID) {
      return jsonError(res, 'Payment is not configured. POLAR_PRODUCT_ID is missing.', 503);
    }

    const batchId = String(req.params.batchId ?? '');
    if (!UUID_RE.test(batchId)) {
      return jsonError(res, 'Invalid batch id', 400);
    }

    // Load all rows in the batch; RLS ensures only the owner sees them.
    const { data: rows, error: loadError } = await req.supabase
      .from('quote_requests')
      .select('*')
      .eq('batch_id', batchId);

    if (loadError) return jsonError(res, loadError.message, 500);
    if (!rows || rows.length === 0) {
      return jsonError(res, 'Quote batch not found', 404);
    }

    // Validate every item in the batch is quoted and priced.
    for (const r of rows) {
      if (r.status !== 'quoted') {
        return jsonError(
          res,
          `Batch contains items in status '${r.status}' — cannot accept until every item is quoted.`,
          400
        );
      }
      if (r.quoted_price == null) {
        return jsonError(res, `Item "${r.product_name}" has no price set.`, 400);
      }
    }

    const subtotal = rows.reduce(
      (sum, r) => sum + Number(r.quoted_price) * r.quantity,
      0
    );
    const shipping = subtotal > 500 ? 0 : 14.99;
    const preTaxTotal = subtotal + shipping;
    const amountInPence = Math.round(preTaxTotal * 100);

    if (preTaxTotal < 1) {
      return jsonError(res, 'Batch total below minimum charge.', 400);
    }

    // 1. Create one pending order for the whole batch.
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

    // 2. Create one order_items row per quote item.
    const { error: itemsError } = await req.supabase
      .from('order_items')
      .insert(
        rows.map((r) => ({
          order_id: order.id,
          product_id: r.product_id,
          product_name: r.product_name,
          product_price: Number(r.quoted_price),
          quantity: r.quantity,
        }))
      );

    if (itemsError) {
      await req.supabase.from('orders').delete().eq('id', order.id);
      return jsonError(res, itemsError.message, 500);
    }

    // 3. Polar checkout for the batch total.
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
          quote_batch_id: batchId,
        },
      });
      checkoutUrl = checkout.url;
      polarCheckoutId = checkout.id;
    } catch (err: any) {
      await req.supabase.from('orders').delete().eq('id', order.id);
      return jsonError(
        res,
        `Failed to create checkout: ${err.message || 'unknown error'}`,
        502
      );
    }

    await req.supabase
      .from('orders')
      .update({ polar_checkout_id: polarCheckoutId })
      .eq('id', order.id);

    // 4. Mark every row in the batch accepted + linked to the new order.
    await req.supabase
      .from('quote_requests')
      .update({ status: 'accepted', order_id: order.id })
      .eq('batch_id', batchId);

    return jsonOk(
      res,
      {
        order_id: order.id,
        checkout_url: checkoutUrl,
        summary: {
          subtotal,
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

export default router;
