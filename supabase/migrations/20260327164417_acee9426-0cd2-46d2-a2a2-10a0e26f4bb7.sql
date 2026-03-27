
-- Reviews table: buyers review sellers after completed transactions
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- One review per transaction
ALTER TABLE public.reviews ADD CONSTRAINT unique_review_per_transaction UNIQUE (transaction_id);

-- RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Buyers can insert their own reviews
CREATE POLICY "Buyers can create reviews" ON public.reviews
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

-- Anyone authenticated can read reviews
CREATE POLICY "Anyone can read reviews" ON public.reviews
  FOR SELECT TO authenticated
  USING (true);

-- Unique business name constraint (only for non-null values)
CREATE UNIQUE INDEX unique_business_name ON public.profiles (business_name) WHERE business_name IS NOT NULL AND business_name != '';
