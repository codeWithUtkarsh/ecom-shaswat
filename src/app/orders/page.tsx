"use client";

import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { Package, ArrowRight, ShoppingBag, Clock } from "lucide-react";

export default function OrdersPage() {
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
            <Package size={28} className="text-bark-300" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-forest italic mb-2">Sign in to view orders</h1>
          <p className="text-bark-400 text-sm mb-6">Track your wholesale orders and view order history.</p>
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
            Order History
          </h1>

          {/* Empty state */}
          <div className="bg-cream-50 rounded-3xl p-10 border border-forest/5 text-center">
            <div className="w-16 h-16 rounded-full bg-forest/[0.04] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag size={28} className="text-bark-300" />
            </div>
            <h2 className="font-display text-xl font-semibold text-forest italic mb-2">No orders yet</h2>
            <p className="text-bark-400 text-sm mb-6 max-w-sm mx-auto">
              Once you place your first wholesale order, it will appear here with full tracking and history.
            </p>
            <Link href="/products/whole-spices" className="inline-flex items-center gap-2 bg-terra text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-terra-500 transition-all">
              Start Shopping <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
