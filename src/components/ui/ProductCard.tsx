"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1200);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <Link
      href={`/products/detail/${product.id}`}
      className="animate-fade-up group block bg-cream-50 rounded-2xl overflow-hidden border border-forest/[0.04] hover:border-terra/15 shadow-card hover:shadow-card-hover transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Badge */}
        {product.badge && product.badge !== "out" && (
          <div
            className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              product.badge === "hot"
                ? "bg-accent-rose text-white"
                : product.badge === "new"
                  ? "bg-forest text-cream"
                  : "bg-terra text-white"
            }`}
          >
            {product.badge}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={handleLike}
          className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            liked
              ? "bg-accent-rose text-white"
              : "bg-white/80 backdrop-blur-sm text-bark-400 hover:bg-white"
          }`}
        >
          <Heart
            size={14}
            className={liked ? "fill-white" : ""}
          />
        </button>

        {/* Out of stock */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-cream/60 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="font-display text-xs font-medium text-bark-600 bg-white/90 px-4 py-1.5 rounded-full shadow-sm italic">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick add overlay on hover */}
        {product.in_stock && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold transition-colors duration-200 ${
                addedFeedback
                  ? "bg-forest text-cream"
                  : "bg-terra/90 backdrop-blur-sm text-white hover:bg-terra"
              }`}
            >
              <ShoppingCart size={14} />
              {addedFeedback ? "Added!" : "Quick Add"}
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Vendor */}
        <p className="text-[10px] text-bark-400 font-medium uppercase tracking-wider mb-1">
          {product.vendor}
        </p>

        {/* Name */}
        <h3 className="font-display text-[15px] font-semibold text-forest leading-snug line-clamp-2 min-h-[40px] group-hover:text-terra transition-colors duration-300 italic">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={
                  i < product.rating
                    ? "fill-gold-400 text-gold-400"
                    : "fill-bark-100 text-bark-100"
                }
              />
            ))}
          </div>
          <span className="text-[10px] text-bark-400">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2.5">
          {product.price != null ? (
            <span className="font-display text-lg font-bold text-forest tracking-tight">
              &pound;{product.price.toFixed(2)}
            </span>
          ) : (
            <span className="font-display text-sm font-semibold text-terra">
              Price on request
            </span>
          )}
          {product.original_price != null && (
            <span className="text-xs text-bark-400 line-through">
              &pound;{product.original_price.toFixed(2)}
            </span>
          )}
          {product.discount && product.discount > 5 && (
            <span className="text-[10px] font-semibold text-terra bg-terra/8 px-1.5 py-0.5 rounded">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Add to cart button (mobile/fallback) */}
        <div className="mt-3 lg:hidden">
          {product.in_stock ? (
            <button
              onClick={handleAddToCart}
              className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 active:scale-[0.98] ${
                addedFeedback
                  ? "bg-terra text-white"
                  : "border border-terra/20 text-terra hover:bg-terra hover:text-white"
              }`}
            >
              {addedFeedback ? "Added!" : "Add to Cart"}
            </button>
          ) : (
            <div className="w-full py-2.5 border border-bark-200 text-bark-400 text-xs font-semibold rounded-xl text-center cursor-not-allowed">
              Sold Out
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
