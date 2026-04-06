"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Leaf } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();
  const shipping = totalPrice > 500 ? 0 : 14.99;
  const tax = totalPrice * 0.2;
  const grandTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-forest/[0.04] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-bark-300" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-forest mb-2 italic">
            Your cart is empty
          </h2>
          <p className="text-bark-400 mb-8 text-sm">
            Add some products to get started with your wholesale order
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-terra text-white px-8 py-3.5 rounded-full font-semibold hover:bg-terra-500 transition-all duration-300 shadow-warm-glow"
          >
            Browse Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 lg:py-10">
      <div className="mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-terra">
          Your order
        </span>
        <h1 className="font-display text-3xl font-semibold text-forest mt-1 italic">
          Order Summary
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-cream-50 border border-forest/5 rounded-2xl p-5 lg:p-6 flex items-center gap-4 hover:border-forest/10 transition-all duration-300"
            >
              <div className="relative w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/detail/${item.product.id}`}
                  className="font-display text-base lg:text-lg font-semibold text-forest hover:text-terra transition-colors italic line-clamp-2"
                >
                  {item.product.name}
                </Link>
                <p className="text-bark-400 text-xs mt-0.5">
                  {item.product.category_label}
                </p>
                <p className="text-terra font-semibold mt-1.5 text-sm">
                  {item.product.price != null ? `£${item.product.price.toFixed(2)}` : 'Price on request'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                  className="p-1.5 border border-forest/8 rounded-lg hover:bg-forest/[0.04] text-bark-500 transition-all"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-semibold text-forest text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                  className="p-1.5 border border-forest/8 rounded-lg hover:bg-forest/[0.04] text-bark-500 transition-all"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="font-display text-lg font-bold text-forest">
                  {item.product.price != null ? `£${(item.product.price * item.quantity).toFixed(2)}` : '—'}
                </p>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-accent-rose/70 hover:text-accent-rose mt-1.5 flex items-center gap-1 ml-auto transition-colors text-xs"
                >
                  <Trash2 size={13} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-cream-50 border border-forest/5 rounded-2xl p-6 sticky top-24 shadow-soft">
            <h2 className="font-display text-xl font-semibold text-forest mb-5 italic">
              Price Breakdown
            </h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-bark-500 text-sm">
                <span>Subtotal</span>
                <span>&pound;{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-bark-500 text-sm">
                <span>Delivery</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-forest font-medium">Free</span>
                  ) : (
                    `£${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-terra">
                  Add &pound;{(500 - totalPrice).toFixed(2)} more for free
                  delivery
                </p>
              )}
              <div className="flex justify-between text-bark-500 text-sm">
                <span>VAT (20%)</span>
                <span>&pound;{tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-forest/6 pt-3 flex justify-between">
                <span className="font-display text-lg font-semibold text-forest italic">
                  Total
                </span>
                <span className="font-display text-lg font-bold text-terra">
                  &pound;{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button className="w-full bg-terra text-white py-3.5 rounded-full font-semibold hover:bg-terra-500 transition-all duration-300 mb-3 shadow-warm-glow">
              Place Order
            </button>

            <Link
              href="/"
              className="block text-center text-forest/60 hover:text-forest font-medium transition-colors text-sm"
            >
              Continue Browsing
            </Link>

            <div className="mt-6 pt-5 border-t border-forest/6 space-y-2.5">
              {[
                "Secure B2B checkout",
                "UK-wide doorstep delivery",
                "Dedicated account manager",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-bark-500">
                  <Leaf size={12} className="text-forest-300 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
