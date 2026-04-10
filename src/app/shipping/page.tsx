import { Truck, Clock, MapPin, Package, ShieldCheck, AlertCircle } from "lucide-react";

const deliveryTiers = [
  { min: "£0", max: "£499", fee: "£14.99", time: "3–5 business days" },
  { min: "£500", max: "£999", fee: "Free", time: "2–3 business days" },
  { min: "£1,000+", max: "", fee: "Free + Priority", time: "1–2 business days" },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-warmth">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-3xl">
          <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">Logistics</span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-forest italic leading-tight mt-3 mb-5">
            Delivery Information
          </h1>
          <p className="text-bark-400 text-base leading-relaxed mb-12">
            We deliver to all UK mainland addresses. Our temperature-controlled logistics network ensures your products arrive fresh and on time.
          </p>

          {/* Delivery tiers */}
          <div className="bg-cream-50 rounded-3xl p-8 border border-forest/5 mb-10">
            <h2 className="font-display text-xl font-semibold text-forest italic mb-6">Delivery Rates</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-forest/8">
                    <th className="text-left py-3 font-semibold text-bark-600">Order Value</th>
                    <th className="text-left py-3 font-semibold text-bark-600">Delivery Fee</th>
                    <th className="text-left py-3 font-semibold text-bark-600">Estimated Time</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryTiers.map((tier, i) => (
                    <tr key={i} className="border-b border-forest/5 last:border-0">
                      <td className="py-3 text-bark-500">{tier.max ? `${tier.min} – ${tier.max}` : tier.min}</td>
                      <td className="py-3 font-semibold text-forest">{tier.fee}</td>
                      <td className="py-3 text-bark-400">{tier.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info sections */}
          <div className="space-y-8">
            {[
              { icon: Clock, title: "Order Cut-Off Times", content: "Orders placed before 2pm GMT (Monday–Friday) are dispatched the same day. Orders placed after 2pm or on weekends are dispatched the next business day." },
              { icon: MapPin, title: "Delivery Areas", content: "We deliver to all UK mainland addresses. Scottish Highlands, Northern Ireland, and offshore islands may incur an additional surcharge and longer delivery times. Contact us for a quote." },
              { icon: Package, title: "Packaging", content: "All products are packed in food-grade, temperature-appropriate packaging. Fragile items like spice jars are individually wrapped. Bulk orders (50kg+) are palletised." },
              { icon: ShieldCheck, title: "Tracking", content: "You'll receive a tracking number via email once your order is dispatched. Real-time tracking is available through our logistics partner's portal." },
              { icon: AlertCircle, title: "Damaged or Missing Items", content: "If your delivery arrives damaged or items are missing, contact us within 48 hours at orders@vyapaarglobal.com with photos. We'll arrange a replacement or refund promptly." },
            ].map((section, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-forest/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                  <section.icon size={16} className="text-forest-400" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-forest italic mb-1.5">{section.title}</h3>
                  <p className="text-bark-400 text-sm leading-relaxed">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
