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

  orders: {
    list: () => apiFetch<{ orders: any[] }>('/orders'),
    get: (id: string) => apiFetch<{ order: any }>(`/orders/${id}`),
    checkout: () =>
      apiFetch<{
        order_id: string;
        checkout_url: string;
        summary: { subtotal: number; shipping: number; pre_tax_total: number; currency: string; tax_note: string };
      }>('/orders', { method: 'POST', body: {} }),
  },

  quoteRequests: {
    list: () => apiFetch<{ batches: any[] }>('/quote-requests'),
    create: (input: {
      product_id: string;
      quantity: number;
      message?: string;
      batch_id?: string;
    }) =>
      apiFetch<{ quote_request: any }>('/quote-requests', { method: 'POST', body: input }),
    acceptBatch: (batchId: string) =>
      apiFetch<{
        order_id: string;
        checkout_url: string;
        summary: { subtotal: number; shipping: number; pre_tax_total: number; currency: string; tax_note: string };
      }>(`/quote-requests/batch/${batchId}/accept`, { method: 'POST', body: {} }),
  },

  admin: {
    quoteRequests: {
      list: (status?: string) =>
        apiFetch<{ batches: any[] }>(
          `/admin/quote-requests${status ? `?status=${encodeURIComponent(status)}` : ''}`
        ),
      replyBatch: (
        batchId: string,
        input: {
          items: Array<{ id: string; quoted_price: number }>;
          sales_notes?: string;
        }
      ) =>
        apiFetch<{ batch: any }>(`/admin/quote-requests/batch/${batchId}/reply`, {
          method: 'POST',
          body: input,
        }),
    },
  },
};
