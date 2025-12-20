'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
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
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=800&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=800&fit=crop',
    subcategories: [
      { name: 'DESSERT', slug: 'art-craft', nameKr: '디저트' },
      { name: 'BEVERAGE', slug: 'home', nameKr: '음료' },
    ],
  },
  {
    id: 'gourmet',
    title: 'GOURMET',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&h=800&fit=crop',
    subcategories: [
      { name: '만두연구소', slug: 'grocery', nameKr: '만두연구소' },
      { name: '한식라면', slug: 'kitchen', nameKr: '한식라면' },
    ],
  },
];

export default function CategoryBrowser() {
  const [activeSection, setActiveSection] = useState<string>('cafe');
  const [selectedCategory, setSelectedCategory] = useState<string>('art-craft');

  const currentSection = categorySections.find((s) => s.id === activeSection);
  const currentProducts = products.filter((p) => p.category === selectedCategory);

  const handleCategoryClick = (sectionId: string, defaultSlug: string) => {
    setActiveSection(sectionId);
    setSelectedCategory(defaultSlug);
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Products</h2>
          <p className="text-gray-600">Discover our curated collection</p>
        </div>

        {/* Main Content - Horizontal Layout */}
        <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            {/* Left Side - Category Sidebar */}
            <div className="lg:col-span-4 relative">
              {/* Category Image Background */}
              {currentSection && (
                <div className="relative h-full min-h-[400px] lg:min-h-full">
                  <Image
                    src={currentSection.image}
                    alt={currentSection.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/70" />

                  {/* Category Navigation Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-white">
                    <h3 className="text-5xl font-bold mb-12 tracking-wider text-center">
                      {currentSection.title}
                    </h3>

                    {/* Subcategories as Tabs */}
                    <div className="space-y-4 w-full max-w-sm">
                      {currentSection.subcategories.map((subcat, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedCategory(subcat.slug)}
                          className={`w-full text-center py-3 px-6 rounded-xl transition-all text-lg tracking-wide ${
                            selectedCategory === subcat.slug
                              ? 'bg-white/30 backdrop-blur-md shadow-lg scale-105'
                              : 'hover:bg-white/10'
                          }`}
                        >
                          {subcat.name}
                        </button>
                      ))}
                    </div>

                    {/* Category Switcher Dots */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                      {categorySections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => handleCategoryClick(section.id, section.subcategories[0].slug)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            activeSection === section.id
                              ? 'bg-white w-8'
                              : 'bg-white/40 hover:bg-white/60'
                          }`}
                          aria-label={`Switch to ${section.title}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Products */}
            <div className="lg:col-span-8 bg-white flex flex-col">
              {/* Header with Close/Back Button */}
              <div className="flex justify-between items-center px-6 py-4 border-b bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveSection(activeSection)}
                    className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="text-sm font-medium text-gray-600">BACK</span>
                </div>
                <button className="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Scrollable Products Area */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="grid grid-cols-3 gap-6">
                  {currentProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/detail/${product.id}`}
                      className="group cursor-pointer"
                    >
                      <div className="text-center">
                        {/* Product Image - Rounded Square */}
                        <div className="relative w-full aspect-square mb-3 rounded-2xl overflow-hidden bg-white shadow-md group-hover:shadow-xl transition-all">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.discount && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                              -{product.discount}%
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">품목</p>
                          <h5 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px]">
                            {product.name}
                          </h5>
                          <div className="flex items-center justify-center gap-2 pt-1">
                            <span className="text-sm font-bold text-gray-900">
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
                    <p className="text-sm mt-2">Try selecting a different category</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
