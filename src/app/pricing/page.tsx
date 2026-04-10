"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const smoothSpring = { type: "spring" as const, stiffness: 60, damping: 18 };

const tiers = [
  {
    name: "Starter",
    desc: "For independent retailers getting started",
    moq: "No minimum",
    pricing: "Standard wholesale",
    features: ["Access to full product catalogue", "Standard wholesale pricing", "£14.99 delivery fee (under £500)", "Email support", "Online ordering portal"],
  },
  {
    name: "Growth",
    desc: "For established retailers with regular orders",
    moq: "£500+ per order",
    pricing: "5–10% below standard",
    popular: true,
    features: ["Everything in Starter", "Discounted wholesale pricing", "Free UK delivery", "Dedicated account manager", "NET 30 payment terms", "Priority stock allocation"],
  },
  {
    name: "Enterprise",
    desc: "For chains and high-volume buyers",
    moq: "£2,000+ per order",
    pricing: "Custom negotiated",
    features: ["Everything in Growth", "Custom pricing per product", "Priority 1–2 day delivery", "Quarterly business reviews", "Co-branded marketing support", "Flexible payment terms", "Volume rebates"],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-forest-900 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 60% 80% at 60% 40%, rgba(193,127,89,0.08) 0%, transparent 50%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24 relative">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[10px] font-bold tracking-[0.2em] text-terra-300/70 uppercase">
            Wholesale Pricing
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ...smoothSpring }} className="font-display text-4xl lg:text-5xl font-bold text-white italic leading-tight mt-3 mb-4">
            Transparent Pricing for Every Scale
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-white/35 text-sm md:text-base max-w-lg leading-relaxed">
            No hidden fees, no surprises. Our pricing scales with your business.
          </motion.p>
        </div>
      </section>

      <div className="bg-warmth">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
          {/* Tiers */}
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {tiers.map((tier, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1, ...smoothSpring }} className={`bg-cream-50 rounded-3xl p-7 border ${tier.popular ? "border-terra/30 shadow-soft-lg relative" : "border-forest/5"} hover:shadow-soft-lg transition-shadow duration-300`}>
                {tier.popular && (
                  <span className="absolute -top-3 left-6 bg-gradient-to-r from-terra to-amber-700 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-forest italic">{tier.name}</h3>
                <p className="text-bark-400 text-xs mt-1 mb-5">{tier.desc}</p>
                <div className="mb-1">
                  <span className="text-[10px] font-bold text-bark-300 uppercase tracking-wider">Min Order</span>
                  <p className="text-sm font-semibold text-forest">{tier.moq}</p>
                </div>
                <div className="mb-6">
                  <span className="text-[10px] font-bold text-bark-300 uppercase tracking-wider">Pricing</span>
                  <p className="text-sm font-semibold text-terra">{tier.pricing}</p>
                </div>
                <div className="space-y-2.5 mb-7">
                  {tier.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-bark-500">
                      <CheckCircle size={13} className="text-emerald-500 shrink-0" /> {f}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className={`block text-center py-2.5 rounded-full text-sm font-semibold transition-all ${tier.popular ? "bg-terra text-white hover:bg-terra-500 shadow-warm-glow" : "bg-forest/[0.06] text-forest hover:bg-forest/10"}`}>
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-cream-50 rounded-2xl p-6 border border-forest/5 text-center max-w-2xl mx-auto">
            <p className="text-bark-400 text-sm leading-relaxed">
              All prices exclude VAT. Specific product pricing is available upon request.
            </p>
            <Link href="/contact" className="text-terra font-semibold hover:text-terra-500 transition-colors inline-flex items-center gap-1 mt-2 text-sm">
              Request a full price list <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
