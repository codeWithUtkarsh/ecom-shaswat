-- Quote-driven business model: products with price=0 require a sales
-- conversation before they can be ordered. Customers submit a quote request,
-- sales team replies with a price, customer accepts → standard checkout flow.

CREATE TABLE IF NOT EXISTS public.quote_requests (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id    UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name  TEXT NOT NULL,                -- snapshot, survives product rename/delete
  quantity      INTEGER NOT NULL CHECK (quantity > 0),
  message       TEXT,
  status        TEXT NOT NULL DEFAULT 'pending',  -- pending | quoted | accepted | rejected | closed
  quoted_price  DECIMAL(10, 2),               -- set by sales when replying
  quoted_at     TIMESTAMP WITH TIME ZONE,
  sales_notes   TEXT,                         -- internal notes from sales (not shown to user)
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at    TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS quote_requests_user_id_idx
  ON public.quote_requests (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS quote_requests_status_idx
  ON public.quote_requests (status)
  WHERE status = 'pending';

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own quote requests"
  ON public.quote_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quote requests"
  ON public.quote_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Reuse the existing handle_updated_at() trigger function from schema.sql
CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
