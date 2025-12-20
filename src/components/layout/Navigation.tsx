'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { categories } from '@/lib/data';

export default function Navigation() {
  return (
    <nav className="bg-gradient-to-r from-orange-50 to-amber-50 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-8">
            {categories.slice(0, 9).map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-1"
              >
                <span>{category.name}</span>
                <ChevronDown size={14} />
              </Link>
            ))}
            <Link
              href="/seller"
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Seller
            </Link>
            <Link
              href="/tracking"
              className="text-sm font-medium text-gray-700 hover:text-primary-600"
            >
              Tracking
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
