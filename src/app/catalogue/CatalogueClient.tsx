"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Leaf,
  Award,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Globe,
} from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const sourcingPromise = [
  {
    icon: ShieldCheck,
    title: "Export Grade",
    desc: "Every SKU meets EU import standards. FSSAI & HACCP certified facilities at origin.",
  },
  {
    icon: Globe,
    title: "Direct From Source",
    desc: "Grains from Punjab, spices from Kerala, pulses from Madhya Pradesh — no middlemen.",
  },
  {
    icon: Truck,
    title: "Bulk Logistics",
    desc: "Full-pallet & LCL shipping from Mumbai to UK retailers. Weekly sailings to Felixstowe.",
  },
];

export default function CataloguePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/products?limit=100`).then((r) => r.json()),
      fetch(`${API_BASE}/categories`).then((r) => r.json()),
    ])
      .then(([pRes, cRes]) => {
        setProducts(pRes.data?.products ?? []);
        setCategories(cRes.data?.categories ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.vendor?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q),
      );
    }
    const sorted = [...result];
    if (sortBy === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "rating")
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return sorted;
  }, [products, activeCategory, searchQuery, sortBy]);

  const brands = useMemo(() => {
    const map = new Map<string, number>();
    products.forEach((p) => {
      const name = p.brand || p.vendor;
      if (name) map.set(name, (map.get(name) ?? 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  const featuredProducts = useMemo(
    () =>
      products
        .filter((p) => p.badge === "hot" || (p.rating ?? 0) >= 5)
        .slice(0, 3),
    [products],
  );

  const scrollToCatalogue = () => {
    document
      .getElementById("catalogue")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* ═══════════════════════════════════════════════ */}
      {/* HERO                                            */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-terra/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-forest/5 blur-3xl" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-[1.25fr,1fr] gap-12 items-center">
            {/* Left: headline */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/60 border border-forest/5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] text-terra mb-6"
              >
                <Sparkles size={12} />
                The Complete Catalogue
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-5xl lg:text-7xl font-semibold text-forest italic leading-[0.95] tracking-tight"
              >
                Every shelf.
                <br />
                <span className="text-terra">Every spice.</span>
                <br />
                One range.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-base lg:text-lg text-bark-500 max-w-[520px] leading-relaxed"
              >
                Browse our full B2B range of premium Indian staples, spices, and
                ready mixes — direct-sourced, export-graded, and shipped in
                pallet configurations built for UK retailers.
              </motion.p>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 grid grid-cols-3 gap-6 max-w-[480px]"
              >
                <StatBlock value={products.length || "—"} label="SKUs" />
                <StatBlock
                  value={categories.length || "—"}
                  label="Categories"
                />
                <StatBlock value={brands.length || "—"} label="Brands" />
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <button
                  onClick={scrollToCatalogue}
                  className="inline-flex items-center gap-2 bg-forest text-cream px-6 py-3.5 text-sm font-semibold hover:bg-forest-700 transition-colors"
                >
                  Browse catalogue <ArrowRight size={15} />
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-forest/15 text-forest px-6 py-3.5 text-sm font-semibold hover:bg-white/70 transition-colors"
                >
                  Request sample pack
                </Link>
              </motion.div>
            </div>

            {/* Right: floating product cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block aspect-square"
            >
              {featuredProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  className="absolute bg-cream-50 rounded-3xl overflow-hidden border border-forest/5 shadow-card-hover"
                  style={{
                    top: `${[2, 22, 48][i]}%`,
                    left: `${[8, 42, 12][i]}%`,
                    width: `${[44, 46, 42][i]}%`,
                    aspectRatio: "4/5",
                    zIndex: 3 - i,
                    transform: `rotate(${[-3, 4, -2][i]}deg)`,
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4 + i * 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                >
                  <div className="relative w-full h-[72%]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 1024px) 0px, 22vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] text-bark-400 uppercase tracking-wider font-semibold">
                      {p.vendor || p.brand}
                    </p>
                    <p className="font-display italic text-sm font-semibold text-forest mt-1 line-clamp-2">
                      {p.name}
                    </p>
                  </div>
                </motion.div>
              ))}
              {/* Decorative ring + dot */}
              <div className="absolute top-[8%] right-[12%] w-28 h-28 border-2 border-terra/20 rounded-full -z-10" />
              <div className="absolute bottom-[18%] right-[22%] w-14 h-14 bg-gold-200/40 rounded-full blur-xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CATEGORIES STRIP                                */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="border-y border-forest/5 bg-white/50 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 lg:py-10">
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-terra">
              Browse by
            </span>
            <h2 className="font-display text-2xl lg:text-3xl font-semibold text-forest italic mt-1">
              Categories
            </h2>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((cat) => {
              const active = activeCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.slug);
                    scrollToCatalogue();
                  }}
                  className={`group flex flex-col items-center gap-2 p-4 lg:p-5 rounded-2xl border transition-all duration-300 ${
                    active
                      ? "border-terra/30 bg-terra/5 shadow-warm-glow"
                      : "border-forest/5 bg-cream-50 hover:border-terra/15 hover:shadow-card"
                  }`}
                >
                  <span className="text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </span>
                  <span className="text-xs lg:text-sm font-semibold text-forest text-center leading-tight">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-bark-400">
                    {cat.item_count} SKU{cat.item_count !== 1 && "s"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* FILTER BAR + PRODUCT GRID                       */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        id="catalogue"
        className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-16 scroll-mt-24"
      >
        {/* Sticky filter bar */}
        <div className="sticky top-16 lg:top-[64px] z-30 -mx-6 lg:-mx-8 px-6 lg:px-8 py-4 bg-cream/90 backdrop-blur-md border-b border-forest/5">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
            {/* Category pills */}
            <div className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none -mx-2 px-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  activeCategory === "all"
                    ? "bg-forest text-cream shadow-soft-lg"
                    : "bg-white/60 text-forest/70 hover:text-terra border border-forest/5"
                }`}
              >
                All ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    activeCategory === cat.slug
                      ? "bg-terra text-white shadow-warm-glow"
                      : "bg-white/60 text-forest/70 hover:text-terra border border-forest/5"
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search + sort */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 lg:flex-none">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-bark-400"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-full bg-white/60 border border-forest/5 text-xs w-full lg:w-52 focus:outline-none focus:border-terra/30 focus:bg-white transition-all"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full bg-white/60 border border-forest/5 text-xs font-semibold text-forest cursor-pointer focus:outline-none focus:border-terra/30 appearance-none"
              >
                <option value="featured">Featured</option>
                <option value="name">A–Z</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results meta */}
        <div className="mt-6 mb-6 flex items-baseline justify-between">
          <p className="text-sm text-bark-400">
            {loading
              ? "Loading range..."
              : `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`}
            {activeCategory !== "all" &&
              categories.find((c) => c.slug === activeCategory) && (
                <>
                  {" "}
                  in{" "}
                  <span className="text-forest font-semibold italic">
                    {categories.find((c) => c.slug === activeCategory)!.name}
                  </span>
                </>
              )}
          </p>
          {(activeCategory !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="text-xs text-terra font-semibold hover:text-terra-500 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid / skeleton / empty */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-white/40 border border-forest/5 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            key={activeCategory + searchQuery + sortBy}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 stagger-children"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24 border border-forest/5 rounded-3xl bg-white/40">
            <div className="text-5xl mb-4">🌾</div>
            <p className="font-display italic text-forest text-lg">
              No products match your search.
            </p>
            <p className="text-bark-400 text-sm mt-2">
              Try a different category or search term.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-6 text-xs text-terra font-semibold hover:text-terra-500 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* BRANDS                                          */}
      {/* ═══════════════════════════════════════════════ */}
      {brands.length > 0 && (
        <section className="border-t border-forest/5 bg-gradient-to-b from-transparent to-white/40">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-terra">
                Trusted Suppliers
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-forest italic mt-2">
                Brands we carry
              </h2>
              <p className="text-bark-500 text-sm mt-3 max-w-xl mx-auto">
                Household Indian names — sourced directly from authorised export
                channels and shipped via our bonded logistics pipeline.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {brands.slice(0, 8).map((b) => (
                <div
                  key={b.name}
                  className="group flex flex-col items-center justify-center bg-white/70 border border-forest/5 rounded-2xl p-6 lg:p-7 hover:border-terra/15 hover:shadow-card transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-terra/10 to-gold-200/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Award size={20} className="text-terra" />
                  </div>
                  <p className="font-display italic text-forest font-semibold mt-3 text-center">
                    {b.name}
                  </p>
                  <p className="text-[10px] text-bark-400 mt-1">
                    {b.count} SKU{b.count !== 1 && "s"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/* SOURCING PROMISE                                */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="bg-forest text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold-200">
              Our promise
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold italic mt-2">
              Quality you can shelf with confidence
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {sourcingPromise.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/[0.07] transition-colors duration-500"
              >
                <div className="w-12 h-12 bg-gold-200/20 rounded-xl flex items-center justify-center mb-5">
                  <item.icon size={20} className="text-gold-200" />
                </div>
                <h3 className="font-display italic font-semibold text-xl mb-2">
                  {item.title}
                </h3>
                <p className="text-cream/70 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CLOSING CTA                                     */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-terra via-terra-500 to-gold-400 p-10 lg:p-16 text-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-cream rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <Leaf size={28} className="text-white/80 mx-auto mb-4" />
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-white italic leading-tight">
              Ready to shelf the range?
            </h2>
            <p className="text-white/85 text-base lg:text-lg mt-4 max-w-xl mx-auto">
              Request a curated sample pack or talk to our supply team for
              bespoke pallet configurations and wholesale pricing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-forest text-cream px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-forest-700 transition-colors"
              >
                Request sample pack <ArrowRight size={15} />
              </Link>
              <Link
                href="/seller"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white border border-white/30 px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/25 transition-colors"
              >
                Become a partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatBlock({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div>
      <div className="font-display text-4xl lg:text-5xl font-bold text-forest italic">
        {value}
      </div>
      <div className="text-xs text-bark-400 mt-1 font-medium">{label}</div>
    </div>
  );
}
