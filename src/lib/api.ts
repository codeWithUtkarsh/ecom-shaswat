import { createClient } from '@/lib/supabase/client';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function authHeader(): Promise<Record<string, string>> {
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
}

async function apiFetch<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  const method = opts.method ?? 'GET';
  const headers: Record<string, string> = {
    ...(await authHeader()),
  };
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    cache: 'no-store',
  });

  if (!res.ok) {
    let message = `API error: ${res.status}`;
    try {
      const errBody = await res.json();
      if (errBody?.error) message = errBody.error;
    } catch {}
    throw new Error(message);
  }

  const json = await res.json();
  return json.data;
}

export const api = {
  products: {
    list: (params?: string) =>
      apiFetch<{ products: any[]; pagination: any }>(`/products${params ? `?${params}` : ''}`),
    get: (id: string) =>
      apiFetch<{ product: any; relatedProducts: any[] }>(`/products/${id}`),
  },
  categories: {
    list: () => apiFetch<{ categories: any[] }>('/categories'),
    get: (slug: string, params?: string) =>
      apiFetch<{ category: any; products: any[]; pagination: any }>(
        `/categories/${slug}${params ? `?${params}` : ''}`
      ),
  },
  search: (q: string, params?: string) =>
    apiFetch<{ query: string; products: any[]; pagination: any }>(
      `/search?q=${encodeURIComponent(q)}${params ? `&${params}` : ''}`
    ),
  banners: () => apiFetch<{ banners: any[] }>('/banners'),
  promos: () => apiFetch<{ promos: any[] }>('/promos'),

  cart: {
    list: () => apiFetch<{ items: any[] }>('/cart'),
    add: (product_id: string, quantity = 1) =>
      apiFetch<{ item: any }>('/cart', { method: 'POST', body: { product_id, quantity } }),
    update: (id: string, quantity: number) =>
      apiFetch<{ item: any }>(`/cart/${id}`, { method: 'PATCH', body: { quantity } }),
    remove: (id: string) =>
      apiFetch<{ message: string }>(`/cart/${id}`, { method: 'DELETE' }),
    clear: () => apiFetch<{ message: string }>('/cart', { method: 'DELETE' }),
  },

  wishlist: {
    list: () => apiFetch<{ items: any[] }>('/wishlist'),
    add: (product_id: string) =>
      apiFetch<{ item: any }>('/wishlist', { method: 'POST', body: { product_id } }),
    remove: (id: string) =>
      apiFetch<{ message: string }>(`/wishlist/${id}`, { method: 'DELETE' }),
  },
};
