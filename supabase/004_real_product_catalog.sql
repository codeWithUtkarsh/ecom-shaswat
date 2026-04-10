-- Migration: Replace mock data with real Vyapaar Global product catalog
-- Adds B2B-specific columns and inserts 35 real products across 6 categories

-- ============================================================
-- 1. Add B2B-specific columns to products
-- ============================================================
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS local_name TEXT,
  ADD COLUMN IF NOT EXISTS brand TEXT,
  ADD COLUMN IF NOT EXISTS origin TEXT DEFAULT 'India',
  ADD COLUMN IF NOT EXISTS quality TEXT,
  ADD COLUMN IF NOT EXISTS processing TEXT,
  ADD COLUMN IF NOT EXISTS purity TEXT,
  ADD COLUMN IF NOT EXISTS packaging TEXT,
  ADD COLUMN IF NOT EXISTS moq TEXT,
  ADD COLUMN IF NOT EXISTS shelf_life TEXT,
  ADD COLUMN IF NOT EXISTS notes TEXT;

-- Allow price to be nullable (B2B = "Price on request")
ALTER TABLE public.products ALTER COLUMN price DROP NOT NULL;

-- Drop the badge constraint to allow null badge
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_badge_check;

-- ============================================================
-- 2. Clear old mock data
-- ============================================================
DELETE FROM public.order_items;
DELETE FROM public.orders;
DELETE FROM public.cart_items;
DELETE FROM public.wishlist;
DELETE FROM public.products;
DELETE FROM public.categories;
DELETE FROM public.banners;
DELETE FROM public.promo_banners;

