'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ArrowLeft } from 'lucide-react';
import { products } from '@/lib/data';

interface CategorySection {
  id: string;
  title: string;
  image: string;
  subcategories: { name: string; slug: string; nameKr?: string }[];
}

const categorySections: CategorySection[] = [
  {
    id: 'dining',
    title: 'DINING',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
    subcategories: [
      { name: 'KOREAN', slug: 'kitchen', nameKr: '한식' },
      { name: 'CHINESE', slug: 'grocery', nameKr: '중식' },
      { name: 'JAPANESE', slug: 'health-personal', nameKr: '일식' },
      { name: 'ITALIAN', slug: 'beauty', nameKr: '양식' },
    ],
  },
  {
    id: 'cafe',
    title: 'CAFÉ',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop',
    subcategories: [
      { name: 'DESSERT', slug: 'art-craft', nameKr: '디저트' },
      { name: 'BEVERAGE', slug: 'home', nameKr: '음료' },
    ],
  },
  {
    id: 'gourmet',
    title: 'GOURMET',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&h=600&fit=crop',
    subcategories: [
      { name: '만두연구소', slug: 'grocery', nameKr: '만두연구소' },
      { name: '한식라면', slug: 'kitchen', nameKr: '한식라면' },
    ],
  },
];

export default function CategoryBrowser() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('kitchen');

  const currentSection = categorySections.find((s) => s.id === activeSection);
  const currentProducts = products.filter((p) => p.category === selectedCategory).slice(0, 9);

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Products</h2>
          <p className="text-gray-600">Discover our curated collection</p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categorySections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setSelectedCategory(section.subcategories[0].slug);
              }}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Background Image */}
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                <h3 className="text-4xl font-bold mb-6 tracking-wider">{section.title}</h3>
                <div className="space-y-2 w-full max-w-xs">
                  {section.subcategories.map((subcat, index) => (
                    <div
                      key={index}
                      className="text-center py-2 border-t border-white/20 first:border-t-0"
                    >
                      <span className="text-base font-light tracking-wide uppercase">
                        {subcat.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Modal */}
        {activeSection && currentSection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Modal Content */}
              <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                {/* Left Sidebar - Category */}
                <div className="lg:w-2/5 relative min-h-[200px] lg:min-h-full">
                  <Image
                    src={currentSection.image}
                    alt={currentSection.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70" />

                  {/* Back Button */}
                  <button
                    onClick={() => setActiveSection(null)}
                    className="absolute top-6 left-6 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>

                  {/* Category Content */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-white">
                    <h3 className="text-5xl font-bold mb-12 tracking-wider">{currentSection.title}</h3>
                    <div className="space-y-4 w-full max-w-sm">
                      {currentSection.subcategories.map((subcat, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedCategory(subcat.slug)}
                          className={`w-full text-center py-3 px-4 rounded-xl transition-all uppercase tracking-wide ${
                            selectedCategory === subcat.slug
                              ? 'bg-white/25 backdrop-blur-md shadow-lg'
                              : 'hover:bg-white/10'
                          }`}
                        >
                          <span className="text-lg font-light">{subcat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side - Products */}
                <div className="lg:w-3/5 bg-white overflow-y-auto">
                  {/* Close Button */}
                  <div className="sticky top-0 bg-white z-10 p-6 flex justify-end border-b">
                    <button
                      onClick={() => setActiveSection(null)}
                      className="w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X size={24} className="text-gray-600" />
                    </button>
                  </div>

                  {/* Products Grid */}
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4">
                      {currentProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/detail/${product.id}`}
                          onClick={() => setActiveSection(null)}
                          className="group cursor-pointer"
                        >
                          <div className="text-center">
                            {/* Product Image - Circular */}
                            <div className="relative w-full aspect-square mb-3 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-200 group-hover:ring-primary-400 transition-all">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              {product.discount && (
                                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                  -{product.discount}%
                                </div>
                              )}
                            </div>

                            {/* Product Info */}
                            <div className="space-y-1">
                              <h5 className="text-sm font-medium text-gray-900 line-clamp-2 px-1">
                                {product.name}
                              </h5>
                              <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-bold text-primary-600">
                                  £{product.price.toFixed(2)}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-xs text-gray-400 line-through">
                                    £{product.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Empty State */}
                    {currentProducts.length === 0 && (
                      <div className="text-center py-20 text-gray-400">
                        <p className="text-lg">No products found in this category</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
