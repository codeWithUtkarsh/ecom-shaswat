import { notFound } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import ProductDetail from "@/components/products/ProductDetail";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  let data;
  try {
    data = await api.products.get(id);
  } catch {
    notFound();
  }

  const product = data.product;
  const relatedProducts = data.relatedProducts;

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 lg:py-10 bg-warmth">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-bark-400 mb-6">
        <Link href="/" className="hover:text-forest transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/products/${product.category}`}
          className="hover:text-forest transition-colors"
        >
          {product.category_label}
        </Link>
        <span>/</span>
        <span className="text-forest font-medium line-clamp-1">
          {product.name}
        </span>
      </div>

      {/* Product Detail */}
      <div className="mb-16 lg:mb-20">
        <ProductDetail product={product} />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-forest/6 pt-10 lg:pt-14">
          <div className="mb-7">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-terra">
              You might also like
            </span>
            <h2 className="font-display text-2xl font-semibold text-forest mt-1 italic">
              Related Products
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 stagger-children">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
