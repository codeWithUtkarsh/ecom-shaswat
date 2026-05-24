-- The original schema only defined a SELECT policy on order_items.
-- With RLS enabled and no INSERT policy, all writes are denied — which broke
-- checkout once we started actually inserting items.
--
-- Policy: a user can insert an order_items row only if the parent orders row
-- belongs to them. Webhooks use the service-role client which bypasses RLS,
-- so they don't need this policy.

CREATE POLICY "Users can insert their own order items"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
        AND orders.user_id = auth.uid()
    )
  );
