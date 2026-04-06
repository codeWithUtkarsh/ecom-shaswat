"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Link2,
  Users,
  Globe,
  Package,
  Truck,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, value: "500+", label: "UK Retailers" },
  { icon: Globe, value: "12", label: "Source Countries" },
  { icon: Package, value: "35+", label: "Product Lines" },
  { icon: Truck, value: "48h", label: "UK Delivery" },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Export-Grade Quality",
    desc: "Machine cleaned, sortex graded — 98%+ purity on all spices",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Brands",
    desc: "Tata Sampann, MTR & verified Indian suppliers",
  },
];

const smoothSpring = { type: "spring" as const, stiffness: 80, damping: 20 };

export default function AppDownload() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-14 lg:mt-20 mb-10">
      <motion.div
        className="relative rounded-[2rem] overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={smoothSpring}
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-forest" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(193, 127, 89, 0.1) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 100% 0%, rgba(26, 58, 42, 0.4) 0%, transparent 50%)",
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 rounded-[2rem] border border-white/[0.06] pointer-events-none z-10" />

        <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-0 px-8 md:px-12 lg:px-16 py-14 lg:py-16">
          {/* Left content */}
          <div className="flex-1 max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...smoothSpring, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/10 text-sage-300 px-4 py-2 rounded-full text-xs font-semibold mb-6 backdrop-blur-sm"
            >
              <Link2 size={12} className="text-terra-300" />
              Become a Retail Partner
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...smoothSpring, delay: 0.15 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-[1.1] italic"
            >
              From Indian Farms to Your{" "}
              <span className="text-terra-300">UK Shelves</span> — Delivered
              Fast
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...smoothSpring, delay: 0.2 }}
              className="text-white/45 mb-8 text-sm md:text-base leading-relaxed max-w-md"
            >
              Premium basmati rice, whole spices, lentils, branded masalas &
              ready mixes — sourced directly, priced competitively, delivered to
              your doorstep.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...smoothSpring, delay: 0.25 }}
              className="flex gap-6 sm:gap-8 mb-9"
            >
              {stats.map((stat, i) => (
                <div key={i} className="group">
                  <stat.icon
                    size={16}
                    className="text-terra-300/70 mb-2 group-hover:text-terra-300 transition-colors"
                  />
                  <div className="font-display text-2xl md:text-3xl font-bold text-white italic tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-white/30 mt-0.5 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...smoothSpring, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/products/whole-spices"
                className="flex items-center gap-2.5 bg-terra text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-terra-500 transition-all duration-300 group shadow-warm-glow"
              >
                Browse Catalogue
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-white/[0.07] border border-white/15 text-white px-8 py-3.5 rounded-full font-medium text-sm hover:bg-white/[0.12] hover:border-white/25 transition-all duration-300 backdrop-blur-sm"
              >
                Request Pricing
              </Link>
            </motion.div>
          </div>

          {/* Right — image + feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...smoothSpring, delay: 0.2 }}
            className="relative flex-shrink-0 w-full lg:w-auto"
          >
            <div className="relative mx-auto lg:ml-auto w-72 h-72 md:w-80 md:h-80">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-terra/20 via-transparent to-forest-400/20 rounded-[2rem] blur-3xl opacity-50" />

              {/* Main image */}
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-white/[0.08]">
                <Image
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&h=500&fit=crop"
                  alt="Premium Indian spices and grains"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent" />
              </div>

              {/* Floating feature cards */}
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...smoothSpring, delay: 0.4 + i * 0.15 }}
                  className={`absolute ${i === 0 ? "-left-8 md:-left-16 top-6" : "-left-4 md:-left-12 bottom-8"} bg-white/[0.08] backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 max-w-[220px]`}
                >
                  <div className="w-9 h-9 rounded-lg bg-terra/20 flex items-center justify-center flex-shrink-0">
                    <feat.icon size={16} className="text-terra-300" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-tight">
                      {feat.title}
                    </p>
                    <p className="text-white/35 text-[10px] mt-0.5 leading-snug">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
