export default function TermsPage() {
  const sections = [
    { title: "1. Acceptance of Terms", content: "By accessing and using the Vyapaar Global website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services. These terms apply to all visitors, users, and retail partners." },
    { title: "2. Account Registration", content: "To place orders, you must create an account with accurate business information. You are responsible for maintaining the confidentiality of your account credentials. You must be a registered UK business to access wholesale pricing." },
    { title: "3. Orders & Pricing", content: "All prices are quoted in GBP and exclude VAT unless stated otherwise. Prices are subject to change without notice, but confirmed orders will be honoured at the quoted price. We reserve the right to cancel orders if pricing errors occur." },
    { title: "4. Payment Terms", content: "Payment is due at the time of order unless you have an approved credit account. Credit terms (NET 30) are available for approved partners after their third order. Late payments may incur interest at 2% per month." },
    { title: "5. Delivery", content: "Delivery times are estimates and not guaranteed. We are not liable for delays caused by circumstances beyond our control. Risk of loss transfers to you upon delivery. Please inspect goods upon receipt and report any issues within 48 hours." },
    { title: "6. Returns & Refunds", content: "Returns are accepted within 7 days of delivery for eligible reasons as outlined in our Returns Policy. Refunds are processed within 5–7 business days of approval. We reserve the right to refuse returns that do not meet our policy criteria." },
    { title: "7. Product Information", content: "We make every effort to ensure product descriptions, images, and specifications are accurate. However, colours and packaging may vary slightly. Nutritional information is provided by manufacturers and we are not liable for inaccuracies." },
    { title: "8. Intellectual Property", content: "All content on this website — including text, images, logos, and design — is the property of Vyapaar Global Ltd and protected by UK intellectual property laws. You may not reproduce, distribute, or use our content without written permission." },
    { title: "9. Limitation of Liability", content: "To the maximum extent permitted by law, Vyapaar Global Ltd shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the value of the relevant order." },
    { title: "10. Governing Law", content: "These terms are governed by the laws of England and Wales. Any disputes shall be resolved in the courts of England and Wales." },
    { title: "11. Changes to Terms", content: "We may update these terms at any time. Continued use of our services after changes constitutes acceptance. We will notify registered users of significant changes via email." },
    { title: "12. Contact", content: "For questions about these terms, contact us at legal@vyapaarglobal.com or write to: Vyapaar Global Ltd, London, United Kingdom." },
  ];

  return (
    <div className="min-h-screen bg-warmth">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-3xl">
          <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">Legal</span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-forest italic leading-tight mt-3 mb-3">
            Terms of Service
          </h1>
          <p className="text-bark-300 text-sm mb-12">Last updated: April 2026</p>

          <div className="space-y-8">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="font-display text-base font-semibold text-forest italic mb-2">{s.title}</h2>
                <p className="text-bark-400 text-sm leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
