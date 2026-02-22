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
    <div className="max-w-[1400px] mx-auto px-8 mt-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-navy">
            Popular Products
          </h2>
          <p className="text-sm text-surface-500 mt-0.5">
            Top-selling lines for UK retailers
          </p>
        </div>
        <div className="flex items-center gap-1 bg-surface-50 border border-surface-200 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-navy text-white shadow-brand-sm"
                  : "text-surface-500 hover:text-navy"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-surface-400 text-sm">
          No products found in this category
        </div>
      )}
    </div>
  );
}
