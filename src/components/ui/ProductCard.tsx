"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <Link
      href={`/products/detail/${product.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-surface-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Wishlist button — top left */}
        <button
          onClick={handleLike}
          className="absolute top-3 left-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110"
        >
          <Heart
            size={14}
            className={
              liked
                ? "fill-red-500 text-red-500"
                : "text-surface-400"
            }
          />
        </button>

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
            <span className="font-display font-medium text-xs text-surface-500 bg-white/90 px-4 py-1.5 rounded-full shadow-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 pt-3.5">
        {/* Name — large, bold, editorial */}
        <h3 className="font-display text-base font-bold text-navy leading-tight line-clamp-2 min-h-[44px] group-hover:text-orange transition-colors duration-300">
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-display text-lg font-extrabold text-navy tracking-tight">
            £{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-surface-400 line-through">
              £{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating + Vendor */}
        <div className="flex items-center gap-1.5 mt-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={
                  i < product.rating
                    ? "fill-accent-gold text-accent-gold"
                    : "fill-surface-200 text-surface-200"
                }
              />
            ))}
          </div>
          <span className="text-[11px] text-surface-400">({product.reviews})</span>
          <span className="text-surface-200 text-[11px]">·</span>
          <span className="text-[11px] text-surface-400">{product.vendor}</span>
        </div>

        {/* Add to cart button */}
        {product.inStock ? (
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 border-2 border-navy text-navy font-display text-xs font-bold tracking-wider uppercase rounded-xl hover:bg-navy hover:text-white transition-all duration-300 active:scale-[0.98]"
          >
            Add to Cart
          </button>
        ) : (
          <div className="w-full py-2.5 border-2 border-surface-200 text-surface-400 font-display text-xs font-bold tracking-wider uppercase rounded-xl text-center cursor-not-allowed">
            Sold Out
          </div>
        )}
      </div>
    </Link>
  );
}
