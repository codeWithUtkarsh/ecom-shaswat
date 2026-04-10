"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const smoothSpring = { type: "spring" as const, stiffness: 60, damping: 18 };

const faqs = [
  {
    category: "Ordering",
    questions: [
      { q: "What is the minimum order quantity (MOQ)?", a: "MOQs vary by product. Most spices and lentils have a 25kg MOQ, while rice starts at 100kg. Check individual product pages for specific MOQs, or contact us for flexible arrangements." },
      { q: "Can I order a sample before placing a bulk order?", a: "Yes! We offer sample packs for new partners. Contact us at hello@vyapaarglobal.com to request samples of any products in our catalogue." },
      { q: "Do you offer credit terms?", a: "Approved partners can access NET 30 payment terms after their third order. We also accept bank transfer, credit/debit cards, and PayPal for immediate payments." },
      { q: "Can I mix products in a single order?", a: "Absolutely. You can combine any products across categories in a single order. There's no requirement to order full pallets of a single item." },
    ],
  },
  {
    category: "Products",
    questions: [
      { q: "Where are your products sourced from?", a: "We source directly from verified farms across 12 Indian states including Gujarat, Rajasthan, Punjab, Madhya Pradesh, and Kerala. Every product is traceable to its origin." },
      { q: "Are your products certified?", a: "Yes. All products meet FSSAI, ISO 22000, HACCP, and BRC standards. Spices are machine cleaned and sortex graded with 98%+ purity. Certificates are available on request." },
      { q: "What brands do you carry?", a: "We carry Tata Sampann blended spices, MTR ready mixes, and our own Vyapaar Global label for raw ingredients like rice, lentils, and whole spices." },
    ],
  },
  {
    category: "Delivery",
    questions: [
      { q: "How long does delivery take?", a: "Standard delivery is 3–5 business days. Orders over £500 qualify for free express delivery (2–3 days). Orders over £1,000 get priority delivery (1–2 days)." },
      { q: "Do you deliver to all of the UK?", a: "We deliver to all UK mainland addresses. Scottish Highlands, Northern Ireland, and offshore islands may have additional charges. Contact us for a quote." },
      { q: "Can I track my order?", a: "Yes. You'll receive a tracking number via email once your order is dispatched. Real-time tracking is available through our logistics partner's portal." },
    ],
  },
  {
    category: "Partnership",
    questions: [
      { q: "How do I become a retail partner?", a: "Visit our Partner Programme page and fill out the application form. Our team will review and contact you within 48 hours." },
      { q: "Is there a fee to join?", a: "No. Zero upfront costs or monthly fees. You simply order at wholesale prices and we handle the rest." },
      { q: "Do you provide marketing support?", a: "Yes. Partners receive POS display materials, product photography, and promotional assets. We also offer in-store product tastings for select partners." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-forest/5 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left group">
        <span className={`text-sm font-medium pr-4 transition-colors ${open ? "text-forest" : "text-bark-500 group-hover:text-forest"}`}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} className="text-bark-300 shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <p className="text-bark-400 text-sm leading-relaxed pb-4 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-forest-900 relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 60% 80% at 40% 50%, rgba(193,127,89,0.06) 0%, transparent 50%)" }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24 relative">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[10px] font-bold tracking-[0.2em] text-terra-300/70 uppercase">
            Support
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ...smoothSpring }} className="font-display text-4xl lg:text-5xl font-bold text-white italic leading-tight mt-3 mb-4">
            Frequently Asked Questions
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-white/35 text-sm md:text-base max-w-lg leading-relaxed">
            Find answers to common questions about ordering, delivery, and partnering with us.
          </motion.p>
        </div>
      </section>

      <div className="bg-warmth">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl space-y-10">
            {faqs.map((section, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 + i * 0.05, ...smoothSpring }}>
                <h2 className="font-display text-lg font-semibold text-forest italic mb-4">{section.category}</h2>
                <div className="bg-cream-50 rounded-2xl px-6 border border-forest/5 hover:shadow-soft-lg transition-shadow duration-300">
                  {section.questions.map((faq, j) => (
                    <FAQItem key={j} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-cream-50 rounded-2xl p-8 border border-forest/5 text-center">
              <MessageSquare size={24} className="text-bark-300 mx-auto mb-3" />
              <p className="text-bark-400 text-sm mb-4">Still have questions?</p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-terra text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-terra-500 transition-all shadow-warm-glow">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
