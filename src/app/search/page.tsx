"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search as SearchIcon, X } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { api } from "@/lib/api";
import { Product } from "@/types";

interface Category {
  slug: string;
  name: string;
  icon?: string;
}

function SearchContent() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const initialCategory = params.get("category") ?? "";

  const [inputValue, setInputValue] = useState(initialQ);
  const [category, setCategory] = useState(initialCategory);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.categories
      .list()
      .then((data) => setCategories(data.categories ?? []))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const q = initialQ.trim();
    if (q.length < 2) {
      setProducts([]);
      setTotal(0);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const extra = category ? `category=${encodeURIComponent(category)}` : undefined;
    api
      .search(q, extra)
      .then((data) => {
        if (cancelled) return;
        setProducts(data.products ?? []);
        setTotal(data.pagination?.total ?? 0);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Search failed");
        setProducts([]);
        setTotal(0);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [initialQ, category]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = inputValue.trim();
    if (q.length < 2) return;
    const url = new URLSearchParams({ q });
    if (category) url.set("category", category);
    router.push(`/search?${url.toString()}`);
  };

  const clearCategory = () => {
    setCategory("");
    const url = new URLSearchParams({ q: initialQ });
    router.push(`/search?${url.toString()}`);
  };

  const onCategoryChange = (slug: string) => {
    setCategory(slug);
    const url = new URLSearchParams({ q: initialQ });
    if (slug) url.set("category", slug);
    router.push(`/search?${url.toString()}`);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 lg:py-10 bg-warmth">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-bark-400 mb-6">
        <Link href="/" className="hover:text-forest transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-forest font-medium">Search</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-terra">
          Search
        </span>
        <h1 className="font-display text-3xl lg:text-4xl font-semibold text-forest mt-1 italic">
          {initialQ ? <>Results for &ldquo;{initialQ}&rdquo;</> : "Find products"}
        </h1>
        {initialQ.trim().length >= 2 && !loading && !error && (
          <p className="text-bark-400 text-sm mt-1">
            {total} {total === 1 ? "product" : "products"} found
          </p>
        )}
      </div>

      {/* Search form */}
      <form onSubmit={submitSearch} className="mb-6 max-w-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search products..."
            className="flex-1 min-w-0 px-5 py-3 border border-forest/10 bg-white/80 text-forest placeholder:text-forest/30 focus:outline-none focus:border-terra/40 focus:ring-2 focus:ring-terra/10 transition-all"
            autoFocus
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex-shrink-0 w-12 flex items-center justify-center bg-terra text-white hover:bg-terra-500 transition-colors"
          >
            <SearchIcon size={16} />
          </button>
        </div>
      </form>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 border border-forest/8 rounded-full bg-cream-50 text-bark-500 focus:outline-none focus:border-terra/20 text-sm appearance-none cursor-pointer"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.icon ? `${c.icon} ` : ""}
              {c.name}
            </option>
          ))}
        </select>

        {category && (
          <button
            onClick={clearCategory}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-bark-500 border border-forest/8 rounded-full hover:bg-forest/[0.04] transition-all"
          >
            Clear filter <X size={12} />
          </button>
        )}
      </div>

      {/* Results */}
      {initialQ.trim().length < 2 ? (
        <div className="text-center py-20">
          <p className="font-display text-bark-400 text-lg italic">
            Type at least 2 characters to search.
          </p>
        </div>
      ) : loading ? (
        <div className="text-center py-20">
          <p className="font-display text-bark-400 text-lg italic">Searching…</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="font-display text-terra text-lg italic">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-display text-bark-400 text-lg italic">
            No products match &ldquo;{initialQ}&rdquo;
            {category ? ` in this category` : ""}.
          </p>
          {category && (
            <button
              onClick={clearCategory}
              className="inline-flex mt-4 text-sm font-semibold text-terra hover:text-terra-500 transition-colors"
            >
              Try all categories
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 stagger-children">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 lg:py-10 bg-warmth">
          <p className="font-display text-bark-400 text-lg italic">Loading…</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
