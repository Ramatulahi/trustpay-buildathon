CREATE POLICY "Buyers can update own transactions"
ON public.transactions FOR UPDATE TO authenticated
USING (auth.uid() = buyer_id)
WITH CHECK (auth.uid() = buyer_id);