import Link from "next/link";
import { Handshake, TrendingUp, Globe, ShieldCheck, Truck, ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  { icon: TrendingUp, title: "Competitive Pricing", desc: "Direct farm sourcing means better margins for your store. No middlemen, no markups." },
  { icon: Globe, title: "35+ Product Lines", desc: "One supplier for your entire Indian grocery range — grains, spices, lentils, flours, and branded mixes." },
  { icon: Truck, title: "48h UK Delivery", desc: "Free delivery on orders over £500. Temperature-controlled logistics with real-time tracking." },
  { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Every batch is lab tested. FSSAI, ISO 22000, HACCP and BRC certified. 98%+ purity on all spices." },
];

const steps = [
  { num: "01", title: "Apply", desc: "Fill out our quick partnership form with your business details." },
  { num: "02", title: "Review", desc: "Our team reviews your application and contacts you within 48 hours." },
  { num: "03", title: "Onboard", desc: "Get your dedicated account manager, pricing sheet, and access to the full catalogue." },
  { num: "04", title: "Order", desc: "Place your first wholesale order with flexible MOQs and payment terms." },
];

export default function SellerPage() {
  return (
    <div className="min-h-screen bg-warmth">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">Partner Programme</span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-forest italic leading-tight mt-3 mb-5">
            Become a Vyapaar Global Retail Partner
          </h1>
          <p className="text-bark-400 text-base lg:text-lg leading-relaxed mb-8">
            Join our growing network of UK retailers sourcing premium Indian food products directly from verified farms. Zero upfront commitment, dedicated support, and competitive wholesale pricing.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-terra text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-terra-500 transition-all shadow-warm-glow">
            Apply Now <ArrowRight size={15} />
          </Link>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="font-display text-2xl font-semibold text-forest italic mb-8">Why Partner With Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="bg-cream-50 rounded-2xl p-6 border border-forest/5 hover:shadow-soft-lg transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl bg-terra/10 flex items-center justify-center mb-4">
                  <b.icon size={18} className="text-terra" />
                </div>
                <h3 className="font-display text-sm font-semibold text-forest italic mb-2">{b.title}</h3>
                <p className="text-bark-400 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mb-20">
          <h2 className="font-display text-2xl font-semibold text-forest italic mb-8">How It Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <span className="font-display text-4xl font-bold text-forest/10 italic">{s.num}</span>
                <h3 className="font-display text-base font-semibold text-forest italic mt-1 mb-2">{s.title}</h3>
                <p className="text-bark-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What you get */}
        <div className="bg-cream-50 rounded-3xl p-8 lg:p-10 border border-forest/5">
          <h2 className="font-display text-2xl font-semibold text-forest italic mb-6">What You Get as a Partner</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Dedicated account manager",
              "Exclusive wholesale pricing",
              "Priority stock allocation",
              "Flexible payment terms (NET 30)",
              "Free delivery on orders over £500",
              "Marketing materials & POS displays",
              "Product training & tastings",
              "Monthly new product previews",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-bark-500">
                <CheckCircle size={15} className="text-emerald-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
