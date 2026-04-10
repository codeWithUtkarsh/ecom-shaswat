"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Truck,
  Package,
  Handshake,
  Star,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

/* ══════════════════════════════════════════════════
   EXPANDING PANEL SHOWCASE

   5 vertical panels. Hover/click one to expand it.
   Each tells a chapter of the farm-to-shelf story.
   The last panel (CTA) is expanded by default.
   ══════════════════════════════════════════════════ */

const panels = [
  {
    id: "source",
    icon: Leaf,
    label: "Source",
    color: "#3d8a5e",
    accent: "from-emerald-500/20 to-emerald-900/40",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=1000&fit=crop",
    stat: "12",
    statLabel: "Source Countries",
    heading: "Directly from Indian Farms",
    description:
      "We work with verified farms across 12 Indian states — Gujarat, Rajasthan, Madhya Pradesh and beyond. Every batch is traceable to its origin.",
  },
  {
    id: "quality",
    icon: ShieldCheck,
    label: "Quality",
    color: "#c17f59",
    accent: "from-amber-500/20 to-amber-900/40",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=800&h=1000&fit=crop",
    stat: "98%+",
    statLabel: "Purity Grade",
    heading: "Export-Grade Standards",
    description:
      "Machine cleaned, sortex graded, and lab tested. FSSAI, ISO 22000, HACCP and BRC certified. No compromises on quality.",
  },
  {
    id: "range",
    icon: Package,
    label: "Range",
    color: "#8b5cf6",
    accent: "from-violet-500/20 to-violet-900/40",
    image:
      "https://images.unsplash.com/photo-1606585546917-fdd0f04bb8b4?w=800&h=1000&fit=crop",
    stat: "35+",
    statLabel: "Product Lines",
    heading: "Complete Indian Pantry",
    description:
      "Basmati rice, whole spices, lentils, flours, Tata Sampann masalas, MTR ready mixes — everything UK retailers need in one order.",
  },
  {
    id: "deliver",
    icon: Truck,
    label: "Deliver",
    color: "#0ea5e9",
    accent: "from-sky-500/20 to-sky-900/40",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=1000&fit=crop",
    stat: "48h",
    statLabel: "UK Delivery",
    heading: "On Your Shelves Fast",
    description:
      "Free delivery on orders over £500. Temperature-controlled logistics. Real-time tracking from warehouse to your store.",
  },
  {
    id: "partner",
    icon: Handshake,
    label: "Partner",
    color: "#c17f59",
    accent: "from-terra/30 to-amber-900/40",
    image: null, // CTA panel — no image
    stat: "",
    statLabel: "",
    heading: "Are You a UK Retailer?",
    description:
      "Join our Partner Programme and connect with India's finest farms. Get exclusive wholesale pricing, priority stock access, and a dedicated account manager — all with zero upfront commitment.",
  },
];

