export default function CookiesPage() {
  const cookies = [
    { name: "Session Cookie", type: "Essential", duration: "Session", purpose: "Maintains your login state and shopping cart across pages." },
    { name: "CSRF Token", type: "Essential", duration: "Session", purpose: "Protects against cross-site request forgery attacks." },
    { name: "Cookie Consent", type: "Essential", duration: "1 year", purpose: "Remembers your cookie preference so we don't ask again." },
    { name: "Analytics", type: "Optional", duration: "2 years", purpose: "Helps us understand how visitors interact with our website (Google Analytics)." },
    { name: "Performance", type: "Optional", duration: "1 year", purpose: "Monitors page load times and error rates to improve site performance." },
  ];

  return (
    <div className="min-h-screen bg-warmth">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-3xl">
          <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">Legal</span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-forest italic leading-tight mt-3 mb-3">
            Cookie Policy
          </h1>
          <p className="text-bark-300 text-sm mb-12">Last updated: April 2026</p>

          <div className="space-y-8">
            <div>
              <h2 className="font-display text-base font-semibold text-forest italic mb-2">What Are Cookies?</h2>
              <p className="text-bark-400 text-sm leading-relaxed">
                Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how you use it. Some cookies are essential for the site to function, while others help us improve your experience.
              </p>
            </div>

            <div>
              <h2 className="font-display text-base font-semibold text-forest italic mb-4">Cookies We Use</h2>
              <div className="bg-cream-50 rounded-2xl border border-forest/5 overflow-hidden">
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
                      <tr key={i} className="border-b border-forest/5 last:border-0">
                        <td className="py-3 px-4 text-bark-500 font-medium">{c.name}</td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.type === "Essential" ? "bg-forest/10 text-forest" : "bg-terra/10 text-terra"}`}>
                            {c.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-bark-400">{c.duration}</td>
                        <td className="py-3 px-4 text-bark-400">{c.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="font-display text-base font-semibold text-forest italic mb-2">Managing Cookies</h2>
              <p className="text-bark-400 text-sm leading-relaxed">
                You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. However, blocking essential cookies may prevent the website from functioning properly. Optional cookies (analytics, performance) can be disabled without affecting core functionality.
              </p>
            </div>

            <div>
              <h2 className="font-display text-base font-semibold text-forest italic mb-2">Contact</h2>
              <p className="text-bark-400 text-sm leading-relaxed">
                For questions about our use of cookies, contact us at <span className="text-terra font-medium">privacy@vyapaarglobal.com</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
