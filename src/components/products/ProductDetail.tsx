'use client';

import Image from 'next/image';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Images */}
      <div>
        <div className="relative h-96 lg:h-[600px] bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.discount && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md font-semibold">
              {product.discount}% OFF
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < Math.floor(product.rating!)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline space-x-3">
            <span className="text-4xl font-bold text-primary-600">
              £{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  £{product.originalPrice.toFixed(2)}
                </span>
                <span className="text-green-600 font-semibold">
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>

        {/* Stock Status */}
        <div className="mb-6">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              product.inStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </button>
          <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Heart size={24} />
          </button>
          <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Share2 size={24} />
          </button>
        </div>

        {/* Features */}
        <div className="border-t pt-6">
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary-600 rounded-full mr-3" />
              Free shipping on orders over £50
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary-600 rounded-full mr-3" />
              30-day return policy
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary-600 rounded-full mr-3" />
              Secure payment
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary-600 rounded-full mr-3" />
              24/7 customer support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
