import { Router, Request, Response, NextFunction } from 'express';
import { jsonOk, jsonError } from '../helpers/response';
import { createServiceClient } from '../lib/supabase';
import { env } from '../config/env';
import { sendEmail, quoteBatchRepliedCustomerNotification } from '../lib/email';

const router = Router();

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface AdminBatch {
  batch_id: string;
  user_id: string;
  customer_email: string | null;
  customer_name: string | null;
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

/**
 * GET /api/admin/quote-requests
 * All quote_requests rows grouped by batch_id, newest first.
 *
 * Filtering by ?status= filters at the batch level (a batch's status is
 * derived from its first row — they're always equal in practice).
 */
router.get('/quote-requests', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supabase = createServiceClient();
    const statusFilter = (req.query.status as string) ?? null;

    let query = supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (statusFilter) query = query.eq('status', statusFilter);

    const { data: rows, error } = await query;
    if (error) return jsonError(res, error.message, 500);

    // Hydrate customer info in one auth.admin.listUsers call.
    const users = new Map<string, { email: string | undefined; name: string | undefined }>();
    if (rows && rows.length > 0) {
      const { data: usersData } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1000,
      });
      for (const u of usersData?.users ?? []) {
        users.set(u.id, {
          email: u.email,
          name: (u.user_metadata as any)?.full_name,
        });
      }
    }

    // Group by batch_id.
    const byBatch = new Map<string, AdminBatch>();
    for (const r of rows ?? []) {
      let b = byBatch.get(r.batch_id);
      if (!b) {
        const user = users.get(r.user_id);
        b = {
          batch_id: r.batch_id,
          user_id: r.user_id,
          customer_email: user?.email ?? null,
          customer_name: user?.name ?? null,
          message: r.message,
          status: r.status,
          sales_notes: r.sales_notes,
          order_id: r.order_id,
          created_at: r.created_at,
          quoted_at: r.quoted_at,
          items: [],
        };
        byBatch.set(r.batch_id, b);
      }
      b.items.push({
        id: r.id,
        product_id: r.product_id,
        product_name: r.product_name,
        quantity: r.quantity,
        quoted_price: r.quoted_price != null ? Number(r.quoted_price) : null,
      });
    }

    // Sort batches newest first (created_at desc).
    const batches = Array.from(byBatch.values()).sort((a, b) =>
      b.created_at.localeCompare(a.created_at)
    );

    return jsonOk(res, { batches });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/admin/quote-requests/batch/:batchId/reply
 * Body: { items: [{ id, quoted_price }], sales_notes?: string }
 *
 * Updates every item in a batch with its quoted price, transitions the
 * whole batch to status='quoted', and sends ONE consolidated email to
 * the customer listing every item + price.
 */
router.post('/quote-requests/batch/:batchId/reply', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const batchId = String(req.params.batchId ?? '');
    if (!UUID_RE.test(batchId)) {
      return jsonError(res, 'Invalid batch id', 400);
    }

    const { items, sales_notes } = req.body ?? {};
    if (!Array.isArray(items) || items.length === 0) {
      return jsonError(res, 'items array is required', 400);
    }
    if (sales_notes != null && (typeof sales_notes !== 'string' || sales_notes.length > 2000)) {
      return jsonError(res, 'sales_notes must be a string up to 2000 characters', 400);
    }

    // Validate every item entry has a positive price.
    const priceById = new Map<string, number>();
    for (const item of items) {
      if (typeof item?.id !== 'string') {
        return jsonError(res, 'each item must have an id', 400);
      }
      const p = Number(item.quoted_price);
      if (!Number.isFinite(p) || p <= 0) {
        return jsonError(res, `item ${item.id}: quoted_price must be positive`, 400);
      }
      priceById.set(item.id, p);
    }

    const supabase = createServiceClient();

    // Load the batch to verify it exists + all submitted ids actually belong
    // to it (defense against an admin POSTing a foreign id to leak data).
    const { data: existing, error: loadError } = await supabase
      .from('quote_requests')
      .select('*')
      .eq('batch_id', batchId);

    if (loadError) return jsonError(res, loadError.message, 500);
    if (!existing || existing.length === 0) {
      return jsonError(res, 'Batch not found', 404);
    }

    const existingIds = new Set(existing.map((r) => r.id));
    for (const id of priceById.keys()) {
      if (!existingIds.has(id)) {
        return jsonError(res, `Item ${id} does not belong to batch ${batchId}`, 400);
      }
    }
    if (priceById.size !== existing.length) {
      return jsonError(
        res,
        `Must price every item in the batch (got ${priceById.size}, batch has ${existing.length})`,
        400
      );
    }

    const quotedAt = new Date().toISOString();

    // Update each row's quoted_price + flip status to 'quoted'.
    // Loop because supabase-js doesn't have a bulk "update each row with its
    // own value" helper without an RPC. N is small (items per batch).
    for (const row of existing) {
      const price = priceById.get(row.id)!;
      const { error: updateError } = await supabase
        .from('quote_requests')
        .update({
          quoted_price: price,
          quoted_at: quotedAt,
          sales_notes: sales_notes ?? null,
          status: 'quoted',
        })
        .eq('id', row.id);
      if (updateError) {
        return jsonError(res, updateError.message, 500);
      }
    }

    // Reload to return + use in email.
    const { data: updated } = await supabase
      .from('quote_requests')
      .select('*')
      .eq('batch_id', batchId)
      .order('created_at', { ascending: true });

    // Fire-and-forget consolidated email.
    void (async () => {
      const userId = updated?.[0]?.user_id;
      if (!userId) return;
      const { data: userData } = await supabase.auth.admin.getUserById(userId);
      const customerEmail = userData?.user?.email;
      if (!customerEmail) {
        console.warn(`[admin] no email for user ${userId} on batch ${batchId}`);
        return;
      }
      await sendEmail({
        to: customerEmail,
        subject: `Your quote is ready — ${updated!.length} item${updated!.length === 1 ? '' : 's'}`,
        html: quoteBatchRepliedCustomerNotification({
          items: updated!.map((r) => ({
            productName: r.product_name,
            quantity: r.quantity,
            quotedPrice: Number(r.quoted_price),
          })),
          currency: 'GBP',
          salesNotes: sales_notes ?? null,
          frontendUrl: env.FRONTEND_URL,
        }),
      });
    })();

    return jsonOk(res, { batch: { batch_id: batchId, items: updated ?? [] } });
  } catch (err) {
    next(err);
  }
});

export default router;
