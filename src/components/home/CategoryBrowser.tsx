'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ArrowRight } from 'lucide-react';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/ui/ProductCard';

interface CategorySection {
  id: string;
  title: string;
  image: string;
  subcategories: { name: string; slug: string }[];
}

const categorySections: CategorySection[] = [
  {
    id: 'dining',
    title: 'DINING',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop',
    subcategories: [
      { name: 'KOREAN', slug: 'kitchen' },
      { name: 'CHINESE', slug: 'grocery' },
      { name: 'JAPANESE', slug: 'health-personal' },
      { name: 'ITALIAN', slug: 'beauty' },
    ],
  },
  {
    id: 'cafe',
    title: 'CAFÉ',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=800&fit=crop',
    subcategories: [
      { name: 'DESSERT', slug: 'art-craft' },
      { name: 'BEVERAGE', slug: 'home' },
    ],
  },
  {
    id: 'gourmet',
    title: 'GOURMET',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=800&fit=crop',
    subcategories: [
      { name: '만두연구소', slug: 'grocery' },
      { name: '한식라면', slug: 'kitchen' },
    ],
  },
];

export default function CategoryBrowser() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('kitchen');

  const currentProducts = products.filter((p) => p.category === selectedCategory).slice(0, 8);

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600">Discover our curated collection</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {categorySections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className="relative h-96 rounded-lg overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                <h3 className="text-4xl font-bold mb-8 tracking-wider">{section.title}</h3>
                <div className="space-y-3 w-full">
                  {section.subcategories.map((subcat, index) => (
                    <div
                      key={index}
                      className="text-center py-2 border-t border-white/30 first:border-t-0"
                    >
                      <span className="text-lg font-light tracking-wide hover:text-primary-300 transition-colors">
                        {subcat.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="text-white" size={24} />
              </div>
            </button>
          ))}
        </div>

        {/* Modal/Popup View */}
        {activeSection && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
            <div className="min-h-screen px-4 py-8">
              <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex flex-col lg:flex-row min-h-[600px]">
                  {/* Left Sidebar - Category Image */}
                  <div className="lg:w-1/3 relative min-h-[300px] lg:min-h-full">
                    <Image
                      src={categorySections.find((s) => s.id === activeSection)?.image || ''}
                      alt={categorySections.find((s) => s.id === activeSection)?.title || ''}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50" />

                    <div className="absolute inset-0 flex flex-col justify-center items-start p-8 text-white">
                      <h3 className="text-4xl font-bold mb-8 tracking-wider">
                        {categorySections.find((s) => s.id === activeSection)?.title}
                      </h3>
                      <div className="space-y-4 w-full">
                        {categorySections
                          .find((s) => s.id === activeSection)
                          ?.subcategories.map((subcat, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedCategory(subcat.slug)}
                              className={`w-full text-left py-3 px-4 rounded-lg transition-all ${
                                selectedCategory === subcat.slug
                                  ? 'bg-white/30 backdrop-blur-sm'
                                  : 'hover:bg-white/10'
                              }`}
                            >
                              <span className="text-lg font-light tracking-wide">
                                {subcat.name}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Product Grid */}
                  <div className="lg:w-2/3 p-8 overflow-y-auto max-h-[600px]">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-2xl font-bold text-gray-900">Products</h4>
                      <button
                        onClick={() => setActiveSection(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X size={24} className="text-gray-600" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {currentProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/detail/${product.id}`}
                          onClick={() => setActiveSection(null)}
                          className="group cursor-pointer"
                        >
                          <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-48 bg-gray-100">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              {product.discount && (
                                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                                  {product.discount}% OFF
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h5 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                {product.name}
                              </h5>
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-lg font-bold text-primary-600">
                                    £{product.price.toFixed(2)}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="ml-2 text-sm text-gray-500 line-through">
                                      £{product.originalPrice.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {currentProducts.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        No products found in this category
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