-- ============================================================
-- 3. Insert real categories
-- ============================================================
INSERT INTO public.categories (name, slug, image, icon, item_count, sort_order) VALUES
  ('Grains',           'grains',          'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&h=120&fit=crop', '🌾', 1,  1),
  ('Flours',           'flours',          'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&h=120&fit=crop', '🫓', 4,  2),
  ('Lentils & Pulses', 'lentils-pulses',  'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=120&h=120&fit=crop', '🫘', 8,  3),
  ('Whole Spices',     'whole-spices',    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=120&h=120&fit=crop', '🌶️', 9,  4),
  ('Blended Spices',   'blended-spices',  'https://images.unsplash.com/photo-1606585546917-fdd0f04bb8b4?w=120&h=120&fit=crop', '🫙', 6,  5),
  ('Ready Mixes',      'ready-mixes',     'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=120&h=120&fit=crop', '🍳', 7,  6);

-- ============================================================
-- 4. Insert real products
-- ============================================================

-- GRAINS
INSERT INTO public.products (name, local_name, brand, category, category_label, origin, quality, processing, purity, packaging, moq, shelf_life, notes, image, in_stock, rating, reviews, vendor) VALUES
  ('Golden Sella 1121 Basmati Rice', NULL, NULL, 'grains', 'Grains', 'India', 'Premium Quality', NULL, NULL, '100 kg', '100 kg', NULL, 'Retail repacking, HoReCa, bulk distribution', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop', true, 5, 12, 'Vyapaar Global');

-- FLOURS
INSERT INTO public.products (name, local_name, brand, category, category_label, origin, quality, processing, packaging, moq, shelf_life, image, in_stock, rating, reviews, vendor) VALUES
  ('Millet Flour (Ragi, Bajra, Jowar)', 'Ragi/Bajra/Jowar Atta', NULL, 'flours', 'Flours', 'India', 'Premium Quality', 'Hygienically Milled / Fine Ground', '100 kg PP Bags', '30 kg', '6 Months (cool & dry)', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop', true, 4, 5, 'Vyapaar Global'),
  ('Atta (Whole Wheat Flour)', 'Gehun ka Atta', NULL, 'flours', 'Flours', 'India', 'Premium Quality', 'Hygienically Milled / Fine Ground', '30 kg PP Bags / Custom', '30 kg', '6 Months (cool & dry)', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop', true, 5, 18, 'Vyapaar Global'),
  ('Besan (Gram Flour)', 'Besan', NULL, 'flours', 'Flours', 'India', 'Premium Quality', 'Hygienically Milled / Fine Ground', '30 kg PP Bags / Custom', '30 kg', '6 Months (cool & dry)', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop', true, 4, 8, 'Vyapaar Global'),
  ('Rice Flour', 'Chawal ka Atta', NULL, 'flours', 'Flours', 'India', 'Premium Quality', 'Hygienically Milled / Fine Ground', '30 kg PP Bags / Custom', '30 kg', '6 Months (cool & dry)', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop', true, 4, 3, 'Vyapaar Global');

-- LENTILS & PULSES
INSERT INTO public.products (name, local_name, brand, category, category_label, origin, quality, processing, packaging, moq, shelf_life, notes, image, in_stock, rating, reviews, vendor) VALUES
  ('Rajma (Kidney Beans)', 'Rajma', NULL, 'lentils-pulses', 'Lentils & Pulses', 'India', 'Premium Quality', 'Sortex Cleaned / Graded', '100 kg PP Bags', '500g / 1kg / 2kg / 5kg', '12 Months (dry storage)', NULL, 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=400&fit=crop', true, 5, 9, 'Vyapaar Global'),
  ('Pigeon Pea Split (Toor Dal)', 'Arhar / Toor Dal', NULL, 'lentils-pulses', 'Lentils & Pulses', 'India', NULL, NULL, NULL, '30 kg', NULL, 'Ref: ~1.19 USD/kg — Greenmore Organic Foods', 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=400&fit=crop', true, 4, 6, 'Vyapaar Global'),
  ('Moong Dal (Split Dehusked)', 'Moong Dal', NULL, 'lentils-pulses', 'Lentils & Pulses', 'India', NULL, NULL, NULL, '500g / 1kg / 2kg / 5kg', NULL, 'Ref: ~1,048 USD/MT — NPT Global Traders', 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=400&fit=crop', true, 4, 7, 'Vyapaar Global'),
  ('Chana Dal (Split Bengal Gram)', 'Chana Dal', NULL, 'lentils-pulses', 'Lentils & Pulses', 'India', NULL, NULL, NULL, '500g / 1kg / 2kg / 5kg', NULL, 'Ref: Greenmore Organic Foods', 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=400&fit=crop', true, 4, 5, 'Vyapaar Global'),
  ('Masoor Dal (Red Lentils)', 'Masoor Dal', NULL, 'lentils-pulses', 'Lentils & Pulses', 'India', 'Export Grade / Machine Cleaned', 'Polished / Unpolished', '100 kg PP Bags / Custom', '500g / 1kg / 2kg / 5kg', '12 Months (dry storage)', NULL, 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=400&fit=crop', true, 5, 14, 'Vyapaar Global'),
  ('Urad Dal (Split Black Gram)', 'Urad Dal', NULL, 'lentils-pulses', 'Lentils & Pulses', 'India', 'Export Grade / Machine Cleaned', 'Polished / Unpolished', '100 kg PP Bags / Custom', '500g / 1kg / 2kg / 5kg', '12 Months', NULL, 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=400&fit=crop', true, 4, 4, 'Vyapaar Global'),
  ('Kabuli Chickpeas (White Chana)', 'Kabuli Chana', NULL, 'lentils-pulses', 'Lentils & Pulses', 'India', 'Export Grade / Machine Cleaned', 'Sortex Cleaned / Graded', '100 kg PP Bags / Custom', '500g / 1kg / 2kg / 5kg', '12 Months (dry storage)', NULL, 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=400&fit=crop', true, 5, 11, 'Vyapaar Global'),
  ('Kala Chana (Desi Chickpeas)', 'Kala Chana', NULL, 'lentils-pulses', 'Lentils & Pulses', 'India', 'Export Grade / Machine Cleaned', 'Sortex Cleaned', '30 kg / 50 kg PP Bags', '500g / 1kg / 2kg / 5kg', '12 Months (dry storage)', NULL, 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400&h=400&fit=crop', true, 4, 6, 'Vyapaar Global');

-- WHOLE SPICES
INSERT INTO public.products (name, local_name, brand, category, category_label, origin, quality, processing, purity, packaging, moq, shelf_life, image, in_stock, rating, reviews, vendor) VALUES
  ('Cumin Seeds', 'Jeera', NULL, 'whole-spices', 'Whole Spices', 'India', 'Premium Quality', 'Machine Cleaned', '98% – 99.5%', '25 kg / 50 kg PP Bags', '30 kg', '18 Months (cool & dry)', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop', true, 5, 22, 'Vyapaar Global'),
  ('Coriander Seeds', 'Dhania', NULL, 'whole-spices', 'Whole Spices', 'India', 'Premium Quality', 'Machine Cleaned / Fully Graded', '98% – 99.5%', '30 kg / 50 kg PP Bags', '30 kg', '18 Months (cool & dry)', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop', true, 5, 15, 'Vyapaar Global'),
  ('Fenugreek Seeds', 'Methi Dana', NULL, 'whole-spices', 'Whole Spices', 'India', 'Premium Quality', 'Machine Cleaned / Fully Graded', '98% – 99.5%', '30 kg PP Bags', '30 kg', '18 Months (cool & dry)', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop', true, 4, 7, 'Vyapaar Global'),
  ('Mustard Seeds', 'Rai / Sarson', NULL, 'whole-spices', 'Whole Spices', 'India', 'Premium Quality', 'Machine Cleaned / Fully Graded', '98% – 99.5%', '30 kg PP Bags / Custom', '30 kg', '18 Months (cool & dry)', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop', true, 4, 5, 'Vyapaar Global'),
  ('Fennel Seeds', 'Saunf', NULL, 'whole-spices', 'Whole Spices', 'India', 'Premium Quality', 'Machine Cleaned / Fully Graded', '98% – 99.5%', '30 kg PP Bags / Custom', '30 kg', '18 Months (cool & dry)', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop', true, 4, 8, 'Vyapaar Global'),
  ('Black Pepper (Whole Peppercorns)', 'Kali Mirch', NULL, 'whole-spices', 'Whole Spices', 'India', 'Premium Quality', 'Machine Cleaned / Fully Graded', '98% – 99.5%', '30 kg PP Bags / Custom', '30 kg', '24 Months (cool & dry)', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop', true, 5, 19, 'Vyapaar Global'),
  ('Cloves (Whole Clove Spice)', 'Laung', NULL, 'whole-spices', 'Whole Spices', 'India', 'Premium Quality', 'Fully Dried / Graded', '98% – 99.5%', '30 kg PP Bags / Custom', '30 kg', '24 Months (cool & dry)', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop', true, 5, 10, 'Vyapaar Global'),
  ('Cardamom (Green & Black)', 'Elaichi', NULL, 'whole-spices', 'Whole Spices', 'India', 'Premium Quality', 'Cleaned / Graded (as per size)', '98% – 99.5%', '30 kg PP Bags / Custom', '30 kg', '24 Months (cool & dry)', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop', true, 5, 16, 'Vyapaar Global'),
  ('Bay Leaves', 'Tej Patta', NULL, 'whole-spices', 'Whole Spices', 'India', 'Premium Quality', 'Cleaned / Hand Sorted', '98% – 99.5%', '30 kg PP Bags / Custom', '30 kg', '24 Months (cool & dry)', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop', true, 4, 4, 'Vyapaar Global');

-- BLENDED SPICES
INSERT INTO public.products (name, brand, category, category_label, origin, packaging, notes, image, in_stock, rating, reviews, vendor) VALUES
  ('Punjabi Chole Masala 100g', 'Tata Sampann', 'blended-spices', 'Blended Spices', 'India', '3 x 8 x 100g (display-ready)', 'With natural oils', 'https://images.unsplash.com/photo-1606585546917-fdd0f04bb8b4?w=400&h=400&fit=crop', true, 5, 13, 'Tata Sampann'),
  ('Kitchen King Masala 100g', 'Tata Sampann', 'blended-spices', 'Blended Spices', 'India', '3 x 8 x 100g', 'With natural oils', 'https://images.unsplash.com/photo-1606585546917-fdd0f04bb8b4?w=400&h=400&fit=crop', true, 5, 11, 'Tata Sampann'),
  ('Garam Masala 100g', 'Tata Sampann', 'blended-spices', 'Blended Spices', 'India', '3 x 8 x 100g', 'With natural oils', 'https://images.unsplash.com/photo-1606585546917-fdd0f04bb8b4?w=400&h=400&fit=crop', true, 5, 20, 'Tata Sampann'),
  ('Dal Tadka Masala 100g', 'Tata Sampann', 'blended-spices', 'Blended Spices', 'India', '3 x 8 x 100g', 'With natural oils', 'https://images.unsplash.com/photo-1606585546917-fdd0f04bb8b4?w=400&h=400&fit=crop', true, 4, 7, 'Tata Sampann'),
  ('Paneer Masala 100g', 'Tata Sampann', 'blended-spices', 'Blended Spices', 'India', '3 x 8 x 100g', 'With natural oils', 'https://images.unsplash.com/photo-1606585546917-fdd0f04bb8b4?w=400&h=400&fit=crop', true, 4, 6, 'Tata Sampann'),
  ('Pav Bhaji Masala 100g', 'Tata Sampann', 'blended-spices', 'Blended Spices', 'India', '3 x 8 x 100g', 'With natural oils', 'https://images.unsplash.com/photo-1606585546917-fdd0f04bb8b4?w=400&h=400&fit=crop', true, 4, 9, 'Tata Sampann');

-- READY MIXES
INSERT INTO public.products (name, brand, category, category_label, origin, packaging, notes, image, in_stock, rating, reviews, vendor) VALUES
  ('Khaman Dhokla Mix 200g', 'MTR', 'ready-mixes', 'Ready Mixes', 'India', '12 x 200g cartons', 'Retailers, cash & carry, ethnic grocery chains', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop', true, 4, 8, 'MTR'),
  ('Khaman Dhokla Mix 500g', 'MTR', 'ready-mixes', 'Ready Mixes', 'India', '6 x 500g', 'No added preservatives', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop', true, 4, 5, 'MTR'),
  ('Dosa Mix 200g', 'MTR', 'ready-mixes', 'Ready Mixes', 'India', '12 x 200g', 'Pallet config via query', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop', true, 5, 14, 'MTR'),
  ('Dosa Mix 500g', 'MTR', 'ready-mixes', 'Ready Mixes', 'India', '6 x 500g', 'Pallet config via query', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop', true, 5, 10, 'MTR'),
  ('Rava Dosa Mix 500g', 'MTR', 'ready-mixes', 'Ready Mixes', 'India', '6 x 500g', 'Pallet config via query', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop', true, 4, 7, 'MTR'),
  ('Rava Idli Mix 500g', 'MTR', 'ready-mixes', 'Ready Mixes', 'India', '6 x 500g', 'Pallet config via query', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop', true, 4, 6, 'MTR'),
  ('Rice Idli Mix 500g', 'MTR', 'ready-mixes', 'Ready Mixes', 'India', '6 x 500g', 'Pallet config via query', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop', true, 4, 5, 'MTR');

-- ============================================================
-- 5. Re-insert banners with real messaging
-- ============================================================
INSERT INTO public.banners (title, subtitle, image, cta, link, sort_order) VALUES
  ('Premium Indian Exports Direct to UK Retailers',
   'Wholesale grains, spices, lentils & ready mixes sourced from verified Indian suppliers.',
   'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&h=500&fit=crop',
   'Browse Catalogue', '/products/whole-spices', 1),
  ('Bulk Supply. Competitive Pricing. UK Delivered.',
   'From Basmati rice to Tata Sampann blends — everything your shelves need.',
   'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&h=500&fit=crop',
   'View Products', '/products/grains', 2),
  ('MTR & Tata Sampann — Now Available in Bulk',
   'Branded ready mixes and spice blends for ethnic grocery retailers across the UK.',
   'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&h=500&fit=crop',
   'Shop Brands', '/products/ready-mixes', 3);

-- ============================================================
-- 6. Re-insert promo banners
-- ============================================================
INSERT INTO public.promo_banners (label, value, description, bg_color, text_color, sort_order) VALUES
  ('Bulk',    'SAVE',  'Volume discounts on orders over 500 kg.',  'bg-orange-50', 'text-orange-600', 1),
  ('New',     'MTR',   'MTR Ready Mixes now available for UK retail.',  'bg-red-50', 'text-red-600', 2),
  ('Export',  'A1',    'Export-grade lentils & pulses — machine cleaned.',  'bg-blue-50', 'text-blue-600', 3),
  ('Free',    'SHIP',  'Free delivery on orders over £500.',  'bg-green-50', 'text-green-600', 4);
