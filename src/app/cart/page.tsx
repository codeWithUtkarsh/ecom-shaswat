"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();
  const shipping = totalPrice > 500 ? 0 : 14.99;
  const tax = totalPrice * 0.2;
  const grandTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-surface-300 mb-4" />
          <h2 className="text-2xl font-bold text-navy mb-2">
            Your cart is empty
          </h2>
          <p className="text-surface-500 mb-8">Add some products to get started</p>
          <Link
            href="/"
            className="inline-block bg-orange text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-dark transition-all"
          >
            Browse Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold text-navy mb-8">Order Summary</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white border border-surface-200 rounded-xl p-6 flex items-center space-x-4"
            >
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface-50">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <Link
                  href={`/products/detail/${item.product.id}`}
                  className="text-lg font-semibold text-navy hover:text-orange transition-colors"
                >
                  {item.product.name}
                </Link>
                <p className="text-surface-400 text-sm mt-1">
                  {item.product.category}
                </p>
                <p className="text-orange font-bold mt-2">
                  £{item.product.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                  className="p-1.5 border border-surface-200 rounded-lg hover:bg-surface-50 text-surface-500 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold text-navy">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                  className="p-1.5 border border-surface-200 rounded-lg hover:bg-surface-50 text-surface-500 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-navy">
                  £{(item.product.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-accent-rose hover:text-red-700 mt-2 flex items-center space-x-1 ml-auto transition-colors"
                >
                  <Trash2 size={16} />
                  <span className="text-sm">Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-surface-200 rounded-xl p-6 sticky top-24 shadow-soft">
            <h2 className="text-xl font-bold text-navy mb-4">
              Price Breakdown
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-surface-500">
                <span>Subtotal</span>
                <span>£{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-surface-500">
                <span>Delivery</span>
                <span>
                  {shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-sm text-orange">
                  Add £{(500 - totalPrice).toFixed(2)} more for free delivery
                </p>
              )}
              <div className="flex justify-between text-surface-500">
                <span>VAT (20%)</span>
                <span>£{tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-surface-200 pt-3 flex justify-between text-lg font-bold">
                <span className="text-navy">Total</span>
                <span className="text-orange">
                  £{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button className="w-full bg-orange text-white py-3 rounded-xl font-bold hover:bg-orange-dark transition-all mb-3">
              Place Order
            </button>

            <Link
              href="/"
              className="block text-center text-orange hover:text-orange-dark font-medium transition-colors"
            >
              Continue Browsing
            </Link>

            <div className="mt-6 pt-6 border-t border-surface-200 space-y-2 text-sm text-surface-500">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange rounded-full mr-2" />
                Secure B2B checkout
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange rounded-full mr-2" />
                UK-wide doorstep delivery
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange rounded-full mr-2" />
                Dedicated account manager
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
