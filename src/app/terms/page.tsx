"use client";

import { motion } from "framer-motion";

const smoothSpring = { type: "spring" as const, stiffness: 60, damping: 18 };

const sections = [
  { title: "1. Acceptance of Terms", content: "By accessing and using the Vyapaar Global website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services. These terms apply to all visitors, users, and retail partners." },
  { title: "2. Account Registration", content: "To place orders, you must create an account with accurate business information. You are responsible for maintaining the confidentiality of your account credentials. You must be a registered UK business to access wholesale pricing." },
  { title: "3. Orders & Pricing", content: "All prices are quoted in GBP and exclude VAT unless stated otherwise. Prices are subject to change without notice, but confirmed orders will be honoured at the quoted price. We reserve the right to cancel orders if pricing errors occur." },
  { title: "4. Payment Terms", content: "Payment is due at the time of order unless you have an approved credit account. Credit terms (NET 30) are available for approved partners after their third order. Late payments may incur interest at 2% per month." },
  { title: "5. Delivery", content: "Delivery times are estimates and not guaranteed. We are not liable for delays caused by circumstances beyond our control. Risk of loss transfers to you upon delivery. Please inspect goods upon receipt and report any issues within 48 hours." },
  { title: "6. Returns & Refunds", content: "Returns are accepted within 7 days of delivery for eligible reasons as outlined in our Returns Policy. Refunds are processed within 5–7 business days of approval." },
  { title: "7. Product Information", content: "We make every effort to ensure product descriptions, images, and specifications are accurate. However, colours and packaging may vary slightly. Nutritional information is provided by manufacturers." },
  { title: "8. Intellectual Property", content: "All content on this website — including text, images, logos, and design — is the property of Vyapaar Global Ltd and protected by UK intellectual property laws." },
  { title: "9. Limitation of Liability", content: "To the maximum extent permitted by law, Vyapaar Global Ltd shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the value of the relevant order." },
  { title: "10. Governing Law", content: "These terms are governed by the laws of England and Wales. Any disputes shall be resolved in the courts of England and Wales." },
  { title: "11. Changes to Terms", content: "We may update these terms at any time. Continued use of our services after changes constitutes acceptance." },
  { title: "12. Contact", content: "For questions about these terms, contact us at legal@vyapaarglobal.com or write to: Vyapaar Global Ltd, London, United Kingdom." },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-forest-900 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24 relative">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[10px] font-bold tracking-[0.2em] text-terra-300/70 uppercase">Legal</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ...smoothSpring }} className="font-display text-4xl lg:text-5xl font-bold text-white italic leading-tight mt-3 mb-2">Terms of Service</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-white/25 text-sm">Last updated: April 2026</motion.p>
        </div>
      </section>

      <div className="bg-warmth">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl space-y-8">
            {sections.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.03 + i * 0.02 }}>
                <h2 className="font-display text-base font-semibold text-forest italic mb-2">{s.title}</h2>
                <p className="text-bark-400 text-sm leading-relaxed">{s.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
