"use client";

import { Truck, Clock, MapPin, Package, ShieldCheck, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const smoothSpring = { type: "spring" as const, stiffness: 60, damping: 18 };

const deliveryTiers = [
  { min: "£0 – £499", fee: "£14.99", time: "3–5 business days", highlight: false },
  { min: "£500 – £999", fee: "Free", time: "2–3 business days", highlight: true },
  { min: "£1,000+", fee: "Free + Priority", time: "1–2 business days", highlight: false },
];

const details = [
  { icon: Clock, title: "Order Cut-Off Times", content: "Orders placed before 2pm GMT (Monday–Friday) are dispatched the same day. Orders placed after 2pm or on weekends are dispatched the next business day." },
  { icon: MapPin, title: "Delivery Areas", content: "We deliver to all UK mainland addresses. Scottish Highlands, Northern Ireland, and offshore islands may incur an additional surcharge. Contact us for a quote." },
  { icon: Package, title: "Packaging", content: "All products are packed in food-grade, temperature-appropriate packaging. Fragile items like spice jars are individually wrapped. Bulk orders (50kg+) are palletised." },
  { icon: ShieldCheck, title: "Tracking", content: "You'll receive a tracking number via email once your order is dispatched. Real-time tracking is available through our logistics partner's portal." },
  { icon: AlertCircle, title: "Damaged or Missing Items", content: "If your delivery arrives damaged or items are missing, contact us within 48 hours at orders@vyapaarglobal.com with photos. We'll arrange a replacement or refund promptly." },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-forest-900 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 60% 80% at 30% 50%, rgba(193,127,89,0.08) 0%, transparent 50%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24 relative">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[10px] font-bold tracking-[0.2em] text-terra-300/70 uppercase">
            Logistics
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ...smoothSpring }} className="font-display text-4xl lg:text-5xl font-bold text-white italic leading-tight mt-3 mb-4">
            Delivery Information
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-white/35 text-sm md:text-base max-w-lg leading-relaxed">
            Temperature-controlled logistics ensuring your products arrive fresh and on time across the UK.
          </motion.p>
        </div>
      </section>

      <div className="bg-warmth">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl">
            {/* Delivery tiers */}
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={smoothSpring} className="mb-12">
              <h2 className="font-display text-xl font-semibold text-forest italic mb-6">Delivery Rates</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {deliveryTiers.map((tier, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }} className={`rounded-2xl p-5 border text-center ${tier.highlight ? "bg-terra/5 border-terra/20 shadow-soft-lg" : "bg-cream-50 border-forest/5"}`}>
                    <p className="text-bark-400 text-xs mb-2">{tier.min}</p>
                    <p className={`font-display text-2xl font-bold italic ${tier.highlight ? "text-terra" : "text-forest"}`}>{tier.fee}</p>
                    <p className="text-bark-300 text-[11px] mt-1">{tier.time}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <div className="space-y-6">
              {details.map((section, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 + i * 0.05, ...smoothSpring }} className="flex gap-4 group">
                  <div className="w-9 h-9 rounded-lg bg-forest/[0.06] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-terra/10 transition-colors">
                    <section.icon size={16} className="text-forest-400 group-hover:text-terra transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-forest italic mb-1.5">{section.title}</h3>
                    <p className="text-bark-400 text-sm leading-relaxed">{section.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
