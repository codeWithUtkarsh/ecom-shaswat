# Application Startup Guide

This guide covers how to start the **Silkrute E-commerce** application from a fresh clone. The repo contains two services and a Supabase backend, so make sure you bring them up in the right order.

---

## 1. Prerequisites

Install these before doing anything else:

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | ≥ 18.17 (20 LTS recommended) | Runs both the Next.js frontend and the Express server |
| npm | ≥ 9 | Package manager (the repo uses `package-lock.json`) |
| Supabase account | — | Hosted Postgres + Auth backend |
| Supabase CLI (optional) | latest | Local DB / applying migrations |
| Git | any recent | Source control |

Verify:

```bash
node --version
npm --version
```

---

## 2. Repository Layout

```
ecom-shaswat/
├── src/                    # Next.js 15 App Router (frontend + server components)
├── server/                 # Standalone Express API (separate package)
├── supabase/               # SQL schema and ordered migrations
├── middleware.ts           # Next.js auth middleware (Supabase SSR)
├── .env.local.example      # Template for frontend env vars
└── package.json            # Frontend (Next.js) dependencies and scripts
```

Two `package.json` files exist — one at the root (Next.js) and one inside `server/` (Express). Each needs its own `npm install`.

---

## 3. Environment Variables

### 3.1 Frontend (`.env.local` at repo root)

Copy the example and fill in your Supabase project values:

```bash
cp .env.local.example .env.local
```

Required:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-public-key>
```

Get these from the Supabase dashboard → **Project Settings → API**.

### 3.2 Backend (`server/.env`)

The Express server requires the Supabase URL, anon key, and **JWT secret** (used to verify the Bearer tokens the frontend sends on authenticated requests). The service role key is optional and used only for elevated server-side operations.

```
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_ANON_KEY=<your-anon-public-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>   # required for webhooks (RLS bypass)
PORT=4000
FRONTEND_URL=http://localhost:3000                   # CORS allowlist + Polar redirect base

# Polar payment integration (see section 4.2)
POLAR_ACCESS_TOKEN=<your-organization-access-token>
POLAR_WEBHOOK_SECRET=<base64-secret-from-polar-dashboard>
POLAR_PRODUCT_ID=<uuid-of-your-pay-what-you-want-product>
POLAR_SERVER=sandbox                                 # or 'production'

