"use client";

import { motion } from "framer-motion";

const smoothSpring = { type: "spring" as const, stiffness: 60, damping: 18 };

const sections = [
  { title: "1. Information We Collect", content: "We collect information you provide directly: name, email, phone number, business name, delivery address, and payment details when you create an account or place an order. We also collect usage data automatically through cookies and analytics tools, including your IP address, browser type, pages visited, and time spent on our site." },
  { title: "2. How We Use Your Information", content: "We use your information to: process and fulfil your orders; manage your account and provide customer support; send order confirmations, shipping updates, and invoices; send marketing communications (only with your consent); improve our website and services; comply with legal obligations." },
  { title: "3. Data Sharing", content: "We share your information only with: our logistics partners (for delivery fulfilment); payment processors (for transaction processing); analytics providers (anonymised usage data). We never sell your personal data to third parties." },
  { title: "4. Data Security", content: "We implement industry-standard security measures including SSL encryption, secure payment processing, and access controls. All payment data is processed by PCI DSS compliant payment processors — we never store your full card details." },
  { title: "5. Your Rights", content: "Under UK GDPR, you have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data; object to processing of your data; request data portability; withdraw consent at any time. To exercise these rights, contact us at privacy@vyapaarglobal.com." },
  { title: "6. Cookies", content: "We use essential cookies to operate our website and optional cookies for analytics and marketing. You can manage your cookie preferences at any time. See our Cookie Policy for full details." },
  { title: "7. Data Retention", content: "We retain your account data for as long as your account is active. Order records are kept for 7 years for tax and legal compliance. You can request deletion of your account at any time." },
  { title: "8. Changes to This Policy", content: "We may update this policy from time to time. We'll notify you of significant changes via email or a notice on our website." },
  { title: "9. Contact Us", content: "For privacy-related enquiries, contact our Data Protection Officer at privacy@vyapaarglobal.com or write to: Vyapaar Global Ltd, London, United Kingdom." },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-forest-900 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24 relative">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[10px] font-bold tracking-[0.2em] text-terra-300/70 uppercase">Legal</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ...smoothSpring }} className="font-display text-4xl lg:text-5xl font-bold text-white italic leading-tight mt-3 mb-2">Privacy Policy</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-white/25 text-sm">Last updated: April 2026</motion.p>
        </div>
      </section>

      <div className="bg-warmth">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl">
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-bark-400 text-sm leading-relaxed mb-10">
              Vyapaar Global Ltd (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
            </motion.p>
            <div className="space-y-8">
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
    </div>
  );
}
