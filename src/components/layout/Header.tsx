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
  Menu,
  X,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function Header() {
  const { getTotalItems, getTotalPrice } = useCart();
  const { user, signOut, loading } = useAuth();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d.data?.categories ?? []))
      .catch(() => {});
  }, []);

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  };

  // On homepage: transparent overlay until scrolled. On other pages: solid.
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md border-b border-white/60 shadow-soft-lg"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center h-16 lg:h-[64px] gap-4 lg:gap-8">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-none transition-all ${
              isTransparent
                ? "text-white/80 hover:text-white"
                : "text-bark-600 hover:text-forest"
            }`}
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo + Brand Name */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Vyapaar Global"
              width={200}
              height={50}
              className={`h-10 lg:h-11 w-auto object-contain transition-all duration-300 ${
                isTransparent ? "brightness-0 invert" : ""
              }`}
              priority
            />
            <Image
              src="/brand-name.png"
              alt="Vyapaar Global"
              width={160}
              height={40}
              className={`h-6 lg:h-7 w-auto object-contain transition-all duration-300 ${
                isTransparent ? "brightness-0 invert" : ""
              }`}
            />
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {[
              { href: "/", label: "Home" },
              { href: "/products/vegetable", label: "Shop" },
              { href: "/products/organic", label: "Catalogue" },
              { href: "/seller", label: "Suppliers" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                  isTransparent
                    ? "text-white/90 hover:text-white hover:bg-white/15"
                    : "text-forest/70 hover:text-terra hover:bg-forest/[0.04]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Categories dropdown */}
            <div className="relative" ref={catRef}>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                  isTransparent
                    ? "text-white/90 hover:text-white hover:bg-white/15"
                    : "text-forest/70 hover:text-terra hover:bg-forest/[0.04]"
                }`}
              >
                Categories
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-300 ${showCategories ? "rotate-180" : ""}`}
                />
              </button>
              {showCategories && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md border border-white/60 py-2 z-50 shadow-soft-lg animate-fade-in">
                  <div className="px-4 py-2 border-b border-forest/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-forest/40">
                      Browse Categories
                    </span>
                  </div>
                  {categories.slice(0, 8).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products/${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-forest/70 hover:text-terra hover:bg-forest/[0.03] transition-all"
                      onClick={() => setShowCategories(false)}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span className="font-semibold">{cat.name}</span>
                      <span className="ml-auto text-[10px] text-forest/40 bg-forest/5 px-2 py-0.5">
                        {cat.item_count}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0 ml-auto lg:ml-0">
            {/* Search */}
            <div className="hidden md:block w-48 xl:w-56">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className={`w-full px-4 py-2 border text-sm focus:outline-none pr-10 transition-all duration-300 ${
                    isTransparent
                      ? "bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/30"
                      : "bg-white/60 border-white/60 text-forest/70 placeholder:text-forest/30 focus:border-terra/30 focus:ring-2 focus:ring-terra/8"
                  }`}
                />
                <button
                  className={`absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center transition-colors ${
                    isTransparent
                      ? "bg-white/20 text-white"
                      : "bg-terra text-white"
                  }`}
                >
                  <Search size={13} />
                </button>
              </div>
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className={`hidden md:flex items-center justify-center w-10 h-10 transition-all duration-300 ${
                isTransparent
                  ? "text-white/60 hover:text-white"
                  : "text-forest/50 hover:text-terra"
              }`}
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
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold transition-transform hover:scale-105 ${
                        isTransparent
                          ? "bg-white/20 text-white ring-1 ring-white/20"
                          : "bg-gradient-to-br from-forest to-forest-400 text-cream ring-2 ring-forest/10"
                      }`}
                    >
                      {getUserDisplayName().charAt(0).toUpperCase()}
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-md border border-white/60 py-2 z-50 shadow-soft-lg animate-fade-in">
                        <div className="px-4 py-2 border-b border-forest/5">
                          <p className="text-xs font-semibold text-forest truncate">
                            {getUserDisplayName()}
                          </p>
                          <p className="text-[10px] text-forest/40 truncate">
                            {user.email}
                          </p>
                        </div>
                        <Link
                          href="/account"
                          className="block px-4 py-2.5 text-sm text-forest/70 hover:text-terra hover:bg-forest/[0.03] transition-all"
                          onClick={() => setShowUserMenu(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          href="/orders"
                          className="block px-4 py-2.5 text-sm text-forest/70 hover:text-terra hover:bg-forest/[0.03] transition-all"
                          onClick={() => setShowUserMenu(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          className="block px-4 py-2.5 text-sm text-forest/70 hover:text-terra hover:bg-forest/[0.03] transition-all"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Wishlist
                        </Link>
                        <hr className="my-1 border-forest/5" />
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2.5 text-sm text-accent-rose hover:bg-red-50/50 flex items-center gap-2 transition-all"
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
                    className={`flex items-center justify-center w-10 h-10 transition-all duration-300 ${
                      isTransparent
                        ? "text-white/60 hover:text-white"
                        : "text-forest/50 hover:text-terra"
                    }`}
                  >
                    <User size={19} />
                  </Link>
                )}
              </div>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className={`flex items-center gap-2.5 px-4 py-2.5 font-semibold text-sm transition-all duration-300 group ${
                isTransparent
                  ? "bg-white/15 text-white border border-white/20 hover:bg-white/25"
                  : "bg-terra text-white hover:bg-terra/90"
              }`}
            >
              <div className="relative">
                <ShoppingCart
                  size={16}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-terra text-white text-[9px] w-4 h-4 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </div>
              <span>&pound;{totalPrice.toFixed(2)}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className={`lg:hidden border-t animate-fade-in ${
          isTransparent
            ? "border-white/10 bg-forest-900/95 backdrop-blur-lg"
            : "border-white/60 bg-white/95 backdrop-blur-md"
        }`}>
          <nav className="max-w-[1400px] mx-auto px-6 py-4 space-y-1">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search products..."
                className={`w-full px-4 py-2.5 border text-sm pr-10 transition-all ${
                  isTransparent
                    ? "bg-white/10 border-white/15 text-white placeholder:text-white/40"
                    : "bg-white/60 border-white/60 text-forest/70 placeholder:text-forest/30"
                }`}
              />
              <Search
                size={16}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  isTransparent ? "text-white/40" : "text-forest/30"
                }`}
              />
            </div>
            {[
              { href: "/", label: "Home" },
              { href: "/products/vegetable", label: "Shop" },
              { href: "/products/organic", label: "Catalogue" },
              { href: "/seller", label: "Suppliers" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`block px-3 py-2.5 text-sm font-semibold transition-all ${
                  isTransparent
                    ? "text-white/70 hover:text-white"
                    : "text-forest/70 hover:text-terra"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className={`pt-2 border-t ${isTransparent ? "border-white/10" : "border-forest/5"}`}>
              <p className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                isTransparent ? "text-white/30" : "text-forest/40"
              }`}>
                Categories
              </p>
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products/${cat.slug}`}
                  className={`flex items-center gap-2.5 px-3 py-2 text-sm transition-all ${
                    isTransparent
                      ? "text-white/50 hover:text-white"
                      : "text-forest/70 hover:text-terra"
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
