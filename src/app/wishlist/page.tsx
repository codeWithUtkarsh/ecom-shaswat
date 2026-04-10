"use client";

import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-warmth flex items-center justify-center">
        <div className="text-bark-400 text-sm">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-warmth">
        <div className="max-w-md mx-auto px-6 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-forest/[0.06] flex items-center justify-center mx-auto mb-5">
            <Heart size={28} className="text-bark-300" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-forest italic mb-2">Sign in to view your wishlist</h1>
          <p className="text-bark-400 text-sm mb-6">Save products you&apos;re interested in and order them when you&apos;re ready.</p>
          <Link href="/auth/login" className="inline-flex items-center gap-2 bg-terra text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-terra-500 transition-all">
            Sign In <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmth">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-3xl">
          <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">My Account</span>
          <h1 className="font-display text-4xl font-bold text-forest italic leading-tight mt-3 mb-8">
            My Wishlist
          </h1>

          {/* Empty state */}
          <div className="bg-cream-50 rounded-3xl p-10 border border-forest/5 text-center">
            <div className="w-16 h-16 rounded-full bg-forest/[0.04] flex items-center justify-center mx-auto mb-5">
              <Heart size={28} className="text-bark-300" />
            </div>
            <h2 className="font-display text-xl font-semibold text-forest italic mb-2">Your wishlist is empty</h2>
            <p className="text-bark-400 text-sm mb-6 max-w-sm mx-auto">
              Browse our catalogue and save products you&apos;re interested in. They&apos;ll appear here for easy re-ordering.
            </p>
            <Link href="/products/whole-spices" className="inline-flex items-center gap-2 bg-terra text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-terra-500 transition-all">
              Browse Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
