import Image from "next/image";
import { ArrowRight, Leaf, Users, Globe } from "lucide-react";

export default function AppDownload() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-14 lg:mt-20 mb-10">
      <div className="relative rounded-3xl overflow-hidden">
        {/* Base */}
        <div className="absolute inset-0 bg-forest" />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 10% 50%, rgba(193, 127, 89, 0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 90% 30%, rgba(26, 58, 42, 0.3) 0%, transparent 60%)",
          }}
        />

        {/* Border */}
        <div className="absolute inset-0 rounded-3xl border border-white/[0.06] pointer-events-none z-10" />

        <div className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-12 lg:px-14 py-12 lg:py-14 gap-8">
          {/* Left */}
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-sage-300 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 backdrop-blur-sm">
              <Leaf size={12} />
              Become a Retail Partner
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight italic">
              From Farm to Your{" "}
              <span className="text-terra-300">Store Shelves</span> —
              Delivered Fast
            </h2>
            <p className="text-white/40 mb-8 text-sm leading-relaxed">
              Join 500+ UK retailers sourcing premium agri-products through
              Vyapaar Global. Competitive wholesale pricing, reliable supply
              chain, and doorstep delivery across the UK.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mb-8">
              {[
                { icon: Users, num: "500+", label: "UK Retailers" },
                { icon: Globe, num: "12", label: "Countries" },
                { icon: Leaf, num: "2k+", label: "Products" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon
                    size={16}
                    className="text-terra-300 mx-auto mb-1.5"
                  />
                  <div className="font-display text-xl font-bold text-white italic">
                    {stat.num}
                  </div>
                  <div className="text-[10px] text-white/30 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-terra text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-terra-500 transition-all duration-300 group shadow-warm-glow">
                Get Started
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform duration-300"
                />
              </button>
              <button className="flex items-center gap-2 bg-white/10 border border-white/15 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-white/15 hover:border-white/25 transition-all duration-300 backdrop-blur-sm">
                Request Catalogue
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-56 h-56 md:w-72 md:h-72 flex-shrink-0">
            <div className="absolute -inset-2 bg-gradient-to-br from-terra/15 via-transparent to-forest-400/15 rounded-3xl blur-2xl opacity-60 animate-pulse-soft" />
            <div className="absolute inset-0 bg-gradient-to-br from-terra/5 to-forest-400/5 rounded-3xl animate-float" />
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop"
              alt="Fresh produce supply"
              fill
              className="object-cover rounded-3xl"
            />
            <div className="absolute inset-0 rounded-3xl border border-white/[0.08]" />
          </div>
        </div>
      </div>
    </div>
  );
}
