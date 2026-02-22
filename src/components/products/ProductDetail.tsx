"use client";

import Image from "next/image";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Images */}
      <div>
        <div className="relative h-96 lg:h-[600px] bg-surface-50 rounded-2xl overflow-hidden border border-surface-200">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.discount && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-accent-rose to-orange text-white px-3 py-1 rounded-lg font-semibold text-sm">
              -{product.discount}%
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">{product.name}</h1>
        {product.weight && (
          <p className="text-surface-500 mb-4">{product.weight}</p>
        )}

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={
                  i < product.rating
                    ? "fill-accent-gold text-accent-gold"
                    : "text-surface-300"
                }
              />
            ))}
          </div>
          <span className="ml-2 text-surface-500 text-sm">
            ({product.reviews} reviews)
          </span>
          <span className="ml-2 text-xs text-surface-400">
            By <span className="text-orange">{product.vendor}</span>
          </span>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline space-x-3">
            <span className="text-4xl font-bold text-navy">
              £{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-surface-400 line-through">
                  £{product.originalPrice.toFixed(2)}
                </span>
                <span className="text-orange font-semibold bg-orange/10 border border-orange/20 px-2 py-0.5 rounded-lg text-sm">
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-navy mb-2">Description</h2>
          <p className="text-surface-500 leading-relaxed">{product.description}</p>
        </div>

        {/* Stock Status */}
        <div className="mb-6">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              product.inStock
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-accent-rose"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="flex-1 bg-orange text-white py-3.5 rounded-xl font-bold hover:bg-orange-dark transition-all flex items-center justify-center space-x-2 disabled:bg-surface-200 disabled:text-surface-400 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </button>
          <button className="p-3.5 border border-surface-200 rounded-xl hover:bg-surface-50 hover:border-orange/20 transition-all text-surface-400 hover:text-orange">
            <Heart size={24} />
          </button>
          <button className="p-3.5 border border-surface-200 rounded-xl hover:bg-surface-50 hover:border-orange/20 transition-all text-surface-400 hover:text-orange">
            <Share2 size={24} />
          </button>
        </div>

        {/* Features */}
        <div className="border-t border-surface-200 pt-6">
          <ul className="space-y-3 text-surface-500">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange rounded-full mr-3" />
              Free delivery on orders over £500
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange rounded-full mr-3" />
              Fresh guarantee - 100% quality
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange rounded-full mr-3" />
              Secure payment
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange rounded-full mr-3" />
              24/7 customer support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
