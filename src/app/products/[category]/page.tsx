import { notFound } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { products, categories } from "@/lib/data";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.category === categorySlug);

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-navy mb-2">{category.name}</h1>
        <p className="text-surface-500">
          {categoryProducts.length} products found
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 border border-surface-200 rounded-lg hover:bg-surface-50 text-surface-500 transition-colors">
            Filter
          </button>
          <select className="px-4 py-2 border border-surface-200 rounded-lg bg-white text-surface-500 focus:outline-none focus:border-orange/30">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-surface-400 text-lg">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
