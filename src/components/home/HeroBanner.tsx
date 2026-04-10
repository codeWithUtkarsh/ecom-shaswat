"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Leaf,
  Truck,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600&h=900&fit=crop",
    subtitle: "Premium Indian Spices",
    title: "Aromatic Spices",
    desc: "Cumin, cardamom, pepper & more — 98%+ purity, export grade.",
    cta: "Browse Spices",
    link: "/products/whole-spices",
  },
  {
    image:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=1600&h=900&fit=crop",
    subtitle: "Wholesale Lentils & Pulses",
    title: "Bulk Supply",
    desc: "Toor dal, masoor dal, rajma & chickpeas — machine cleaned, sortex graded.",
    cta: "View Pulses",
    link: "/products/lentils-pulses",
  },
  {
    image:
      "https://images.unsplash.com/photo-1606585546917-fdd0f04bb8b4?w=1600&h=900&fit=crop",
    subtitle: "Branded Ready Mixes",
    title: "MTR & Tata Sampann",
    desc: "Trusted Indian brands now available in bulk for UK retailers.",
    cta: "Shop Brands",
    link: "/products/blended-spices",
  },
];

const smoothSpring = { type: "spring" as const, stiffness: 80, damping: 20 };
const snappySpring = { type: "spring" as const, stiffness: 300, damping: 30 };

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: smoothSpring,
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...smoothSpring, delay: 0.35 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d.data?.categories ?? []))
      .catch(() => {});
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const bgX = useTransform(springX, [-0.5, 0.5], [12, -12]);
  const bgY = useTransform(springY, [-0.5, 0.5], [6, -6]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY],
  );

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current],
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const imageVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 1.15,
      x: dir > 0 ? 80 : -80,
    }),
    center: {
      opacity: 1,
      scale: 1.05,
      x: 0,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 1,
      x: dir > 0 ? -80 : 80,
      transition: { duration: 0.5, ease: "easeIn" },
    }),
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════ */}
      {/* HERO — constrained width                        */}
      {/* ═══════════════════════════════════════════════ */}
      <motion.section
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-[500px] max-h-[700px] h-[70vh] overflow-hidden group/hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background images */}
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <motion.div
              className="absolute inset-0"
              style={{ x: bgX, y: bgY }}
            >
              <Image
                src={slides[current].image}
                alt={slides[current].title}
                fill
                className="object-cover scale-110"
                priority
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-forest-900/80 via-forest-900/35 to-forest-900/80" />
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 45%, transparent 30%, rgba(6,16,10,0.35) 100%)",
          }}
        />

        {/* ── Centered text content ── */}
        <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-6 pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center"
            >
              {/* Badge */}
              <motion.div variants={fadeSlideUp}>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm text-cream-200 px-5 py-2 rounded-full text-xs md:text-sm font-semibold tracking-wide">
                  <Leaf size={13} className="text-sage-300" />
                  {slides[current].subtitle}
                </span>
              </motion.div>

              {/* Headline — word stagger with 3D flip */}
              <motion.h1
                className="font-display text-5xl md:text-7xl lg:text-[6rem] font-bold text-white mt-6 mb-5 leading-[0.95] tracking-tight italic flex flex-wrap justify-center gap-x-5"
                variants={fadeSlideUp}
              >
                {slides[current].title.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: 50 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      ...smoothSpring,
                      delay: 0.2 + i * 0.12,
                    }}
                    className="inline-block"
                    style={{ perspective: 600 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeSlideUp}
                className="text-white/55 text-sm md:text-base max-w-lg leading-relaxed mb-8"
              >
                {slides[current].desc}
              </motion.p>

              {/* CTA */}
              <motion.div variants={scaleIn}>
                <Link href={slides[current].link}>
                  <motion.span
                    className="glow-pulse inline-flex items-center gap-2.5 bg-terra text-white px-9 py-4 rounded-full font-semibold text-sm md:text-base group/btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {slides[current].cta}
                    <ArrowRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Nav arrows ── */}
        <motion.button
          onClick={prev}
          className="absolute left-5 lg:left-8 top-1/2 -translate-y-1/2 z-[4] w-12 h-12 bg-white/10 border border-white/15 backdrop-blur-sm text-white/70 flex items-center justify-center opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={22} />
        </motion.button>
        <motion.button
          onClick={next}
          className="absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 z-[4] w-12 h-12 bg-white/10 border border-white/15 backdrop-blur-sm text-white/70 flex items-center justify-center opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={22} />
        </motion.button>

        {/* ── Slide indicators ── */}
        <div className="absolute bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2 z-[4] flex gap-2.5">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              className="relative h-[3px] overflow-hidden"
              animate={{ width: i === current ? 48 : 20 }}
              transition={snappySpring}
            >
              <div className="absolute inset-0 bg-white/20" />
              {i === current && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-terra"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  key={`progress-${current}`}
                />
              )}
            </motion.button>
          ))}
        </div>

      </motion.section>

      {/* ── Category strip — overlaps hero bottom edge ── */}
      <div className="relative z-10 -mt-4 lg:-mt-5">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <motion.div
            className="bg-white/95 backdrop-blur-md border border-white/60 shadow-soft-lg overflow-hidden"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...smoothSpring, delay: 0.4 }}
          >
            <div className="flex py-2 marquee-left">
              {/* Repeat categories enough times so each half always exceeds viewport width */}
              {[...categories, ...categories, ...categories, ...categories].map((cat, i) => (
                <Link
                  key={`${cat.id}-${i}`}
                  href={`/products/${cat.slug}`}
                  className="flex flex-col items-center gap-0.5 px-6 sm:px-8 shrink-0 hover:bg-forest/[0.03] transition-colors group"
                >
                  <motion.div
                    className="w-10 h-5 sm:w-12 sm:h-6 lg:w-14 lg:h-7"
                    whileHover={{ scale: 1.1 }}
                    transition={snappySpring}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={112}
                      height={28}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  <span className="text-[9px] lg:text-[11px] font-semibold text-forest/70 group-hover:text-terra transition-colors whitespace-nowrap">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* PROMO CARDS + TRUST — below hero               */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-6 lg:mt-8">
        {/* Promo cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...smoothSpring, delay: 0.1 }}
          >
            <Link
              href="/products/grains"
              className="relative overflow-hidden h-[200px] lg:h-[220px] group border border-forest/5 hover:shadow-card-hover transition-shadow duration-500 block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-forest-50 via-forest-50/90 to-transparent z-[1]" />
              <motion.div
                className="absolute right-0 top-0 w-[55%] h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop"
                  alt="Grains and flour"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="relative z-[2] p-6 lg:p-8 flex flex-col justify-center h-full">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-forest-300 mb-1">
                  Grains & Flours
                </span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-forest italic leading-tight mb-2">
                  Premium Staples
                </h3>
                <p className="text-bark-500 text-xs mb-4">
                  Basmati rice, atta, besan & millet flours in bulk
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-terra group-hover:gap-2.5 transition-all duration-300">
                  Learn More <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...smoothSpring, delay: 0.2 }}
          >
            <Link
              href="/products/whole-spices"
              className="relative overflow-hidden h-[200px] lg:h-[220px] group border border-forest/5 hover:shadow-card-hover transition-shadow duration-500 block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-terra-50 via-terra-50/90 to-transparent z-[1]" />
              <motion.div
                className="absolute right-0 top-0 w-[55%] h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop"
                  alt="Whole spices"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="relative z-[2] p-6 lg:p-8 flex flex-col justify-center h-full">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-terra mb-1">
                  Whole Spices
                </span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-forest italic leading-tight mb-2">
                  Aromatic Spices
                </h3>
                <p className="text-bark-500 text-xs mb-4">
                  Cumin, cardamom, pepper & more — 98%+ purity
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-terra group-hover:gap-2.5 transition-all duration-300">
                  Learn More <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Trust indicators */}
        <motion.div
          className="mt-5 lg:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {[
            { icon: Truck, title: "Free UK Delivery", desc: "On orders over £500" },
            { icon: Shield, title: "Quality Guaranteed", desc: "Farm-verified produce" },
            { icon: Leaf, title: "Organic Certified", desc: "Trusted global sourcing" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: smoothSpring },
              }}
              whileHover={{ y: -2 }}
              className="flex items-center gap-3.5 px-5 py-4 bg-cream-50 border border-forest/5 hover:border-forest/10 transition-colors duration-300 group"
            >
              <motion.div
                className="w-10 h-10 bg-forest/[0.04] flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={snappySpring}
              >
                <item.icon size={18} className="text-forest-400" />
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-forest">{item.title}</p>
                <p className="text-xs text-bark-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
