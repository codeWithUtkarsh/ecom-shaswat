'use client';

import Link from 'next/link';
import { ShoppingCart, Search, User, MapPin, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-primary-600">
              Silkrute
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for any product..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-6">
            {/* Country Selector */}
            <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
              <MapPin size={20} />
              <span className="text-sm">United Kingdom</span>
              <ChevronDown size={16} />
            </button>

            {/* Login/Signup */}
            <Link
              href="/auth/login"
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600"
            >
              <User size={20} />
              <span className="text-sm">Login / Signup</span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart size={24} className="text-gray-700 hover:text-primary-600" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
