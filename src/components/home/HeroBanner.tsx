"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap } from "lucide-react";
import { banners } from "@/lib/data";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-8 pt-6">
      {/* Bento Grid Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[420px]">
        {/* Main Slider - Takes 2 columns */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group shadow-soft-lg">
          {/* Light background */}
          <div className="absolute inset-0 bg-navy" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 50% at 20% 50%, rgba(245, 144, 31, 0.2) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 30%, rgba(27, 42, 91, 0.15) 0%, transparent 70%)",
            }}
          />

          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8 pointer-events-none"
              }`}
            >
              <div className="relative w-full h-full flex min-h-[320px] lg:min-h-0">
                {/* Left content */}
                <div className="flex-1 flex flex-col justify-center px-8 md:px-12 z-10 relative">
                  <div className="inline-flex items-center gap-2 bg-orange/20 border border-orange/30 text-orange-100 px-4 py-1.5 rounded-full text-xs font-bold mb-4 w-fit backdrop-blur-sm">
                    <Zap size={12} className="fill-orange-200" />
                    Farm to Shelf — B2B Supply
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-[1.1]">
                    {banner.title}
                  </h2>
                  <p className="text-white/60 text-sm mb-8 max-w-md leading-relaxed">
                    {banner.subtitle}
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      href={banner.link}
                      className="inline-flex items-center gap-2 bg-orange text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-orange-dark transition-all group/btn"
                    >
                      {banner.cta}
                      <ArrowRight
                        size={16}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </Link>
                    <Link
                      href="/products/organic"
                      className="inline-flex items-center gap-2 text-white/70 border border-white/20 px-7 py-3 rounded-xl font-medium text-sm hover:bg-white/10 hover:border-white/30 transition-all"
                    >
                      Explore
                    </Link>
                  </div>
                </div>

                {/* Right image */}
                <div className="hidden md:block w-[40%] relative">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
                </div>
              </div>
            </div>
          ))}

          {/* Slide dots */}
          <div className="absolute bottom-5 left-8 md:left-12 flex gap-2 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "bg-orange w-8"
                    : "bg-white/30 w-4 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Border effect */}
          <div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none" />
        </div>

        {/* Right side bento cards */}
        <div className="flex flex-col gap-4">
          {/* Top card - Deal */}
          <div className="flex-1 relative rounded-2xl overflow-hidden bg-white border border-surface-200 group/card cursor-pointer hover:border-orange/20 hover:shadow-card-hover transition-all">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245, 144, 31, 0.15) 0%, transparent 70%)",
              }}
            />
            <div className="relative p-6 flex flex-col justify-between h-full">
              <div>
                <span className="text-gold-gradient text-xs font-black tracking-wider uppercase">
                  Wholesale Deal
                </span>
                <h3 className="text-xl font-bold text-navy mt-2 leading-snug">
                  Bulk Produce Supply
                </h3>
                <p className="text-surface-500 text-xs mt-1">
                  Up to 50% off on bulk orders
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4">
                {["12", "04", "32"].map((num, i) => (
                  <div
                    key={i}
                    className="bg-navy/5 border border-navy/10 rounded-lg px-3 py-2 text-center"
                  >
                    <div className="text-orange font-black text-lg leading-none">
                      {num}
                    </div>
                    <div className="text-surface-400 text-[9px] mt-0.5">
                      {["HRS", "MIN", "SEC"][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom card - Promo */}
          <div className="flex-1 relative rounded-2xl overflow-hidden group/card cursor-pointer shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=300&fit=crop"
              alt="Fresh produce"
              fill
              className="object-cover group-hover/card:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
            <div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none" />
            <div className="relative p-6 flex flex-col justify-end h-full">
              <span className="inline-flex items-center gap-1.5 bg-orange/20 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-2 border border-orange/30">
                NEW SUPPLY LINE
              </span>
              <h3 className="text-lg font-bold text-white leading-snug">
                Imported Organics
              </h3>
              <Link
                href="/products/organic"
                className="text-orange-light text-xs font-bold mt-2 inline-flex items-center gap-1 group/link"
              >
                Shop Now
                <ArrowRight
                  size={12}
                  className="group-hover/link:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
