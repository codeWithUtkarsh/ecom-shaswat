"use client";

import { useState } from "react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";

const tabs = [
  { id: "all", name: "All" },
  { id: "snacks", name: "Baking material" },
  { id: "fruits", name: "Fresh Fruits" },
  { id: "cake-milk", name: "Milks & Dairies" },
  { id: "chicken-meat", name: "Meats" },
  { id: "vegetable", name: "Vegetables" },
];

export default function CategoryBrowser() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts =
    activeTab === "all"
      ? products.slice(0, 10)
      : products.filter((p) => p.category === activeTab).slice(0, 10);

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-12 lg:mt-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-terra">
            Top sellers
          </span>
          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-forest mt-1 italic">
            Popular Products
          </h2>
          <p className="text-sm text-bark-400 mt-1">
            Top-selling lines for UK retailers
          </p>
        </div>
        <div className="flex items-center gap-1 bg-white/60 border border-white/60 p-1 rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-terra text-white shadow-warm-glow"
                  : "text-forest/70 hover:text-terra"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 stagger-children">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 text-bark-400 text-sm">
          No products found in this category
        </div>
      )}
    </div>
  );
}
