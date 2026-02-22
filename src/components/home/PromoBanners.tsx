"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { promoCards } from "@/lib/data";
import { useRef, useCallback } from "react";

const gradients = [
  "from-navy/5 via-navy/3",
  "from-orange/5 via-orange/3",
  "from-navy/5 via-orange/3",
];

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
    <div className="max-w-[1400px] mx-auto px-8 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {promoCards.map((card, index) => (
          <Link
            key={card.id}
            href={card.link}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            className={`spotlight relative bg-gradient-to-br ${gradients[index]} to-transparent rounded-2xl overflow-hidden h-[200px] group border border-surface-200 hover:border-orange/20 shadow-card hover:shadow-card-hover transition-all duration-300`}
          >
            {/* Light background */}
            <div className="absolute inset-0 bg-white/90" />

            <div className="relative flex h-full">
              {/* Text */}
              <div className="flex-1 p-6 flex flex-col justify-between z-10">
                <h3 className="text-lg font-extrabold text-navy leading-snug max-w-[180px]">
                  {card.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 bg-orange/10 border border-orange/20 text-orange text-xs font-bold px-4 py-2 rounded-lg w-fit group-hover:bg-orange group-hover:text-white transition-all">
                  Shop Now
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </span>
              </div>
              {/* Image */}
              <div className="w-[40%] relative">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
