'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
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
  const [activeSection, setActiveSection] = useState<string>('dining');
  const [selectedCategory, setSelectedCategory] = useState<string>('kitchen');

  const currentSection = categorySections.find((s) => s.id === activeSection);
  const currentProducts = products.filter((p) => p.category === selectedCategory).slice(0, 9);

  const handleCategoryClick = (sectionId: string, defaultSlug: string) => {
    setActiveSection(sectionId);
    setSelectedCategory(defaultSlug);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Products</h2>
          <p className="text-gray-600">Discover our curated collection</p>
        </div>

        {/* Main Content - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side - Category Navigation */}
          <div className="lg:col-span-5 space-y-4">
            {categorySections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleCategoryClick(section.id, section.subcategories[0].slug)}
                className={`w-full group relative h-48 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                  activeSection === section.id
                    ? 'ring-4 ring-primary-500 shadow-2xl scale-[1.02]'
                    : 'hover:shadow-xl hover:scale-[1.01]'
                }`}
              >
                {/* Background Image */}
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-between px-8 text-white">
                  <div>
                    <h3 className="text-3xl font-bold mb-3 tracking-wider">{section.title}</h3>
                    <div className="space-y-1">
                      {section.subcategories.map((subcat, index) => (
                        <div key={index} className="text-sm font-light tracking-wide opacity-90">
                          {subcat.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <ChevronRight
                    size={32}
                    className={`transition-transform ${
                      activeSection === section.id ? 'translate-x-1' : ''
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Right Side - Product Grid */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-lg p-8">
            {/* Subcategory Tabs */}
            {currentSection && (
              <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b">
                {currentSection.subcategories.map((subcat, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(subcat.slug)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === subcat.slug
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {subcat.name}
                  </button>
                ))}
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-3 gap-4">
              {currentProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/detail/${product.id}`}
                  className="group cursor-pointer"
                >
                  <div className="text-center">
                    {/* Product Image - Circular */}
                    <div className="relative w-full aspect-square mb-3 rounded-full overflow-hidden bg-white ring-2 ring-gray-200 group-hover:ring-primary-400 transition-all shadow-md">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.discount && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                          -{product.discount}%
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-1">
                      <h5 className="text-sm font-medium text-gray-900 line-clamp-2 px-1 min-h-[40px]">
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
                <p className="text-sm mt-2">Try selecting a different category</p>
              </div>
            )}

            {/* View All Link */}
            {currentProducts.length > 0 && currentSection && (
              <div className="mt-8 pt-6 border-t text-center">
                <Link
                  href={`/products/${selectedCategory}`}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold group"
                >
                  View All Products
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
