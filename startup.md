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
SUPABASE_JWT_SECRET=<your-jwt-secret>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>   # optional
PORT=4000
FRONTEND_URL=http://localhost:3000                   # CORS allowlist
```

Get the **JWT secret** from Supabase dashboard → **Project Settings → API → JWT Settings → JWT Secret**. Without it, the server will reject every request to `/api/cart`, `/api/orders`, `/api/profile`, and `/api/wishlist` with 401.

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