# Email + admin (see section 4.3)
RESEND_API_KEY=<re_xxx...>                           # leave empty → emails no-op gracefully
FROM_EMAIL=onboarding@resend.dev                     # use your verified domain in prod
SALES_EMAIL=sales@yourdomain.com                     # who gets new-quote notifications
ADMIN_EMAILS=you@yourdomain.com,colleague@yourdomain.com
```

Token verification on authenticated routes calls `supabase.auth.getUser(token)`, which delegates to Supabase's auth API. This works for all JWT signing algorithms (HS256, ES256, RS256) and survives Supabase's algorithm migrations — no local JWT secret needed.

The **service role key** is required for the Polar webhook handler — webhooks aren't authenticated as a specific user, so they need to bypass RLS to update orders. Without it, paid orders will never be marked as paid.

> ⚠️ **Three different keys, three different purposes**:
> - **Anon key** — safe for browser, scoped by Row Level Security. Used by the frontend Supabase client and by the Express server when no user is authenticated.
> - **JWT secret** — server-only. Used by the Express server to verify the authenticity of `Bearer` tokens sent by the frontend.
> - **Service role key** — server-only, bypasses RLS entirely. Use sparingly for admin-only operations.

---

## 4. Database Setup (Supabase)

Apply the SQL files in `supabase/` **in numeric order**. Out-of-order execution breaks foreign-key dependencies.

| Order | File | Purpose |
|-------|------|---------|
| 1 | `schema.sql` | Base tables, types, and RLS policies |
| 2 | `002_add_missing_tables_and_columns.sql` | Schema extensions |
| 3 | `003_seed_data.sql` | Initial reference data |
| 4 | `004_real_product_catalog.sql` | Product catalog seed |
| 5 | `005_polar_checkout.sql` | Polar payment columns on `orders` (checkout id, paid_at, currency) |
| 6 | `006_order_items_insert_policy.sql` | Adds missing INSERT RLS policy on `order_items` (without it checkout fails) |
| 7 | `007_products_price_not_null.sql` | Backfills NULL prices to 0 and enforces NOT NULL DEFAULT 0 going forward |
| 8 | `008_quote_requests.sql` | Adds `quote_requests` table for the quote-driven sourcing flow |
| 9 | `009_quote_order_link.sql` | Adds `order_id` FK on `quote_requests` so accepted quotes link to their resulting order |
| 10 | `010_quote_batch.sql` | Adds `batch_id` to `quote_requests` so multi-item submissions stay grouped through admin reply + accept |

### Option A — Supabase SQL Editor (quickest)

1. Open your project in the Supabase dashboard.
2. Go to **SQL Editor → New Query**.
3. Paste and run each file in the order above.

### Option B — Supabase CLI

```bash
supabase link --project-ref <your-project-ref>
supabase db push    # if using migration folder layout
# or run files directly:
psql "$SUPABASE_DB_URL" -f supabase/schema.sql
psql "$SUPABASE_DB_URL" -f supabase/002_add_missing_tables_and_columns.sql
psql "$SUPABASE_DB_URL" -f supabase/003_seed_data.sql
psql "$SUPABASE_DB_URL" -f supabase/004_real_product_catalog.sql
```

For deeper details on auth providers, OAuth redirect URLs, and RLS, see `SUPABASE_SETUP.md`.

---

## 4.2. Polar payment setup (one-time)

The app uses **Polar.sh as Merchant of Record** for payments — Polar collects the buyer's payment and handles VAT/sales tax for their jurisdiction. You only see net amounts on payout. One-time setup:

1. **Create a Polar organization** at https://polar.sh.
2. **Create a single product** in Polar dashboard → Products → New product:
   - Name: anything (e.g. "Vyapaar Global Order")
   - Pricing: **Pay what you want** with a min of `£1.00`
   - Currency: GBP
   - Copy the product UUID into `POLAR_PRODUCT_ID` in `server/.env`.

   This single product represents "any order on the site." The actual amount per checkout is passed in the API call, overriding the pay-what-you-want default. Line-item detail (which products, quantities, etc.) lives in our own `order_items` table.

3. **Create an organization access token**: dashboard → Settings → Developers → New access token. Scope: `checkouts:read checkouts:write`. Copy into `POLAR_ACCESS_TOKEN`.

4. **Create a webhook endpoint**: dashboard → Settings → Webhooks → New endpoint:
   - URL: `https://<your-domain>/api/webhooks/polar` (for local dev, use a tunnel like `ngrok http 4000` and point Polar at the tunnel URL → `/api/webhooks/polar`)
   - Events: `order.paid`, `order.updated`, `order.refunded`, `checkout.updated`
   - Copy the generated webhook secret into `POLAR_WEBHOOK_SECRET` (this is base64; paste as-is — the SDK decodes it).

5. **Sandbox vs production**: set `POLAR_SERVER=sandbox` for testing (no real card charges, separate dashboard at sandbox.polar.sh). Flip to `production` when launching.

6. **Restart the server** after editing `server/.env` so the new vars are picked up.

---

## 4.3. Email + admin setup

### Resend (transactional email)

The app sends three transactional emails — sales-notify on new quote requests, customer-confirm on quote submission, and customer-notify when a quote is replied. Without a Resend key, all three are skipped gracefully (logged to console) so the app stays usable in dev without an account.

