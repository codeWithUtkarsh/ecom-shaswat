"use client";

import { motion } from "framer-motion";

const smoothSpring = { type: "spring" as const, stiffness: 60, damping: 18 };

const cookies = [
  { name: "Session Cookie", type: "Essential", duration: "Session", purpose: "Maintains your login state and shopping cart across pages." },
  { name: "CSRF Token", type: "Essential", duration: "Session", purpose: "Protects against cross-site request forgery attacks." },
  { name: "Cookie Consent", type: "Essential", duration: "1 year", purpose: "Remembers your cookie preference." },
  { name: "Analytics", type: "Optional", duration: "2 years", purpose: "Helps us understand how visitors interact with our website." },
  { name: "Performance", type: "Optional", duration: "1 year", purpose: "Monitors page load times and error rates to improve site performance." },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-forest-900 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24 relative">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[10px] font-bold tracking-[0.2em] text-terra-300/70 uppercase">Legal</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ...smoothSpring }} className="font-display text-4xl lg:text-5xl font-bold text-white italic leading-tight mt-3 mb-2">Cookie Policy</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-white/25 text-sm">Last updated: April 2026</motion.p>
        </div>
      </section>

      <div className="bg-warmth">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl space-y-8">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-base font-semibold text-forest italic mb-2">What Are Cookies?</h2>
              <p className="text-bark-400 text-sm leading-relaxed">
                Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how you use it. Some are essential for the site to function, while others help us improve your experience.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h2 className="font-display text-base font-semibold text-forest italic mb-4">Cookies We Use</h2>
              <div className="bg-cream-50 rounded-2xl border border-forest/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-forest/8 bg-forest/[0.02]">
                        <th className="text-left py-3 px-4 font-semibold text-bark-600">Cookie</th>
                        <th className="text-left py-3 px-4 font-semibold text-bark-600">Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-bark-600">Duration</th>
                        <th className="text-left py-3 px-4 font-semibold text-bark-600">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cookies.map((c, i) => (
                        <motion.tr key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.04 }} className="border-b border-forest/5 last:border-0">
                          <td className="py-3 px-4 text-bark-500 font-medium">{c.name}</td>
                          <td className="py-3 px-4">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.type === "Essential" ? "bg-forest/10 text-forest" : "bg-terra/10 text-terra"}`}>
                              {c.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-bark-400">{c.duration}</td>
                          <td className="py-3 px-4 text-bark-400">{c.purpose}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <h2 className="font-display text-base font-semibold text-forest italic mb-2">Managing Cookies</h2>
              <p className="text-bark-400 text-sm leading-relaxed">
                You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. However, blocking essential cookies may prevent the website from functioning properly.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h2 className="font-display text-base font-semibold text-forest italic mb-2">Contact</h2>
              <p className="text-bark-400 text-sm leading-relaxed">
                For questions about our use of cookies, contact us at <span className="text-terra font-medium">privacy@vyapaarglobal.com</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
