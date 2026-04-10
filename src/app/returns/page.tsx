"use client";

import { RotateCcw, Clock, CheckCircle, XCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";

const smoothSpring = { type: "spring" as const, stiffness: 60, damping: 18 };

export default function ReturnsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-forest-900 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 60% 80% at 50% 40%, rgba(193,127,89,0.06) 0%, transparent 50%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24 relative">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[10px] font-bold tracking-[0.2em] text-terra-300/70 uppercase">
            Policies
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ...smoothSpring }} className="font-display text-4xl lg:text-5xl font-bold text-white italic leading-tight mt-3 mb-4">
            Returns & Refunds
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-white/35 text-sm md:text-base max-w-lg leading-relaxed">
            We stand behind the quality of every product we sell. If something isn&apos;t right, we&apos;ll make it right.
          </motion.p>
        </div>
      </section>

      <div className="bg-warmth">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl space-y-8">
            {/* Return window */}
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={smoothSpring} className="bg-cream-50 rounded-3xl p-8 border border-forest/5 shadow-soft-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-terra/10 flex items-center justify-center">
                  <RotateCcw size={16} className="text-terra" />
                </div>
                <h2 className="font-display text-xl font-semibold text-forest italic">Return Window</h2>
              </div>
              <p className="text-bark-400 text-sm leading-relaxed">
                You have <strong className="text-forest">7 days</strong> from the date of delivery to report any issues. After 7 days, we may not be able to process a return for perishable goods.
              </p>
            </motion.div>

            {/* Eligible */}
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...smoothSpring, delay: 0.1 }} className="bg-cream-50 rounded-3xl p-8 border border-forest/5">
              <h2 className="font-display text-xl font-semibold text-forest italic mb-5">Eligible for Return</h2>
              <div className="space-y-3">
                {["Damaged or broken items on arrival", "Incorrect products received", "Products past their expiry date on delivery", "Quality not matching the described grade", "Short shipment (missing items from your order)"].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.05 }} className="flex items-center gap-2.5 text-sm text-bark-500">
                    <CheckCircle size={15} className="text-emerald-500 shrink-0" /> {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Not eligible */}
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...smoothSpring, delay: 0.15 }} className="bg-cream-50 rounded-3xl p-8 border border-forest/5">
              <h2 className="font-display text-xl font-semibold text-forest italic mb-5">Not Eligible</h2>
              <div className="space-y-3">
                {["Change of mind after delivery", "Products opened and partially used (unless defective)", "Damage caused by improper storage after delivery", "Orders placed in error (contact us before dispatch)"].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.05 }} className="flex items-center gap-2.5 text-sm text-bark-500">
                    <XCircle size={15} className="text-accent-rose shrink-0" /> {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Refund + How to */}
            {[
              { icon: Clock, title: "Refund Timeline", content: "Once approved, refunds are processed within 5–7 business days to the original payment method. Credit account customers get the amount credited to their balance." },
              { icon: Mail, title: "How to Request a Return", content: "Email orders@vyapaarglobal.com with your order number, photos of the issue, and a brief description. Our team will respond within 24 hours." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 + i * 0.08, ...smoothSpring }} className="flex gap-4 group">
                <div className="w-9 h-9 rounded-lg bg-forest/[0.06] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-terra/10 transition-colors">
                  <item.icon size={16} className="text-forest-400 group-hover:text-terra transition-colors" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-forest italic mb-1.5">{item.title}</h3>
                  <p className="text-bark-400 text-sm leading-relaxed">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
