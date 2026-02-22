import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import ProductDetail from "@/components/products/ProductDetail";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-8">
      {/* Product Details */}
      <div className="mb-16">
        <ProductDetail product={product} />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-navy mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
