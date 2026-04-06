-- Seed data: initial categories, products, banners, and promo banners
-- Derived from src/lib/data.ts mock data

-- ============================================================
-- Categories
-- ============================================================
INSERT INTO public.categories (name, slug, image, icon, item_count, sort_order) VALUES
  ('Dairy & Milk',     'cake-milk',  'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=120&h=120&fit=crop', '🥛', 11, 1),
  ('Organic Produce',  'organic',    'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=120&h=120&fit=crop', '🥝', 6,  2),
  ('Fresh Fruits',     'fruits',     'https://images.unsplash.com/photo-1629828874514-c1e5103f2100?w=120&h=120&fit=crop', '🍑', 16, 3),
  ('Spices & Herbs',   'spices',     'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=120&h=120&fit=crop', '🌶️', 10, 4),
  ('Snacks & Bites',   'snacks',     'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=120&h=120&fit=crop', '🍿', 11, 5),
  ('Vegetables',       'vegetable',  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=120&h=120&fit=crop', '🥬', 6,  6),
  ('Grains & Rice',    'grains',     'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&h=120&fit=crop', '🌾', 10, 7),
  ('Pulses & Lentils', 'pulses',     'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=120&h=120&fit=crop', '🫘', 10, 8),
  ('Oils & Ghee',      'oils',       'https://images.unsplash.com/photo-1474979266404-7f28235f7e2e?w=120&h=120&fit=crop', '🫒', 8,  9),
  ('Beverages',        'beverages',  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=120&h=120&fit=crop', '☕', 11, 10)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Products
-- ============================================================
INSERT INTO public.products (name, description, price, original_price, discount, image, category, category_label, weight, rating, reviews, vendor, badge, in_stock) VALUES
  ('Seeds of Change Organic Red Rice',           'Premium organic red rice, sourced from verified farms',           28.85, 32.00,  13, 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=400&h=400&fit=crop', 'grains',       'Grains & Rice',     '500 gm', 2.0, 1,  'Punjab Agro',          'sale', true),
  ('All Natural Free-Range Chicken Meatballs',   'All natural free-range chicken meatballs',                       23.00, 122.00, 66, 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=400&fit=crop', 'chicken-meat',  'Fresh Meat',        '1 kg',   5.0, 3,  'FarmLink Direct',      'hot',  true),
  ('Angie''s Sweet & Salty Kettle Corn',         'Sweet and salty kettle corn — retail pack',                      48.85, 52.00,  8,  'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop', 'snacks',        'Snacks & Bites',    '350 gm', 4.0, 1,  'Harvest Fields',       'new',  true),
  ('Foster Farms Takeout Crispy Classic',        'Crispy classic wings — bulk supply',                             17.85, 19.00,  0,  'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop', 'snacks',        'Snacks & Bites',    '350 gm', 0.0, 0,  'Harvest Fields',       'out',  false),
  ('Blue Almonds Lightly Salted Vegetables',     'Lightly salted mixed vegetables — farm sourced',                23.85, 25.00,  2,  'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&h=400&fit=crop', 'vegetable',     'Fresh Vegetables',  '400 gm', 4.0, 2,  'Green Valley Exports', NULL,   true),
  ('Organic Cage-Free Grade A Large Brown Eggs', 'Certified organic free-range eggs',                              14.29, 18.99,  25, 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop', 'organic',       'Organic Produce',   '12 pcs', 5.0, 7,  'Punjab Agro',          'hot',  true),
  ('Gortons Beer Battered Fish Fillets',         'Beer battered crispy fish fillets — wholesale',                  18.29, 24.99,  27, 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=400&h=400&fit=crop', 'chicken-meat',  'Fresh Seafood',     '600 gm', 4.0, 5,  'FarmLink Direct',      'sale', true),
  ('Haagen Caramel Cone Ice Cream',              'Premium caramel cone ice cream',                                 20.29, 26.99,  8,  'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop', 'cake-milk',     'Dairy & Milk',      '500 ml', 3.0, 4,  'Harvest Fields',       NULL,   true),
  ('Encore Seafoods Stuffed Mushrooms',          'Gourmet stuffed mushrooms with seafood',                         8.29,  12.99,  6,  'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop', 'chicken-meat',  'Fresh Seafood',     '350 gm', 4.0, 2,  'FarmLink Direct',      'sale', true),
  ('Canada Dry Ginger Ale - 2L',                 'Canada Dry ginger ale 2L — case supply',                        15.29, 19.99,  2,  'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=400&fit=crop', 'beverages',     'Beverages',         '2 Ltr',  3.0, 3,  'Harvest Fields',       NULL,   true),
  ('Italian Avocado Premium',                    'Premium Italian avocados, perfectly ripe',                       12.29, 15.99,  23, 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop', 'fruits',        'Fresh Fruits',      '250 gm', 5.0, 12, 'Green Valley Exports', 'hot',  true),
  ('Fresh Local Carrots Organic',                'Fresh local carrots from organic farms',                         19.29, 24.99,  23, 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop', 'vegetable',     'Vegetables',        '1 kg',   4.0, 8,  'Punjab Agro',          NULL,   true),
  ('Lays Chips Bacon Flavor',                    'Crispy bacon flavored potato chips — retail box',               21.29, 27.99,  24, 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop', 'snacks',        'Snacks',            '250 gm', 4.0, 15, 'Harvest Fields',       'sale', true),
  ('Fresh Whole Milk Farm',                      'Farm fresh whole milk, pasteurized',                             6.29,  8.99,   30, 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop', 'cake-milk',     'Dairy & Milk',      '1 Ltr',  5.0, 23, 'FarmLink Direct',      'hot',  true),
  ('Extra Virgin Olive Oil Cold Press',          'Premium extra virgin olive oil, cold pressed',                   24.29, 32.99,  26, 'https://images.unsplash.com/photo-1474979266404-7f28235f7e2e?w=400&h=400&fit=crop', 'oils',          'Oils & Ghee',       '500 ml', 5.0, 19, 'Green Valley Exports', 'new',  true),
  ('Fresh Strawberries Pack',                    'Sweet and juicy fresh strawberries',                             11.29, 15.99,  29, 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop', 'fruits',        'Fresh Fruits',      '250 gm', 4.0, 11, 'Punjab Agro',          'sale', true),
  ('Organic Frozen Vegetable Mix',               'Certified organic frozen vegetables mix',                        14.29, 18.99,  25, 'https://images.unsplash.com/photo-1615485500710-aa71060943f4?w=400&h=400&fit=crop', 'vegetable',     'Vegetables',        '500 gm', 3.0, 6,  'Green Valley Exports', NULL,   true),
  ('Premium Beef Mixed Cuts',                    'Premium quality beef cuts — wholesale',                         16.29, 22.99,  29, 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=400&fit=crop', 'chicken-meat',  'Fresh Meat',        '1 kg',   4.0, 14, 'FarmLink Direct',      'hot',  true),
  ('Bhani Complete Vanilla Ice Cream',           'Creamy vanilla ice cream — case of 6',                          9.99,  14.50,  2,  'https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=400&h=400&fit=crop', 'cake-milk',     'Dairy & Milk',      '1 Ltr',  4.0, 9,  'Harvest Fields',       NULL,   true),
  ('Fresh Cucumber Local Organic',               'Fresh local cucumbers, crisp and green',                         4.29,  5.99,   28, 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop', 'vegetable',     'Vegetables',        '500 gm', 4.0, 3,  'Punjab Agro',          NULL,   true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Banners (hero carousel)
-- ============================================================
INSERT INTO public.banners (title, subtitle, image, cta, link, sort_order) VALUES
  ('Premium Agri Products Direct to Your Store',
   'Smart sourcing from verified farms. Bulk supply for UK retailers with doorstep delivery.',
   'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=500&fit=crop',
   'Explore Products', '/products/vegetable', 1),
  ('Farm Fresh. Globally Sourced. UK Delivered.',
   'From farm to shelf — premium fruits, vegetables, spices & staples imported for UK retailers.',
   'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&h=500&fit=crop',
   'Browse Catalogue', '/products/fruits', 2),
  ('Smart Logistics. Faster Supply Chain.',
   'Reliable B2B supply with real-time tracking and competitive wholesale pricing.',
   'https://images.unsplash.com/photo-1506484381205-f7945b68db56?w=1200&h=500&fit=crop',
   'Get Started', '/products/organic', 3)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Promo Banners
-- ============================================================
INSERT INTO public.promo_banners (label, value, description, bg_color, text_color, sort_order) VALUES
  ('Save',     '£29',  'Bulk order discounts on all grocery & frozen items.',  'bg-orange-50', 'text-orange-600', 1),
  ('Discount', '30%',  'First-order discount for new retail partners.',        'bg-red-50',    'text-red-600',    2),
  ('Up to',    '50%',  'Seasonal clearance on imported produce.',              'bg-blue-50',   'text-blue-600',   3),
  ('Free',     'SHIP', 'Free delivery on orders over £500.',                   'bg-green-50',  'text-green-600',  4)
ON CONFLICT DO NOTHING;
