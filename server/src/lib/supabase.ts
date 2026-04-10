import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '../config/env';

/** Public client for unauthenticated requests (products, categories, etc.) */
export function createAnonClient(): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
}

/**
 * Per-request client scoped to an authenticated user.
 * Passes the user's JWT so RLS policies evaluate auth.uid() correctly.
 */
export function createUserClient(accessToken: string): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    global: {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  });
}

/** Admin client that bypasses RLS. Only use for webhooks/admin operations. */
export function createServiceClient(): SupabaseClient {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  }
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
}
