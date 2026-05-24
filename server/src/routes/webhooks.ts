import { Router, Request, Response } from 'express';
import { Webhook, WebhookVerificationError } from 'standardwebhooks';
import { env } from '../config/env';
import { createServiceClient } from '../lib/supabase';

const router = Router();

/**
 * POST /api/webhooks/polar
 *
 * Receives webhook events from Polar (Merchant of Record).
 * The raw body is mounted in app.ts BEFORE express.json() so that
 * validateEvent can verify the signature against the unparsed bytes.
 *
 * Uses the Supabase service-role client to bypass RLS — the webhook is
 * not authenticated as the buying user, so it needs admin write access
 * to flip order status.
 */
router.post('/polar', async (req: Request, res: Response) => {
  if (!env.POLAR_WEBHOOK_SECRET) {
    console.error('POLAR_WEBHOOK_SECRET not set; rejecting webhook');
    return res.status(503).send('Webhook secret not configured');
  }

  let event: any;
  try {
    // standardwebhooks expects the raw body as a string; Polar's secret in the
    // dashboard is the base64-encoded form, which is what the Webhook class wants.
    const wh = new Webhook(env.POLAR_WEBHOOK_SECRET);
    const rawBody = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : String(req.body);
    event = wh.verify(rawBody, req.headers as Record<string, string>);
  } catch (err) {
    if (err instanceof WebhookVerificationError) {
      return res.status(403).send('Invalid signature');
    }
    console.error('Webhook validation error', err);
    return res.status(400).send('Invalid payload');
  }

  // Acknowledge fast — Polar retries on non-2xx. Do heavy work after ack
  // for low-risk handlers; for state-changing handlers do work synchronously.
  try {
    switch (event.type) {
      case 'order.paid':
      case 'order.updated': {
        await handleOrderPaid(event.data);
        break;
      }
      case 'order.refunded': {
        await handleOrderRefunded(event.data);
        break;
      }
      // Informational events — no action needed right now.
      case 'checkout.created':
      case 'checkout.updated':
      case 'order.created':
        break;
      default:
        // Unknown event; log and ack so Polar stops retrying.
        console.log(`[polar webhook] unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error(`[polar webhook] handler failed for ${event.type}:`, err);
    // 500 → Polar will retry. Use this for transient failures.
    return res.status(500).send('Handler failed');
  }
});

/**
 * Locate our internal order from a Polar order payload and mark it paid.
 *
 * We try two lookup paths in priority order:
 *  1. metadata.order_id (set when we created the checkout session)
 *  2. checkout_id → polar_checkout_id (fallback if metadata didn't propagate)
 */
async function handleOrderPaid(orderData: any) {
  const supabase = createServiceClient();

  const ourOrderId: string | undefined =
    orderData.metadata?.order_id ?? orderData.checkout?.metadata?.order_id;
  const checkoutId: string | undefined =
    orderData.checkout_id ?? orderData.checkout?.id;

  let row;
  if (ourOrderId) {
    const { data } = await supabase
      .from('orders')
      .select('id, status')
      .eq('id', ourOrderId)
      .single();
    row = data;
  }
  if (!row && checkoutId) {
    const { data } = await supabase
      .from('orders')
      .select('id, status')
      .eq('polar_checkout_id', checkoutId)
      .single();
    row = data;
  }

  if (!row) {
    console.warn('[polar webhook] order.paid for unknown order', { ourOrderId, checkoutId });
    return;
  }
  if (row.status === 'paid') return; // idempotent

  const billing = orderData.billing_address ?? orderData.customer?.billing_address;

  const { error } = await supabase
    .from('orders')
    .update({
      status: 'paid',
      polar_order_id: orderData.id,
      paid_at: new Date().toISOString(),
      shipping_address: billing ?? null,
    })
    .eq('id', row.id);

  if (error) throw new Error(`Failed to mark order paid: ${error.message}`);
}

async function handleOrderRefunded(orderData: any) {
  const supabase = createServiceClient();
  const polarOrderId = orderData.id;

  const { error } = await supabase
    .from('orders')
    .update({ status: 'refunded' })
    .eq('polar_order_id', polarOrderId);

  if (error) throw new Error(`Failed to mark order refunded: ${error.message}`);
}

export default router;
