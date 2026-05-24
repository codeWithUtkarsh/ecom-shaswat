"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Leaf,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Package,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, submitQuoteRequest } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  // Two visual buckets, one underlying cart.
  const pricedItems = items.filter((i) => i.product.price > 0);
  const quoteItems = items.filter((i) => i.product.price === 0);

  // Priced/checkout state
  const totalPrice = pricedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = totalPrice > 500 ? 0 : 14.99;
  const preTaxTotal = totalPrice + shipping;
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Quote submission state
  const [quoteMessage, setQuoteMessage] = useState("");
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [quoteSubmitted, setQuoteSubmitted] = useState<number | null>(null);

  const handleCheckout = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    setCheckoutError(null);
    setCheckoutLoading(true);
    try {
      const { checkout_url } = await api.orders.checkout();
      window.location.href = checkout_url;
    } catch (err: any) {
      setCheckoutError(err?.message || "Checkout failed. Please try again.");
      setCheckoutLoading(false);
    }
  };

  const handleSubmitQuote = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    setQuoteError(null);
    setQuoteSubmitting(true);
    try {
      const { submitted, failed } = await submitQuoteRequest(quoteMessage);
      if (failed > 0 && submitted === 0) {
        setQuoteError("Could not submit quote request. Please try again.");
      } else if (failed > 0) {
        setQuoteError(
          `${submitted} submitted, ${failed} failed. Failed items remain in your list.`
        );
        setQuoteSubmitted(submitted);
        setQuoteMessage("");
      } else {
        setQuoteSubmitted(submitted);
        setQuoteMessage("");
      }
    } catch (err: any) {
      setQuoteError(err?.message || "Quote submission failed.");
    } finally {
      setQuoteSubmitting(false);
    }
  };

  // Fully empty cart
  if (pricedItems.length === 0 && quoteItems.length === 0) {
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
          Your basket
        </span>
        <h1 className="font-display text-3xl font-semibold text-forest mt-1 italic">
          Cart &amp; Quote Requests
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* LEFT: items, split into two sections */}
        <div className="lg:col-span-2 space-y-8">
          {/* Priced items */}
          {pricedItems.length > 0 && (
            <section>
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="font-display text-lg font-semibold text-forest italic">
                  Your Order
                </h2>
                <span className="text-xs text-bark-400">
                  {pricedItems.length}{" "}
                  {pricedItems.length === 1 ? "item" : "items"}
                </span>
              </div>
              <div className="space-y-3">
                {pricedItems.map((item) => (
                  <CartLine
                    key={item.product.id}
                    item={item}
                    onQty={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Quote items */}
          {quoteItems.length > 0 && (
            <section>
              <div className="flex items-baseline justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-forest" />
                  <h2 className="font-display text-lg font-semibold text-forest italic">
                    Quote Request
                  </h2>
                </div>
                <span className="text-xs text-bark-400">
                  {quoteItems.length}{" "}
                  {quoteItems.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="space-y-3">
                {quoteItems.map((item) => (
                  <CartLine
                    key={item.product.id}
                    item={item}
                    onQty={updateQuantity}
                    onRemove={removeFromCart}
                    quote
                  />
                ))}
              </div>

              {/* Quote submission card */}
              <div className="mt-4 bg-cream-50 border border-forest/8 rounded-2xl p-5">
                {quoteSubmitted !== null && quoteError === null ? (
                  <div className="text-center py-2">
                    <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle size={22} className="text-forest" />
                    </div>
                    <p className="font-display font-semibold text-forest italic mb-1">
                      Quote request submitted
                    </p>
                    <p className="text-xs text-bark-400 leading-relaxed max-w-sm mx-auto">
                      We received {quoteSubmitted}{" "}
                      {quoteSubmitted === 1 ? "item" : "items"}. Our sourcing
                      team will email you a quote within 1–2 business days.
                    </p>
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="quote-message"
                      className="block text-sm font-medium text-bark-600 mb-2"
                    >
                      Add a note for sales{" "}
                      <span className="text-bark-300 font-normal">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="quote-message"
                      rows={3}
                      maxLength={2000}
                      value={quoteMessage}
                      onChange={(e) => setQuoteMessage(e.target.value)}
                      className="block w-full px-4 py-2.5 bg-cream border border-forest/8 rounded-xl text-bark text-sm placeholder:text-bark-400 focus:outline-none focus:border-terra/30 focus:ring-2 focus:ring-terra/8 transition-all resize-none"
                      placeholder="Delivery timeline, packaging preferences, certifications…"
                    />
                    <p className="text-[11px] text-bark-400 mt-1.5">
                      Applied to all {quoteItems.length} item
                      {quoteItems.length === 1 ? "" : "s"} above.
                    </p>

                    {quoteError && (
                      <div className="mt-3 p-3 bg-accent-rose/5 border border-accent-rose/15 rounded-xl flex items-start gap-2">
                        <AlertCircle
                          size={14}
                          className="text-accent-rose mt-0.5 flex-shrink-0"
                        />
                        <p className="text-xs text-accent-rose">
                          {quoteError}
                        </p>
                      </div>
                    )}

                    <button
                      onClick={handleSubmitQuote}
                      disabled={quoteSubmitting}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-forest text-cream py-3 rounded-full font-semibold text-sm hover:bg-forest-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {quoteSubmitting
                        ? "Submitting…"
                        : user
                        ? `Submit ${quoteItems.length === 1 ? "quote request" : "quote request"} (${quoteItems.length})`
                        : "Sign in to request quote"}
                    </button>
                  </>
                )}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT: order summary, only when there's something to pay for */}
        <div className="lg:col-span-1">
          {pricedItems.length > 0 ? (
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
                <div className="border-t border-forest/6 pt-3 flex justify-between">
                  <span className="font-display text-lg font-semibold text-forest italic">
                    Subtotal
                  </span>
                  <span className="font-display text-lg font-bold text-terra">
                    &pound;{preTaxTotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-bark-400 leading-relaxed">
                  Tax (VAT/sales tax) is calculated at checkout based on your
                  billing address.
                </p>
              </div>

              {checkoutError && (
                <div className="mb-3 p-3 bg-accent-rose/5 border border-accent-rose/15 rounded-xl flex items-start gap-2">
                  <AlertCircle
                    size={14}
                    className="text-accent-rose mt-0.5 flex-shrink-0"
                  />
                  <p className="text-xs text-accent-rose">{checkoutError}</p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full bg-terra text-white py-3.5 rounded-full font-semibold hover:bg-terra-500 transition-all duration-300 mb-3 shadow-warm-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkoutLoading
                  ? "Redirecting…"
                  : user
                  ? "Proceed to Checkout"
                  : "Sign in to checkout"}
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
          ) : (
            /* Quote-only basket — small contextual card instead of price summary */
            <div className="bg-cream-50 border border-forest/5 rounded-2xl p-6 sticky top-24 shadow-soft">
              <div className="flex items-center gap-2 mb-3">
                <Package size={16} className="text-forest" />
                <h2 className="font-display text-lg font-semibold text-forest italic">
                  Sourced to order
                </h2>
              </div>
              <p className="text-bark-500 text-sm leading-relaxed mb-4">
                All items in your basket are quoted individually. Our sourcing
                team finds the best supplier for you in India and ships direct
                to the UK.
              </p>
              <div className="space-y-2.5 pt-4 border-t border-forest/6">
                {[
                  "Verified Indian suppliers",
                  "Transparent UK landed pricing",
                  "Reply within 1–2 business days",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-bark-500"
                  >
                    <Leaf size={12} className="text-forest-300 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Single cart line — same look for both priced and quote items, just different price treatment. */
function CartLine({
  item,
  onQty,
  onRemove,
  quote = false,
}: {
  item: { product: any; quantity: number };
  onQty: (id: string, q: number) => void;
  onRemove: (id: string) => void;
  quote?: boolean;
}) {
  const lineTotal = quote ? null : item.product.price * item.quantity;

  return (
    <div className="bg-cream-50 border border-forest/5 rounded-2xl p-5 lg:p-6 flex items-center gap-4 hover:border-forest/10 transition-all duration-300">
      <div className="relative w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-xl overflow-hidden">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          sizes="96px"
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
        {quote ? (
          <p className="text-forest font-medium mt-1.5 text-xs italic">
            Price on request
          </p>
        ) : (
          <p className="text-terra font-semibold mt-1.5 text-sm">
            £{item.product.price.toFixed(2)}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onQty(item.product.id, item.quantity - 1)}
          className="p-1.5 border border-forest/8 rounded-lg hover:bg-forest/[0.04] text-bark-500 transition-all"
        >
          <Minus size={14} />
        </button>
        <span className="w-10 text-center font-semibold text-forest text-sm">
          {item.quantity}
        </span>
        <button
          onClick={() => onQty(item.product.id, item.quantity + 1)}
          className="p-1.5 border border-forest/8 rounded-lg hover:bg-forest/[0.04] text-bark-500 transition-all"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="text-right flex-shrink-0">
        {lineTotal !== null ? (
          <p className="font-display text-lg font-bold text-forest">
            £{lineTotal.toFixed(2)}
          </p>
        ) : (
          <p className="font-display text-xs text-bark-400 italic">TBD</p>
        )}
        <button
          onClick={() => onRemove(item.product.id)}
          className="text-accent-rose/70 hover:text-accent-rose mt-1.5 flex items-center gap-1 ml-auto transition-colors text-xs"
        >
          <Trash2 size={13} />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
}
