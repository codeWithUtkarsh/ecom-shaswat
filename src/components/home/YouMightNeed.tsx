"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";

export default function YouMightNeed() {
  const moreProducts = products.slice(10, 20);

  if (moreProducts.length === 0) return null;

  return (
    <div className="max-w-[1400px] mx-auto px-8 mt-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-navy">New Arrivals</h2>
          <p className="text-sm text-surface-500 mt-0.5">
            Recently added to our supply catalogue
          </p>
        </div>
        <Link
          href="/products/vegetable"
          className="flex items-center gap-1.5 text-sm font-bold text-orange bg-orange/10 border border-orange/20 hover:bg-orange hover:text-white px-4 py-2 rounded-lg transition-all group"
        >
          View All
          <ArrowRight
            size={14}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {moreProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
