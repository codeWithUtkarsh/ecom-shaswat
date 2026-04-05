import { notFound } from "next/navigation";
import Link from "next/link";
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
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 lg:py-10 bg-warmth">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-bark-400 mb-6">
        <Link href="/" className="hover:text-forest transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-forest font-medium">{category.name}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-terra">
          {category.icon} {category.name}
        </span>
        <h1 className="font-display text-3xl lg:text-4xl font-semibold text-forest mt-1 italic">
          {category.name}
        </h1>
        <p className="text-bark-400 text-sm mt-1">
          {categoryProducts.length} products found
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-forest/8 rounded-full hover:bg-forest/[0.04] text-bark-500 transition-all text-sm font-medium">
            Filter
          </button>
          <select className="px-4 py-2 border border-forest/8 rounded-full bg-cream-50 text-bark-500 focus:outline-none focus:border-terra/20 text-sm appearance-none cursor-pointer">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 stagger-children">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="font-display text-bark-400 text-lg italic">
            No products found in this category.
          </p>
          <Link
            href="/"
            className="inline-flex mt-4 text-sm font-semibold text-terra hover:text-terra-500 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      )}
    </div>
  );
}
