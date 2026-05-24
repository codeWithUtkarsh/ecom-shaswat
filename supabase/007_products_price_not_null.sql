-- Sourcing business model: products without a set price default to 0
-- (price will be quoted via email). Prevents future NULLs at the schema level
-- so the checkout's NOT NULL constraint on order_items.product_price never
-- fails again.

UPDATE public.products
SET price = 0
WHERE price IS NULL;

ALTER TABLE public.products
  ALTER COLUMN price SET NOT NULL,
  ALTER COLUMN price SET DEFAULT 0;
