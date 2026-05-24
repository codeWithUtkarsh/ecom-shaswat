"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

function SuccessContent() {
  const params = useSearchParams();
  const checkoutId = params.get("checkout_id");
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);

  // Polar redirects here once payment completes (success_url).
  // The webhook is the source of truth that actually flips status='paid',
  // but for UX we clear the local cart immediately so it doesn't look
  // populated when the user comes back.
  useEffect(() => {
    if (cleared) return;
    void clearCart();
    setCleared(true);
  }, [cleared, clearCart]);

  return (
    <div className="min-h-screen bg-warmth flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <div className="bg-cream-50 rounded-3xl p-8 lg:p-10 shadow-soft-lg border border-forest/5 text-center">
          <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={30} className="text-forest" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-forest italic mb-2">
            Payment successful
          </h1>
          <p className="text-bark-500 text-sm mb-6 leading-relaxed">
            Thanks for your order. We&apos;ve received your payment and will
            send a confirmation email shortly. Your order will appear in your
            account once it&apos;s confirmed by our system.
          </p>

          {checkoutId && (
            <p className="text-bark-300 text-[11px] mb-6 break-all">
              Reference: {checkoutId}
            </p>
          )}

          <div className="space-y-3">
            <Link
              href="/orders"
              className="inline-flex w-full items-center justify-center gap-2 bg-forest text-cream py-3 rounded-full font-semibold text-sm hover:bg-forest-400 transition-all"
            >
              <Package size={14} /> View my orders
            </Link>
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 border border-forest/10 text-bark-600 py-3 rounded-full font-semibold text-sm hover:bg-forest/[0.04] transition-all"
            >
              Continue shopping <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-warmth" />}>
      <SuccessContent />
    </Suspense>
  );
}
