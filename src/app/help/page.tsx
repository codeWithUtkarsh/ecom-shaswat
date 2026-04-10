import Link from "next/link";
import { ShoppingBag, Truck, RotateCcw, Users, CreditCard, MessageSquare, ArrowRight, Search } from "lucide-react";

const topics = [
  { icon: ShoppingBag, title: "Ordering", desc: "How to place orders, MOQs, and product availability", href: "/faq#ordering" },
  { icon: Truck, title: "Delivery & Shipping", desc: "Delivery times, tracking, and shipping zones", href: "/shipping" },
  { icon: RotateCcw, title: "Returns & Refunds", desc: "Return policy, refund timelines, and how to request", href: "/returns" },
  { icon: CreditCard, title: "Pricing & Payments", desc: "Wholesale pricing tiers and payment methods", href: "/pricing" },
  { icon: Users, title: "Partner Programme", desc: "How to join, benefits, and application process", href: "/seller" },
  { icon: MessageSquare, title: "Contact Support", desc: "Get in touch with our team directly", href: "/contact" },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-warmth">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">Help Centre</span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-forest italic leading-tight mt-3 mb-5">
            How Can We Help?
          </h1>
          <p className="text-bark-400 text-base leading-relaxed">
            Find answers, browse guides, or get in touch with our support team.
          </p>
        </div>

        {/* Topic cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {topics.map((topic, i) => (
            <Link key={i} href={topic.href} className="bg-cream-50 rounded-2xl p-6 border border-forest/5 hover:shadow-soft-lg hover:border-forest/10 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-forest/[0.06] flex items-center justify-center mb-4 group-hover:bg-terra/10 transition-colors">
                <topic.icon size={18} className="text-forest-400 group-hover:text-terra transition-colors" />
              </div>
              <h3 className="font-display text-base font-semibold text-forest italic mb-1">{topic.title}</h3>
              <p className="text-bark-400 text-xs leading-relaxed mb-3">{topic.desc}</p>
              <span className="text-xs font-semibold text-terra flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div className="bg-cream-50 rounded-3xl p-8 border border-forest/5 text-center">
          <h2 className="font-display text-xl font-semibold text-forest italic mb-2">Can&apos;t find what you need?</h2>
          <p className="text-bark-400 text-sm mb-5">Our team is available Monday–Friday, 9am–6pm GMT.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/faq" className="inline-flex items-center gap-2 bg-forest/[0.06] text-forest px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-forest/10 transition-all">
              Browse FAQ
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-terra text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-terra-500 transition-all">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
