"use client";

import Link from "next/link";
import { ShoppingBag, Truck, RotateCcw, Users, CreditCard, MessageSquare, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const smoothSpring = { type: "spring" as const, stiffness: 60, damping: 18 };

const topics = [
  { icon: ShoppingBag, title: "Ordering", desc: "How to place orders, MOQs, and product availability", href: "/faq" },
  { icon: Truck, title: "Delivery & Shipping", desc: "Delivery times, tracking, and shipping zones", href: "/shipping" },
  { icon: RotateCcw, title: "Returns & Refunds", desc: "Return policy, refund timelines, and how to request", href: "/returns" },
  { icon: CreditCard, title: "Pricing & Payments", desc: "Wholesale pricing tiers and payment methods", href: "/pricing" },
  { icon: Users, title: "Partner Programme", desc: "How to join, benefits, and application process", href: "/seller" },
  { icon: MessageSquare, title: "Contact Support", desc: "Get in touch with our team directly", href: "/contact" },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-forest-900 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(193,127,89,0.06) 0%, transparent 50%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24 relative">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[10px] font-bold tracking-[0.2em] text-terra-300/70 uppercase">
            Help Centre
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ...smoothSpring }} className="font-display text-4xl lg:text-5xl font-bold text-white italic leading-tight mt-3 mb-4">
            How Can We Help?
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-white/35 text-sm md:text-base max-w-lg leading-relaxed">
            Find answers, browse guides, or get in touch with our support team.
          </motion.p>
        </div>
      </section>

      <div className="bg-warmth">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
          {/* Topic cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {topics.map((topic, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 + i * 0.06, ...smoothSpring }}>
                <Link href={topic.href} className="block bg-cream-50 rounded-2xl p-6 border border-forest/5 hover:shadow-soft-lg hover:border-forest/10 transition-all duration-300 group h-full">
                  <div className="w-10 h-10 rounded-xl bg-forest/[0.06] flex items-center justify-center mb-4 group-hover:bg-terra/10 transition-colors duration-300">
                    <topic.icon size={18} className="text-forest-400 group-hover:text-terra transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-forest italic mb-1">{topic.title}</h3>
                  <p className="text-bark-400 text-xs leading-relaxed mb-4">{topic.desc}</p>
                  <span className="text-xs font-semibold text-terra flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                    Learn more <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-cream-50 rounded-3xl p-8 border border-forest/5 text-center shadow-soft-lg">
            <MessageSquare size={24} className="text-bark-300 mx-auto mb-3" />
            <h2 className="font-display text-xl font-semibold text-forest italic mb-2">Can&apos;t find what you need?</h2>
            <p className="text-bark-400 text-sm mb-5">Our team is available Monday–Friday, 9am–6pm GMT.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/faq" className="inline-flex items-center gap-2 bg-forest/[0.06] text-forest px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-forest/10 transition-all">
                Browse FAQ
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-terra text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-terra-500 transition-all shadow-warm-glow">
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
