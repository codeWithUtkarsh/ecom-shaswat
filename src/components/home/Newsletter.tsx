"use client";

import { useState } from "react";
import { Send, Mail, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="relative bg-cream overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 80% at 50% 50%, rgba(193,127,89,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-2xl md:text-3xl font-bold text-forest italic leading-tight mb-3"
          >
            Never Miss a Price Update
          </motion.h2>

          {/* Description with decorative quotes */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative max-w-lg mx-auto mb-8"
          >
            <span className="absolute -top-4 -left-2 font-display text-5xl md:text-6xl text-terra/20 leading-none select-none">&ldquo;</span>
            <p className="text-bark-400 text-sm md:text-base leading-relaxed px-4">
              Join our weekly newsletter and be the first to know about new
              arrivals, seasonal offers, exclusive wholesale pricing, and
              supply chain updates — straight to your inbox every Thursday.
            </p>
            <span className="absolute -bottom-6 -right-2 font-display text-5xl md:text-6xl text-terra/20 leading-none select-none">&rdquo;</span>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex w-full max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-bark-300"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your business email..."
                required
                className="w-full pl-10 pr-4 py-3.5 bg-white border border-forest/10 rounded-l-xl text-sm text-forest placeholder:text-bark-300 focus:outline-none focus:border-terra/40 focus:ring-1 focus:ring-terra/20 transition-all"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-terra via-terra-500 to-amber-800 text-white px-6 py-3.5 rounded-r-xl font-semibold text-sm hover:brightness-110 transition-all flex items-center gap-2 shrink-0"
            >
              Subscribe
              <Send size={14} />
            </button>
          </motion.form>

          {/* Success message */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mt-4 text-emerald-600 text-sm font-medium"
            >
              <CheckCircle size={15} />
              You&apos;re in! Check your inbox on Thursday.
            </motion.div>
          )}

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-bark-300 text-[10px] mt-5"
          >
            No spam, ever. Unsubscribe anytime. Sent weekly on Thursdays.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
