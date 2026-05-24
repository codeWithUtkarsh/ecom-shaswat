import { Request, Response, NextFunction } from 'express';
import { createUserClient, createAnonClient } from '../lib/supabase';
import { env } from '../config/env';

/**
 * Verifies a Supabase access token by delegating to Supabase's auth API.
 *
 * This replaces local JWT verification with a `supabase.auth.getUser(token)`
 * round-trip. The reason: Supabase projects now sign JWTs with asymmetric
 * algorithms (ES256/RS256) by default, while a shared-secret HS256 check
 * (the old `jsonwebtoken.verify` approach) cannot validate them — and the
 * algorithm in use varies project by project. Delegating to Supabase
 * works for every algorithm and survives future migrations.
 *
 * Cost: one network call per authenticated request (~50-200ms). For
 * production scale we'd want to cache verified tokens for their lifetime;
 * for now the un-cached version is correct and simple.
 */
async function verifyToken(token: string): Promise<{
  id: string;
  email?: string;
  role?: string;
} | null> {
  const anon = createAnonClient();
  const { data, error } = await anon.auth.getUser(token);
  if (error || !data.user) {
    console.warn('[auth] token rejected by Supabase:', error?.message || 'no user returned');
    return null;
  }
  return {
    id: data.user.id,
    email: data.user.email,
    role: data.user.role,
  };
}

/** Requires a valid Supabase access token. Returns 401 if missing or invalid. */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = header.slice(7);
  const user = await verifyToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = user;
  req.supabase = createUserClient(token);
  next();
}

/**
 * Requires a valid Supabase token AND the user's email to appear in the
 * ADMIN_EMAILS env var (comma-separated). Mount AFTER requireAuth in the
 * route stack so req.user is already populated.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const adminList = env.ADMIN_EMAILS
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const userEmail = req.user?.email?.toLowerCase();
  if (!userEmail || !adminList.includes(userEmail)) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

/** Attaches user if token is present and valid, but allows unauthenticated access. */
export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    req.user = null;
    req.supabase = createAnonClient();
    return next();
  }

  const token = header.slice(7);
  const user = await verifyToken(token);
  if (user) {
    req.user = user;
    req.supabase = createUserClient(token);
  } else {
    req.user = null;
    req.supabase = createAnonClient();
  }
  next();
}
