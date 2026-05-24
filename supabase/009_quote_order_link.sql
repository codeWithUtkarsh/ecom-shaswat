-- Link a quote_request to the order created when the customer accepts it.
-- Lets sales/admin trace a quote through to its resulting payment.

ALTER TABLE public.quote_requests
  ADD COLUMN IF NOT EXISTS order_id UUID
    REFERENCES public.orders(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS quote_requests_order_id_idx
  ON public.quote_requests (order_id)
  WHERE order_id IS NOT NULL;
