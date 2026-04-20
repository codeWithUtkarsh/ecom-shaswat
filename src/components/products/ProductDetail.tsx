"use client";

import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  Leaf,
  Headphones,
} from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
      {/* Image */}
      <div>
        <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden border border-forest/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {product.discount && product.discount > 5 && (
            <div className="absolute top-5 left-5 bg-terra text-white px-3.5 py-1.5 rounded-full font-semibold text-sm">
              -{product.discount}%
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col">
        {/* Breadcrumb hint */}
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-terra mb-3">
          {product.category_label}
        </p>

        <h1 className="font-display text-3xl lg:text-4xl font-bold text-forest leading-tight italic">
          {product.name}
        </h1>

        {product.weight && (
          <p className="text-bark-400 mt-2 text-sm">{product.weight}</p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < product.rating
                    ? "fill-gold-400 text-gold-400"
                    : "fill-bark-100 text-bark-100"
                }
              />
            ))}
          </div>
          <span className="text-bark-400 text-sm">
            ({product.reviews} reviews)
          </span>
          <span className="text-bark-300">·</span>
          <span className="text-sm text-bark-500">
            By <span className="text-terra font-medium">{product.vendor}</span>
          </span>
        </div>

        {/* Price */}
        <div className="mt-6 pb-6 border-b border-forest/6">
          <div className="flex items-baseline gap-3">
            {product.price != null ? (
              <span className="font-display text-4xl font-bold text-forest italic">
                &pound;{product.price.toFixed(2)}
              </span>
            ) : (
              <span className="font-display text-2xl font-bold text-terra italic">
                Price on request
              </span>
            )}
            {product.original_price != null && (
              <>
                <span className="text-lg text-bark-400 line-through">
                  &pound;{product.original_price.toFixed(2)}
                </span>
                <span className="text-terra font-semibold bg-terra/8 px-2.5 py-1 rounded-lg text-sm">
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="font-display text-lg font-semibold text-forest mb-2 italic">
            Description
          </h2>
          <p className="text-bark-500 leading-relaxed">{product.description}</p>
        </div>

        {/* Stock */}
        <div className="mt-5">
          <span
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium ${
              product.in_stock
                ? "bg-forest/[0.06] border border-forest/10 text-forest"
                : "bg-accent-rose/8 border border-accent-rose/15 text-accent-rose"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${product.in_stock ? "bg-forest-400" : "bg-accent-rose"}`}
            />
            {product.in_stock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock}
            className={`flex-1 py-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2.5 transition-all duration-300 disabled:bg-bark-100 disabled:text-bark-400 disabled:cursor-not-allowed ${
              addedFeedback
                ? "bg-forest text-cream"
                : "bg-terra text-white hover:bg-terra-500 shadow-warm-glow"
            }`}
          >
            <ShoppingCart size={18} />
            <span>{addedFeedback ? "Added to Cart!" : "Add to Cart"}</span>
          </button>
          <button className="p-4 border border-forest/10 rounded-full hover:bg-forest/[0.04] hover:border-forest/20 transition-all duration-300 text-bark-400 hover:text-terra">
            <Heart size={20} />
          </button>
          <button className="p-4 border border-forest/10 rounded-full hover:bg-forest/[0.04] hover:border-forest/20 transition-all duration-300 text-bark-400 hover:text-terra">
            <Share2 size={20} />
          </button>
        </div>

        {/* Features */}
        <div className="mt-8 pt-6 border-t border-forest/6 grid grid-cols-2 gap-4">
          {[
            {
              icon: Truck,
              label: "Free delivery on orders over £500",
            },
            {
              icon: Shield,
              label: "Fresh guarantee — 100% quality",
            },
            {
              icon: Leaf,
              label: "Sustainably sourced produce",
            },
            {
              icon: Headphones,
              label: "24/7 customer support",
            },
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-forest/[0.04] flex items-center justify-center flex-shrink-0 mt-0.5">
                <feature.icon size={15} className="text-forest-400" />
              </div>
              <span className="text-sm text-bark-500 leading-snug">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
