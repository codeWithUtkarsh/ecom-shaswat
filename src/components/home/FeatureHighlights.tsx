"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function FeatureHighlights() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d.data?.categories ?? []))
      .catch(() => {});
  }, []);
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-12 lg:mt-16">
      {/* Section header */}
      <div className="flex items-end justify-between mb-7">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-terra">
            Browse by type
          </span>
          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-forest mt-1 italic">
            Featured Categories
          </h2>
        </div>
        <Link
          href="/products/vegetable"
          className="hidden sm:inline-flex text-xs font-semibold text-terra hover:text-terra-500 transition-colors"
        >
          View all →
        </Link>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 lg:gap-8 stagger-children">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products/${cat.slug}`}
            className="animate-fade-up text-center group"
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 mx-auto mb-3 rounded-full bg-forest/[0.03] overflow-clip group-hover:scale-110 transition-transform duration-500">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain scale-[2.5] group-hover:scale-[2.7] transition-transform duration-500"
              />
            </div>
            <div className="text-sm lg:text-base font-semibold text-forest group-hover:text-terra transition-colors duration-300">
              {cat.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
