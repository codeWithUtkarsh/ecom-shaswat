-- Migration: Add missing tables and columns for full API support
-- Run AFTER schema.sql (001)

-- ============================================================
-- 1. ALTER products table — add missing columns
-- ============================================================
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS vendor TEXT,
  ADD COLUMN IF NOT EXISTS weight TEXT,
  ADD COLUMN IF NOT EXISTS badge TEXT CHECK (badge IN ('hot', 'new', 'sale', 'out')),
  ADD COLUMN IF NOT EXISTS category_label TEXT;

-- ============================================================
-- 2. CREATE categories table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT,
  icon TEXT,
  item_count INTEGER DEFAULT 0,
  subcategories TEXT[],
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================
-- 3. CREATE banners table (hero carousel)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.banners (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image TEXT NOT NULL,
  cta TEXT,
  link TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================
-- 4. CREATE promo_banners table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.promo_banners (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  bg_color TEXT DEFAULT 'bg-orange-50',
  text_color TEXT DEFAULT 'text-orange-600',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================
-- 5. CREATE wishlist table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.wishlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, product_id)
);

-- ============================================================
-- 6. CREATE addresses table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  label TEXT DEFAULT 'Home',
  full_name TEXT NOT NULL,
  phone TEXT,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  county TEXT,
  postcode TEXT NOT NULL,
  country TEXT DEFAULT 'United Kingdom',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================
-- 7. ROW LEVEL SECURITY
-- ============================================================

-- Categories: public read
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT USING (true);

-- Banners: public read
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Banners are viewable by everyone"
  ON public.banners FOR SELECT USING (true);

-- Promo banners: public read
ALTER TABLE public.promo_banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Promo banners are viewable by everyone"
  ON public.promo_banners FOR SELECT USING (true);

-- Wishlist: users access only their own
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own wishlist"
  ON public.wishlist FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to their own wishlist"
  ON public.wishlist FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove from their own wishlist"
  ON public.wishlist FOR DELETE USING (auth.uid() = user_id);

-- Addresses: users access only their own
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own addresses"
  ON public.addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own addresses"
  ON public.addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own addresses"
  ON public.addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own addresses"
  ON public.addresses FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- 8. TRIGGERS for updated_at
-- ============================================================
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.banners
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.promo_banners
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.addresses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- 9. INDEXES for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_badge ON public.products(badge);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON public.wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON public.addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
