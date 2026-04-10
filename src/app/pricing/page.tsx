import Link from "next/link";
import { ArrowRight, CheckCircle, Package, Truck, ShieldCheck } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    desc: "Perfect for independent retailers getting started",
    moq: "No minimum",
    pricing: "Standard wholesale",
    features: [
      "Access to full product catalogue",
      "Standard wholesale pricing",
      "£14.99 delivery fee (under £500)",
      "Email support",
      "Online ordering portal",
    ],
  },
  {
    name: "Growth",
    desc: "For established retailers with regular orders",
    moq: "£500+ per order",
    pricing: "5–10% below standard",
    popular: true,
    features: [
      "Everything in Starter",
      "Discounted wholesale pricing",
      "Free UK delivery",
      "Dedicated account manager",
      "NET 30 payment terms",
      "Priority stock allocation",
    ],
  },
  {
    name: "Enterprise",
    desc: "For chains and high-volume buyers",
    moq: "£2,000+ per order",
    pricing: "Custom negotiated",
    features: [
      "Everything in Growth",
      "Custom pricing per product",
      "Priority 1–2 day delivery",
      "Quarterly business reviews",
      "Co-branded marketing support",
      "Flexible payment terms",
      "Volume rebates",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-warmth">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">Wholesale Pricing</span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-forest italic leading-tight mt-3 mb-5">
            Transparent Pricing for Every Scale
          </h1>
          <p className="text-bark-400 text-base leading-relaxed">
            No hidden fees, no surprises. Our pricing scales with your business — the more you order, the better your rates.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {tiers.map((tier, i) => (
            <div key={i} className={`bg-cream-50 rounded-3xl p-7 border ${tier.popular ? "border-terra/30 shadow-soft-lg relative" : "border-forest/5"}`}>
              {tier.popular && (
                <span className="absolute -top-3 left-6 bg-terra text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
                  MOST POPULAR
                </span>
              )}
              <h3 className="font-display text-xl font-semibold text-forest italic">{tier.name}</h3>
              <p className="text-bark-400 text-xs mt-1 mb-4">{tier.desc}</p>
              <div className="mb-1">
                <span className="text-[10px] font-bold text-bark-300 uppercase tracking-wider">Min Order</span>
                <p className="text-sm font-semibold text-forest">{tier.moq}</p>
              </div>
              <div className="mb-5">
                <span className="text-[10px] font-bold text-bark-300 uppercase tracking-wider">Pricing</span>
                <p className="text-sm font-semibold text-terra">{tier.pricing}</p>
              </div>
              <div className="space-y-2 mb-6">
                {tier.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-bark-500">
                    <CheckCircle size={13} className="text-emerald-500 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className={`block text-center py-2.5 rounded-full text-sm font-semibold transition-all ${
                  tier.popular
                    ? "bg-terra text-white hover:bg-terra-500"
                    : "bg-forest/[0.06] text-forest hover:bg-forest/10"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="bg-cream-50 rounded-2xl p-6 border border-forest/5 text-center max-w-2xl mx-auto">
          <p className="text-bark-400 text-sm leading-relaxed">
            All prices are quoted excluding VAT. Specific product pricing is available upon request.
            <br />
            <Link href="/contact" className="text-terra font-medium hover:text-terra-500 transition-colors inline-flex items-center gap-1 mt-2">
              Request a full price list <ArrowRight size={13} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
