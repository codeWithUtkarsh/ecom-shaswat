"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const smoothSpring = { type: "spring" as const, stiffness: 60, damping: 18 };

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full px-4 py-3 bg-cream border border-forest/8 rounded-xl text-sm text-bark placeholder:text-bark-300 focus:outline-none focus:border-terra/30 focus:ring-2 focus:ring-terra/8 transition-all";

  return (
    <div className="min-h-screen bg-warmth">
      {/* Hero */}
      <section className="bg-forest-900 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(193,127,89,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24 relative">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[10px] font-bold tracking-[0.2em] text-terra-300/70 uppercase">
            Get in Touch
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ...smoothSpring }} className="font-display text-4xl lg:text-5xl font-bold text-white italic leading-tight mt-3 mb-4">
            Let&apos;s Talk Business
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-white/40 text-sm md:text-base max-w-lg leading-relaxed">
            Whether you&apos;re placing your first wholesale order or exploring our product range — we respond within 24 hours.
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ...smoothSpring }} className="lg:col-span-2">
            <div className="bg-cream-50 rounded-3xl p-8 border border-forest/5 shadow-soft-lg">
              {submitted ? (
                <div className="text-center py-16">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={28} className="text-emerald-500" />
                    </div>
                  </motion.div>
                  <h3 className="font-display text-xl font-semibold text-forest italic mb-2">Message Sent!</h3>
                  <p className="text-bark-400 text-sm">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-bark-600 mb-2">Full Name</label>
                      <input type="text" required placeholder="John Smith" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-bark-600 mb-2">Business Name</label>
                      <input type="text" placeholder="Your Store Ltd" className={inputClass} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-bark-600 mb-2">Email</label>
                      <input type="email" required placeholder="you@business.com" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-bark-600 mb-2">Phone</label>
                      <input type="tel" placeholder="+44 ..." className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-bark-600 mb-2">Subject</label>
                    <select className={inputClass} defaultValue="">
                      <option value="" disabled>Select a topic</option>
                      <option>Wholesale Pricing Enquiry</option>
                      <option>Place a Bulk Order</option>
                      <option>Become a Partner</option>
                      <option>Product Information</option>
                      <option>Delivery & Logistics</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-bark-600 mb-2">Message</label>
                    <textarea rows={5} required placeholder="Tell us about your requirements..." className={inputClass} />
                  </div>
                  <button type="submit" className="inline-flex items-center gap-2 bg-terra text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-terra-500 transition-all shadow-warm-glow">
                    Send Message <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: MapPin, title: "Visit Us", lines: ["Vyapaar Global Ltd", "London, United Kingdom"], delay: 0.35 },
              { icon: Mail, title: "Email", lines: ["hello@vyapaarglobal.com", "orders@vyapaarglobal.com"], delay: 0.4 },
              { icon: Phone, title: "Phone", lines: ["+44 20 7946 0958", "Mon–Fri, 9am–6pm GMT"], delay: 0.45 },
              { icon: Clock, title: "Response Time", lines: ["We typically respond", "within 24 hours"], delay: 0.5 },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: item.delay, ...smoothSpring }} className="bg-cream-50 rounded-2xl p-5 border border-forest/5 hover:shadow-soft-lg hover:border-forest/10 transition-all duration-300 group">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-forest/[0.06] flex items-center justify-center shrink-0 group-hover:bg-terra/10 transition-colors">
                    <item.icon size={16} className="text-forest-400 group-hover:text-terra transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-forest mb-1">{item.title}</h3>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-bark-400 text-xs">{line}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
