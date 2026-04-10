"use client";

import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { User, Package, Heart, MapPin, CreditCard, LogOut, Settings, ArrowRight } from "lucide-react";

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();

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
            <User size={28} className="text-bark-300" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-forest italic mb-2">Sign in to continue</h1>
          <p className="text-bark-400 text-sm mb-6">Access your account, track orders, and manage your preferences.</p>
          <Link href="/auth/login" className="inline-flex items-center gap-2 bg-terra text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-terra-500 transition-all">
            Sign In <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: Package, title: "My Orders", desc: "Track and manage your wholesale orders", href: "/orders" },
    { icon: Heart, title: "Wishlist", desc: "Products you've saved for later", href: "/wishlist" },
    { icon: MapPin, title: "Delivery Addresses", desc: "Manage your delivery locations", href: "/account" },
    { icon: CreditCard, title: "Payment Methods", desc: "Manage payment options and credit terms", href: "/account" },
    { icon: Settings, title: "Account Settings", desc: "Update your profile and preferences", href: "/account" },
  ];

  return (
    <div className="min-h-screen bg-warmth">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-3xl">
          {/* Profile header */}
          <div className="bg-cream-50 rounded-3xl p-8 border border-forest/5 shadow-soft-lg mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-forest/[0.08] flex items-center justify-center">
                <User size={24} className="text-forest-400" />
              </div>
              <div className="flex-1">
                <h1 className="font-display text-xl font-semibold text-forest italic">
                  {user.user_metadata?.full_name || user.email?.split("@")[0] || "Retailer"}
                </h1>
                <p className="text-bark-400 text-sm">{user.email}</p>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-2 text-sm text-bark-400 hover:text-accent-rose transition-colors"
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </div>

          {/* Menu grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {menuItems.map((item, i) => (
              <Link key={i} href={item.href} className="bg-cream-50 rounded-2xl p-5 border border-forest/5 hover:shadow-soft-lg hover:border-forest/10 transition-all duration-300 group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest/[0.06] flex items-center justify-center shrink-0 group-hover:bg-terra/10 transition-colors">
                    <item.icon size={18} className="text-forest-400 group-hover:text-terra transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-forest mb-0.5">{item.title}</h3>
                    <p className="text-bark-400 text-xs">{item.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
