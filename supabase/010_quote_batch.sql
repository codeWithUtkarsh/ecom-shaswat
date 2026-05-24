-- Groups multiple quote_requests rows into a single "submission" (batch) so
-- a customer who quotes 3 items at once stays grouped through the admin
-- reply + accept + Polar checkout flow.
--
-- Backfill: every existing row becomes its own single-item batch.

ALTER TABLE public.quote_requests
  ADD COLUMN IF NOT EXISTS batch_id UUID;

-- Backfill — each existing row becomes a batch of 1, keyed by its own id.
UPDATE public.quote_requests
SET batch_id = id
WHERE batch_id IS NULL;

-- Now make it NOT NULL with a generated default for safety on future rows
-- that forget to supply one (won't happen in normal flow, but defensive).
ALTER TABLE public.quote_requests
  ALTER COLUMN batch_id SET NOT NULL,
  ALTER COLUMN batch_id SET DEFAULT uuid_generate_v4();

-- Hot-path index: "show me all rows in this batch."
CREATE INDEX IF NOT EXISTS quote_requests_batch_id_idx
  ON public.quote_requests (batch_id);
