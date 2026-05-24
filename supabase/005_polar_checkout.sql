-- Polar payment integration: track checkout session + payment status on orders.

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS polar_checkout_id TEXT,
  ADD COLUMN IF NOT EXISTS polar_order_id    TEXT,
  ADD COLUMN IF NOT EXISTS currency          TEXT NOT NULL DEFAULT 'GBP',
  ADD COLUMN IF NOT EXISTS paid_at           TIMESTAMP WITH TIME ZONE;

-- Webhook lookups hit polar_checkout_id; needs to be fast and unique.
CREATE UNIQUE INDEX IF NOT EXISTS orders_polar_checkout_id_key
  ON public.orders (polar_checkout_id)
  WHERE polar_checkout_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS orders_polar_order_id_idx
  ON public.orders (polar_order_id)
  WHERE polar_order_id IS NOT NULL;
