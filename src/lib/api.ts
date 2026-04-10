const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
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
};
