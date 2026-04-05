"use client";

import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data";

export default function FeatureHighlights() {
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
      <div className="grid grid-cols-5 md:grid-cols-10 gap-3 stagger-children">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products/${cat.slug}`}
            className="animate-fade-up bg-cream-50 border border-forest/5 rounded-2xl p-3 lg:p-4 text-center group hover:shadow-card-hover hover:-translate-y-1.5 hover:border-terra/15 transition-all duration-500"
          >
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-forest/[0.03] mx-auto mb-2.5 overflow-hidden ring-2 ring-forest/6 group-hover:ring-terra/25 transition-all duration-500">
              <Image
                src={cat.image}
                alt={cat.name}
                width={64}
                height={64}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="text-[11px] lg:text-xs font-semibold text-forest group-hover:text-terra transition-colors duration-300">
              {cat.name}
            </div>
            <div className="text-[9px] lg:text-[10px] text-bark-400 mt-0.5">
              {cat.itemCount} items
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
