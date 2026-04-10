"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Grid3X3, Flame, Sparkles } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function Navigation() {
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d.data?.categories ?? []))
      .catch(() => {});
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-surface-200 sticky top-[64px] z-40">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex items-center h-11 gap-6">
          {/* Browse Categories */}
          <div className="relative">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center gap-2 bg-surface-50 text-navy px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-surface-100 transition-all border border-surface-200"
            >
              <Grid3X3 size={14} className="text-orange" />
              <span>Categories</span>
              <ChevronDown
                size={13}
                className={`text-surface-400 transition-transform ${showCategories ? "rotate-180" : ""}`}
              />
            </button>
            {showCategories && (
              <div className="absolute top-full left-0 mt-2 w-56 dark-glass-solid rounded-xl py-2 z-50 shadow-soft-xl animate-fade-in">
                {categories.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products/${cat.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-500 hover:text-orange hover:bg-orange-50 transition-colors"
                    onClick={() => setShowCategories(false)}
                  >
                    <span className="text-base">{cat.icon}</span>
                    <span>{cat.name}</span>
                    <span className="ml-auto text-[10px] text-surface-400">
                      {cat.item_count}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <Link
            href="/products/whole-spices"
            className="flex items-center gap-1.5 text-sm font-medium text-orange hover:text-orange-dark transition-colors"
          >
            <Flame size={14} /> Hot Deals
          </Link>
          <Link href="/" className="text-sm font-semibold text-navy">
            Home
          </Link>
          <Link
            href="/products/grains"
            className="text-sm font-medium text-surface-500 hover:text-navy transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/seller"
            className="text-sm font-medium text-surface-500 hover:text-navy transition-colors"
          >
            Vendors
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-surface-500 hover:text-navy transition-colors"
          >
            Contact
          </Link>

          <div className="ml-auto hidden lg:flex items-center gap-2 text-xs">
            <Sparkles size={13} className="text-orange" />
            <span className="text-orange font-bold">FLASH SALE</span>
            <span className="text-surface-300">|</span>
            <span className="text-surface-400">
              Use code:{" "}
              <span className="text-navy font-bold">FRESH20</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
