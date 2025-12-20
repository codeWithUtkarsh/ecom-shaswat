# Supabase Setup Guide

This guide will walk you through setting up Supabase for the Silkrute e-commerce application.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js 18+ installed
- Git installed

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in the project details:
   - **Name**: `silkrute-ecommerce` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the region closest to your users
4. Click **"Create new project"**
5. Wait for the project to be provisioned (1-2 minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. In your project root, rename `.env.local.example` to `.env.local`
2. Update the file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...your-key-here
```

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to the **SQL Editor**
2. Click **"New Query"**
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Paste it into the SQL Editor
5. Click **"Run"** to execute the schema

This will create:
- `profiles` table - User profiles (extends auth.users)
- `products` table - Product catalog
- `cart_items` table - User shopping carts
- `orders` table - Order history
- `order_items` table - Order line items
- Row Level Security (RLS) policies
- Automatic triggers for profile creation

## Step 5: Configure Authentication

### Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. **Email** should be enabled by default
3. Configure email templates (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize the confirmation, recovery, and magic link emails

### Enable Social Authentication (Optional)

#### Google OAuth

1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. Follow the instructions to create OAuth credentials in Google Cloud Console
4. Enter your **Client ID** and **Client Secret**
5. Save

#### Facebook OAuth

1. Go to **Authentication** → **Providers**
2. Enable **Facebook**
3. Follow the instructions to create a Facebook App
4. Enter your **Client ID** and **Client Secret**
5. Save

### Configure Redirect URLs

Add these URLs to your allowed redirect URLs:
1. Go to **Authentication** → **URL Configuration**
2. Add the following to **Redirect URLs**:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://yourdomain.com/auth/callback` (for production)

## Step 6: Seed Initial Data (Optional)

You can add some initial products to test the application:

1. Go to **SQL Editor** in Supabase
2. Run this query to add sample products:

```sql
INSERT INTO products (name, description, price, original_price, discount, image, category, rating, reviews, in_stock)
VALUES
  ('Traditional Copper Cookware Set', 'Premium copper cookware set for traditional cooking', 89.99, 129.99, 30, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop', 'kitchen', 4.5, 128, true),
  ('Organic Herbal Supplement Pack', 'Natural herbal supplements for daily wellness', 29.99, 42.99, 30, 'https://images.unsplash.com/photo-1550572017-4814c5c6e0e2?w=400&h=400&fit=crop', 'health-personal', 4.8, 256, true),
  ('Immunity Booster Vitamins', 'Boost your immune system with natural ingredients', 24.99, 35.99, 30, 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop', 'health-personal', 4.6, 189, true);
```

## Step 7: Test the Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

4. Test authentication:
   - Click **"Login / Signup"** in the header
   - Create a new account
   - Check your email for the confirmation link
   - Confirm your email
   - Try logging in with your credentials

## Database Schema Overview

### Tables

#### `profiles`
- Extends Supabase auth.users
- Stores: email, full_name, phone, avatar_url
- Automatically created when a user signs up

#### `products`
- Product catalog
- Fields: name, description, price, original_price, discount, image, category, rating, reviews, in_stock

#### `cart_items`
- User shopping carts
- Links users to products with quantities
- One cart per user, multiple items

#### `orders`
- Order history
- Status tracking: pending, processing, shipped, delivered, cancelled

#### `order_items`
- Order line items
- Stores product snapshot at time of purchase

### Row Level Security (RLS)

All tables have RLS enabled with these policies:

**Profiles:**
- Everyone can view public profiles
- Users can only insert/update their own profile

**Products:**
- Everyone can view products
- Only admins can modify (you'll need to set up admin roles separately)

**Cart Items:**
- Users can only view/modify their own cart items

**Orders:**
- Users can only view/create their own orders
- Order items are visible only to the order owner

## Security Best Practices

1. **Never commit** your `.env.local` file
2. **Use Row Level Security (RLS)** - Already configured in schema
3. **Validate data** on the server-side (add server actions for mutations)
4. **Use email confirmation** - Configure in Supabase Auth settings
5. **Enable rate limiting** - Available in Supabase project settings

## Troubleshooting

### "Invalid API key" error
- Double-check your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Make sure there are no extra spaces or quotes
- Restart your dev server after changing `.env.local`

### Email confirmation not working
- Check spam folder
- Verify email templates in Supabase dashboard
- Make sure redirect URLs are configured correctly

### Social login not working
- Verify OAuth credentials are correct
- Check that redirect URLs match exactly
- Enable the provider in Supabase Auth settings

### RLS policy errors
- Check that the schema.sql was executed successfully
- Verify user is authenticated before accessing protected resources
- Review Supabase logs for specific policy violations

## Next Steps

Once Supabase is set up, you can:

1. **Customize email templates** - Make them match your brand
2. **Add more products** - Populate the products table
3. **Set up admin roles** - Create policies for admin users
4. **Enable analytics** - Track user behavior
5. **Add payment integration** - Stripe, PayPal, etc.
6. **Deploy to production** - Update redirect URLs for your domain

## Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## Support

If you encounter any issues:
1. Check the Supabase dashboard logs
2. Review the browser console for errors
3. Check your network tab for failed requests
4. Refer to the Supabase Discord community for help
