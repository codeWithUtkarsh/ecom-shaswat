"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { promoCards } from "@/lib/data";
import { useRef, useCallback } from "react";

export default function PromoBanners() {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
      const card = cardRefs.current[index];
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--x", `${x}%`);
      card.style.setProperty("--y", `${y}%`);
    },
    [],
  );

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-10 lg:mt-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
        {promoCards.map((card, index) => (
          <Link
            key={card.id}
            href={card.link}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            className="spotlight animate-fade-up relative rounded-2xl overflow-hidden h-[200px] group border border-forest/5 hover:border-terra/15 shadow-card hover:shadow-card-hover transition-all duration-500"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-cream-50" />

            <div className="relative flex h-full">
              {/* Text */}
              <div className="flex-1 p-6 flex flex-col justify-between z-10">
                <h3 className="font-display text-lg font-semibold text-forest leading-snug max-w-[200px] italic">
                  {card.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 bg-forest/[0.06] border border-forest/10 text-forest text-xs font-semibold px-4 py-2 rounded-full w-fit group-hover:bg-terra group-hover:border-terra group-hover:text-white transition-all duration-300">
                  Shop Now
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-0.5 transition-transform duration-300"
                  />
                </span>
              </div>
              {/* Image */}
              <div className="w-[40%] relative">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 40vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cream-50 via-cream-50/70 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
