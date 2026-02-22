"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Search,
  User,
  Heart,
  ChevronDown,
  LogOut,
  Grid3X3,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useState, useRef, useEffect } from "react";
import { categories } from "@/lib/data";

export default function Header() {
  const { getTotalItems, getTotalPrice } = useCart();
  const { user, signOut, loading } = useAuth();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (catRef.current && !catRef.current.contains(event.target as Node)) {
        setShowCategories(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };
  const getUserDisplayName = () => {
    if (!user) return "";
    return user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-surface-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex items-center h-16 gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="Vyapaar Global"
              width={200}
              height={50}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>

          {/* Nav Links - centered */}
          <nav className="hidden lg:flex items-center justify-center gap-0.5 flex-1">
            {/* Categories dropdown */}
            <div className="relative" ref={catRef}>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-semibold text-navy hover:text-orange transition-colors rounded-lg hover:bg-surface-50"
              >
                <Grid3X3 size={12} className="text-surface-400" />
                Categories
                <ChevronDown
                  size={11}
                  className={`text-surface-400 transition-transform ${showCategories ? "rotate-180" : ""}`}
                />
              </button>
              {showCategories && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-surface-200 rounded-xl py-1.5 z-50 shadow-soft-xl animate-fade-in">
                  {categories.slice(0, 8).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products/${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-500 hover:text-orange hover:bg-orange-50 transition-colors"
                      onClick={() => setShowCategories(false)}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span className="ml-auto text-[10px] text-surface-400">
                        {cat.itemCount}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/"
              className="px-2.5 py-1.5 text-[13px] font-semibold text-navy hover:text-orange transition-colors rounded-lg hover:bg-surface-50"
            >
              Home
            </Link>
            <Link
              href="/products/vegetable"
              className="px-2.5 py-1.5 text-[13px] font-medium text-surface-500 hover:text-navy transition-colors rounded-lg hover:bg-surface-50"
            >
              Shop
            </Link>
            <Link
              href="/products/vegetable"
              className="px-2.5 py-1.5 text-[13px] font-medium text-surface-500 hover:text-navy transition-colors rounded-lg hover:bg-surface-50"
            >
              Catalogue
            </Link>
            <Link
              href="/seller"
              className="px-2.5 py-1.5 text-[13px] font-medium text-surface-500 hover:text-navy transition-colors rounded-lg hover:bg-surface-50"
            >
              Suppliers
            </Link>
            <Link
              href="/contact"
              className="px-2.5 py-1.5 text-[13px] font-medium text-surface-500 hover:text-navy transition-colors rounded-lg hover:bg-surface-50"
            >
              Contact
            </Link>
          </nav>

          {/* Right side: Search + Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Search */}
            <div className="w-56 xl:w-72">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 bg-surface-50 border border-surface-200 rounded-full text-sm text-navy placeholder:text-surface-400 focus:outline-none focus:border-orange/40 focus:ring-2 focus:ring-orange/10 pr-10 transition-all"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-orange text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-orange-dark transition-colors">
                  <Search size={14} />
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-7 bg-surface-200" />

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden md:flex items-center justify-center w-9 h-9 text-surface-400 hover:text-orange hover:bg-surface-50 rounded-lg transition-all"
            >
              <Heart size={19} />
            </Link>

            {/* User */}
            {!loading && (
              <div className="relative" ref={menuRef}>
                {user ? (
                  <div>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="w-8 h-8 bg-gradient-to-br from-navy to-orange rounded-full flex items-center justify-center text-white text-[11px] font-black hover:scale-105 transition-transform"
                    >
                      {getUserDisplayName().charAt(0).toUpperCase()}
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-surface-200 rounded-xl py-1.5 z-50 shadow-soft-xl animate-fade-in">
                        <Link
                          href="/account"
                          className="block px-4 py-2.5 text-sm text-surface-500 hover:text-orange hover:bg-orange-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          href="/orders"
                          className="block px-4 py-2.5 text-sm text-surface-500 hover:text-orange hover:bg-orange-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          className="block px-4 py-2.5 text-sm text-surface-500 hover:text-orange hover:bg-orange-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Wishlist
                        </Link>
                        <hr className="my-1 border-surface-200" />
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2.5 text-sm text-accent-rose hover:bg-red-50 flex items-center gap-2 transition-colors"
                        >
                          <LogOut size={14} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex items-center justify-center w-9 h-9 text-surface-400 hover:text-orange hover:bg-surface-50 rounded-lg transition-all"
                  >
                    <User size={19} />
                  </Link>
                )}
              </div>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-navy text-white px-3.5 py-2 rounded-xl font-bold text-sm hover:bg-navy-light transition-all group"
            >
              <div className="relative">
                <ShoppingCart size={17} className="group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-orange text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </div>
              <span>£{totalPrice.toFixed(2)}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
