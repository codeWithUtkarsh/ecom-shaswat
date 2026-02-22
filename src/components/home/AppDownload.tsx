import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function AppDownload() {
  return (
    <div className="max-w-[1400px] mx-auto px-8 mt-12 mb-10">
      <div className="relative rounded-2xl overflow-hidden">
        {/* Navy base */}
        <div className="absolute inset-0 bg-navy" />

        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 10% 50%, rgba(245, 144, 31, 0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 90% 30%, rgba(27, 42, 91, 0.2) 0%, transparent 60%)",
          }}
        />

        {/* Border */}
        <div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none z-10" />

        <div className="relative flex flex-col md:flex-row items-center justify-between px-10 py-10 gap-8">
          {/* Left Content */}
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 bg-orange/20 border border-orange/30 text-orange-100 px-4 py-1.5 rounded-full text-xs font-bold mb-4 backdrop-blur-sm">
              <Sparkles size={12} className="fill-orange-200" />
              Become a Retail Partner
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
              From Farm to Your{" "}
              <span className="text-orange">Store Shelves</span> —
              Delivered Fast
            </h2>
            <p className="text-white/50 mb-6 text-sm leading-relaxed">
              Join 500+ UK retailers sourcing premium agri-products through
              Vyapaar Global. Competitive wholesale pricing, reliable supply
              chain, and doorstep delivery across the UK.
            </p>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-orange text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-dark transition-all group">
                Get Started
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
              <button className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/15 hover:border-white/30 transition-all backdrop-blur-sm">
                Request Catalogue
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-56 h-56 md:w-72 md:h-72 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-orange/10 to-navy-light/10 rounded-2xl animate-float" />
            <div className="absolute -inset-1 bg-gradient-to-br from-orange/20 via-transparent to-navy-light/20 rounded-2xl blur-xl opacity-50 animate-pulse-slow" />
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop"
              alt="Fresh produce supply"
              fill
              className="object-cover rounded-2xl"
            />
            <div className="absolute inset-0 rounded-2xl border border-white/[0.1]" />
          </div>
        </div>
      </div>
    </div>
  );
}
