import Link from 'next/link';
import Image from 'next/image';
import { promotionalSections } from '@/lib/data';

interface PromotionalSectionProps {
  title: string;
  sections: typeof promotionalSections;
}

export default function PromotionalSection({ title, sections }: PromotionalSectionProps) {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`/products/${section.category}`}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">{section.title}</h3>
                  {section.subtitle && (
                    <p className="text-sm text-gray-200">{section.subtitle}</p>
                  )}
                  {section.price && (
                    <p className="text-primary-300 font-semibold mt-1">Up to {section.price}% Off</p>
                  )}
                  <button className="mt-3 text-sm bg-white text-primary-600 px-4 py-2 rounded-md hover:bg-primary-50 transition-colors inline-flex items-center">
                    Shop Now
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
