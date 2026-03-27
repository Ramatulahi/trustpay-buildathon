
-- Drop broken policies
DROP POLICY IF EXISTS "Sellers can view their transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can create transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can view own transactions" ON public.transactions;

-- Recreate with auth.jwt() instead of auth.users
CREATE POLICY "Users can view own transactions"
ON public.transactions FOR SELECT TO authenticated
USING (auth.uid() = buyer_id);

CREATE POLICY "Sellers can view their transactions"
ON public.transactions FOR SELECT TO authenticated
USING (seller_email = (auth.jwt() ->> 'email'));

CREATE POLICY "Users can create transactions"
ON public.transactions FOR INSERT TO authenticated
WITH CHECK (auth.uid() = buyer_id);
