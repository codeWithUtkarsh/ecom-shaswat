import Link from "next/link";
import Image from "next/image";
import { promotionalSections } from "@/lib/data";

interface PromotionalSectionProps {
  title: string;
  sections: typeof promotionalSections;
}

export default function PromotionalSection({
  title,
  sections,
}: PromotionalSectionProps) {
  return (
    <div className="py-8">
      <div className="max-w-[1400px] mx-auto px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`/products/${section.category}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-52">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-base font-semibold mb-1">
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="text-xs text-gray-200">{section.subtitle}</p>
                  )}
                  {section.price && (
                    <p className="text-primary-300 font-semibold text-sm mt-1">
                      Up to {section.price}% Off
                    </p>
                  )}
                  <span className="mt-2 text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full inline-flex items-center gap-1">
                    Shop Now
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