1. Sign up at https://resend.com (free tier covers 100 emails/day, 3,000/month).
2. **Dashboard → API Keys → Create API Key** → copy into `RESEND_API_KEY`.
3. **Sender (`FROM_EMAIL`)**:
   - **Dev / testing**: leave as `onboarding@resend.dev` (Resend's shared sender; works without domain verification, rate-limited, can only send to *your own signup email*).
   - **Production**: dashboard → Domains → Add domain, add DNS records (SPF + DKIM), copy verified address (e.g. `noreply@yourdomain.com`) into `FROM_EMAIL`.
4. **`SALES_EMAIL`**: the address that receives "new quote request" notifications. If unset, the server logs the request to console instead.

### Admin allowlist

Admins access `/admin/quotes` to reply to quote requests. There's no role table — admins are listed by email in `server/.env`:

```
ADMIN_EMAILS=you@yourdomain.com,sales@yourdomain.com
```

Comma-separated, case-insensitive. The backend checks `req.user.email` against this list on `/api/admin/*` routes; the frontend shows a "not authorized" screen if `GET /api/admin/quote-requests` returns 403.

To add/remove admins: edit the env var, restart the server. No code change, no migration.

---

## 5. Install Dependencies

Run installs in **both** packages:

```bash
# Frontend
npm install

# Backend
cd server && npm install && cd ..
```

---

## 6. Starting the Application

The frontend and the API are independent — open two terminal tabs.

### Terminal 1 — Next.js Frontend

```bash
npm run dev
```

Default URL: **http://localhost:3000**

### Terminal 2 — Express API Server

```bash
cd server
npm run dev
```

Default URL: **http://localhost:4000** (configurable via `PORT` in `server/.env`)

The frontend can run standalone against Supabase directly. The Express server is only needed for endpoints that require elevated privileges or custom server-side logic.

---

## 7. Verifying the Startup

After both services boot, confirm:

| Check | How |
|-------|-----|
| Frontend renders | Open http://localhost:3000 — landing page should load |
| Supabase auth works | Click **Sign Up**, register a user, check `auth.users` in Supabase |
| Product catalog loads | Navigate to `/products` — items from `004_real_product_catalog.sql` should appear |
| API server healthy | `curl http://localhost:4000/health` (if a health route is defined) |
| No console errors | Open browser DevTools → Console |

---

## 8. Production Build

```bash
# Frontend
npm run build
npm start              # runs the optimized Next.js production build

# Backend
cd server
npm run build          # compiles TS → dist/
npm start              # runs node dist/index.js
```

The frontend is also deployable to Vercel (see `.vercel/`) — push to the linked branch and Vercel handles the build.

---

## 9. Common Startup Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Invalid API key` on page load | Wrong or missing `NEXT_PUBLIC_SUPABASE_*` values | Re-check `.env.local`, restart `npm run dev` (env is read at boot) |
| Auth redirects to wrong URL | OAuth redirect not configured | Add `http://localhost:3000/auth/callback` in Supabase → Auth → URL Configuration |
| `relation "products" does not exist` | Migrations not applied | Run SQL files in section 4 in order |
| Port 3000 already in use | Another dev server running | `lsof -i :3000` then `kill <pid>`, or `PORT=3001 npm run dev` |
| Server can't connect to DB | Service role key missing/wrong | Verify `server/.env`, never use anon key on backend |
| TypeScript errors after pull | Stale `tsconfig.tsbuildinfo` | Delete `tsconfig.tsbuildinfo` and `.next/`, restart |

---

## 10. Quick Reference

```bash
# First-time setup
cp .env.local.example .env.local         # fill in Supabase values
npm install                              # frontend deps
cd server && npm install && cd ..        # backend deps
# (apply supabase/*.sql in numeric order)

# Daily dev loop (two terminals)
npm run dev                              # Terminal 1: frontend (localhost:3000)
cd server && npm run dev                 # Terminal 2: API (localhost:4000)
```

For application features and architecture, see `README.md`. For Supabase configuration specifics (OAuth, RLS, email templates), see `SUPABASE_SETUP.md`.
