"use client";

import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data";

export default function FeatureHighlights() {
  return (
    <div className="max-w-[1400px] mx-auto px-8 mt-10">
      {/* Section header */}
      <div className="mb-5">
        <h2 className="text-2xl font-extrabold text-navy">
          Featured Categories
        </h2>
        <p className="text-sm text-surface-500 mt-0.5">
          Browse our most popular categories
        </p>
      </div>

      {/* Full-width category grid */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products/${cat.slug}`}
            className="bg-white border border-surface-200 rounded-2xl p-4 text-center group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-surface-50 mx-auto mb-3 overflow-hidden ring-2 ring-surface-200 group-hover:ring-orange/30 transition-all">
              <Image
                src={cat.image}
                alt={cat.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs font-bold text-navy group-hover:text-orange transition-colors">
              {cat.name}
            </div>
            <div className="text-[10px] text-surface-400 mt-0.5">
              {cat.itemCount} items
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