/* ── Magnetic wrapper ── */
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ── Single accordion panel ── */
function Panel({
  panel,
  isActive,
  onActivate,
  index,
}: {
  panel: (typeof panels)[0];
  isActive: boolean;
  onActivate: () => void;
  index: number;
}) {
  const Icon = panel.icon;
  const isCTA = panel.id === "partner";

  return (
    <motion.div
      layout
      onClick={onActivate}
      className={`relative overflow-hidden cursor-pointer transition-[border-color] duration-500 ${
        isActive
          ? "flex-[5] md:flex-[6]"
          : "flex-[0.8] md:flex-1 hover:flex-[1.2] md:hover:flex-[1.5]"
      } ${index === 0 ? "rounded-l-2xl md:rounded-l-3xl" : ""} ${
        index === panels.length - 1 ? "rounded-r-2xl md:rounded-r-3xl" : ""
      }`}
      style={{
        borderRight:
          index < panels.length - 1
            ? "1px solid rgba(255,255,255,0.04)"
            : "none",
        transition: "flex 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Background image (for non-CTA panels) */}
      {panel.image && (
        <div className="absolute inset-0">
          <Image
            src={panel.image}
            alt={panel.label}
            fill
            className={`object-cover transition-all duration-1000 ${
              isActive ? "scale-100 opacity-100" : "scale-110 opacity-30"
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              isActive ? "opacity-100" : "opacity-80"
            }`}
            style={{
              background: isActive
                ? "linear-gradient(to right, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.7) 100%)"
                : "linear-gradient(to right, rgba(5,5,5,0.95), rgba(5,5,5,0.9))",
            }}
          />
        </div>
      )}

      {/* CTA panel gradient background */}
      {isCTA && (
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${panel.accent}`} />
          {/* Animated mesh */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 30% 20%, rgba(193,127,89,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(184,134,11,0.1) 0%, transparent 50%)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Color accent line at top */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: panel.color }}
      />

      {/* ── COLLAPSED STATE ── */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-500 ${
          isActive ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${panel.color}20` }}
        >
          <Icon size={18} style={{ color: panel.color }} />
        </motion.div>
        <span
          className="text-[10px] font-bold tracking-[0.2em] uppercase"
          style={{
            writingMode: "vertical-lr",
            color: `${panel.color}99`,
          }}
        >
          {panel.label}
        </span>
      </div>

      {/* ── EXPANDED STATE ── */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8 lg:p-10"
          >
            {/* Top: Icon + Label */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 mb-6"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${panel.color}20` }}
                >
                  <Icon size={15} style={{ color: panel.color }} />
                </div>
                <span
                  className="text-[10px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: `${panel.color}aa` }}
                >
                  {panel.label}
                </span>
              </motion.div>

              {/* Stat — large */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 60 }}
                className="mb-4"
              >
                <span
                  className="font-display text-6xl md:text-7xl lg:text-8xl font-bold italic tracking-tight"
                  style={{ color: panel.color }}
                >
                  {panel.stat}
                </span>
                <span className="block text-[9px] tracking-[0.2em] text-white/20 font-semibold uppercase mt-1">
                  {panel.statLabel}
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white italic leading-tight mb-3"
              >
                {panel.heading}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-white/30 text-xs md:text-sm leading-relaxed max-w-md"
              >
                {panel.description}
              </motion.p>
            </div>

            {/* Bottom: CTA (only for partner panel) */}
            {isCTA && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex flex-wrap items-center gap-3 mt-6"
              >
                <Link
                  href="/products/whole-spices"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-terra via-terra-500 to-amber-800 hover:brightness-110 transition-all duration-300 group shadow-[0_0_20px_rgba(193,127,89,0.2)]"
                >
                  Browse Catalogue
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="px-7 py-3.5 rounded-full text-sm font-semibold text-white/60 border border-white/10 hover:text-white hover:border-white/25 hover:bg-white/[0.05] transition-all duration-300"
                >
                  Request Pricing
                </Link>
              </motion.div>
            )}

            {/* Bottom: Explore link (for non-CTA panels) */}
            {!isCTA && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                <Link
                  href={`/products/${
                    panel.id === "source"
                      ? "whole-spices"
                      : panel.id === "quality"
                        ? "whole-spices"
                        : panel.id === "range"
                          ? "blended-spices"
                          : "grains"
                  }`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold group/link"
                  style={{ color: `${panel.color}99` }}
                >
                  Explore
                  <ArrowRight
                    size={12}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════════════ */
export default function AppDownload() {
  const [active, setActive] = useState(4); // "Partner" panel expanded by default

  return (
    <section className="relative w-full bg-[#050505] overflow-hidden mt-16 lg:mt-24">
      {/* Ambient glow behind panels */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(26,58,42,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Top/bottom edge lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6 lg:mb-8 px-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-[0.3em] text-terra-300/60 uppercase">
              The Journey
            </span>
            <span className="h-px w-12 bg-terra/20" />
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={8} className="text-amber-400/80 fill-amber-400/80" />
            ))}
            <span className="text-white/50 text-[9px] ml-1.5">Trusted by retailers</span>
          </div>
        </div>

        {/* ═══ THE ACCORDION ═══ */}
        <div className="flex h-[350px] md:h-[380px] lg:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.04]">
          {panels.map((panel, i) => (
            <Panel
              key={panel.id}
              panel={panel}
              index={i}
              isActive={active === i}
              onActivate={() => setActive(i)}
            />
          ))}
        </div>

        {/* Bottom bar: trust + certs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-between gap-4 mt-6 lg:mt-8 px-2"
        >
          <div className="flex items-center gap-4 text-[10px] text-white/50 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={10} className="text-terra-300/80" />
              Export-Grade Quality
            </span>
          </div>
          <div className="flex items-center gap-3 text-[9px] text-white/40 tracking-wider font-medium">
            {["FSSAI", "ISO 22000", "HACCP", "BRC"].map((c) => (
              <span key={c} className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-500/60" />
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
