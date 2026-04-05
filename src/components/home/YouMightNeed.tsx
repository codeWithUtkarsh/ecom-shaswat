"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";

export default function YouMightNeed() {
  const moreProducts = products.slice(10, 20);

  if (moreProducts.length === 0) return null;

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-12 lg:mt-16">
      <div className="flex items-end justify-between mb-7">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-terra">
            Just arrived
          </span>
          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-forest mt-1 italic">
            New Arrivals
          </h2>
          <p className="text-sm text-bark-400 mt-1">
            Recently added to our supply catalogue
          </p>
        </div>
        <Link
          href="/products/vegetable"
          className="flex items-center gap-1.5 text-sm font-semibold text-forest bg-forest/[0.05] border border-forest/10 hover:bg-terra hover:border-terra hover:text-white px-5 py-2.5 rounded-full transition-all duration-300 group"
        >
          View All
          <ArrowRight
            size={14}
            className="group-hover:translate-x-0.5 transition-transform duration-300"
          />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 stagger-children">
        {moreProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
