"use client";

import Link from "next/link";
import { Handshake, TrendingUp, Globe, ShieldCheck, Truck, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const smoothSpring = { type: "spring" as const, stiffness: 60, damping: 18 };

const benefits = [
  { icon: TrendingUp, title: "Competitive Pricing", desc: "Direct farm sourcing means better margins for your store. No middlemen, no markups." },
  { icon: Globe, title: "35+ Product Lines", desc: "One supplier for your entire Indian grocery range — grains, spices, lentils, flours, and branded mixes." },
  { icon: Truck, title: "48h UK Delivery", desc: "Free delivery on orders over £500. Temperature-controlled logistics with real-time tracking." },
  { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Every batch is lab tested. FSSAI, ISO 22000, HACCP and BRC certified. 98%+ purity on all spices." },
];

const steps = [
  { num: "01", title: "Apply", desc: "Fill out our quick partnership form with your business details." },
  { num: "02", title: "Review", desc: "Our team reviews your application and contacts you within 48 hours." },
  { num: "03", title: "Onboard", desc: "Get your dedicated account manager, pricing sheet, and full catalogue access." },
  { num: "04", title: "Order", desc: "Place your first wholesale order with flexible MOQs and payment terms." },
];

const perks = [
  "Dedicated account manager",
  "Exclusive wholesale pricing",
  "Priority stock allocation",
  "Flexible payment terms (NET 30)",
  "Free delivery on orders over £500",
  "Marketing materials & POS displays",
  "Product training & tastings",
  "Monthly new product previews",
];

export default function SellerPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-forest-900 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 60% 80% at 80% 30%, rgba(193,127,89,0.1) 0%, transparent 50%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24 relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 text-white/60 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
            <Handshake size={11} className="text-terra-300" /> Partner Programme
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ...smoothSpring }} className="font-display text-4xl lg:text-5xl font-bold text-white italic leading-tight mb-4 max-w-3xl">
            Become a Vyapaar Global Retail Partner
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="text-white/35 text-sm md:text-base max-w-xl leading-relaxed mb-8">
            Join our growing network of UK retailers sourcing premium Indian food products directly from verified farms. Zero upfront commitment.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-terra via-terra-500 to-amber-800 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:brightness-110 transition-all group">
              Apply Now <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-warmth">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">Benefits</span>
            <h2 className="font-display text-3xl font-bold text-forest italic mt-3">Why Partner With Us</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08, ...smoothSpring }} className="bg-cream-50 rounded-2xl p-6 border border-forest/5 hover:shadow-soft-lg hover:border-forest/10 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-terra/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <b.icon size={18} className="text-terra" />
                </div>
                <h3 className="font-display text-sm font-semibold text-forest italic mb-2">{b.title}</h3>
                <p className="text-bark-400 text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-cream-50 border-y border-forest/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">Process</span>
            <h2 className="font-display text-3xl font-bold text-forest italic mt-3">How It Works</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1, ...smoothSpring }} className="relative text-center lg:text-left">
                <span className="font-display text-5xl font-bold text-forest/[0.06] italic">{s.num}</span>
                <h3 className="font-display text-lg font-semibold text-forest italic -mt-2 mb-2">{s.title}</h3>
                <p className="text-bark-400 text-xs leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 text-forest/10">
                    <ArrowRight size={16} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-warmth">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="bg-cream-50 rounded-3xl p-8 lg:p-12 border border-forest/5 shadow-soft-lg">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">Included</span>
              <h2 className="font-display text-2xl font-semibold text-forest italic mt-2 mb-8">What You Get as a Partner</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-3">
              {perks.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 + i * 0.05 }} className="flex items-center gap-2.5 text-sm text-bark-500">
                  <CheckCircle size={15} className="text-emerald-500 shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-8">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-terra text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-terra-500 transition-all shadow-warm-glow group">
                Start Your Application <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
