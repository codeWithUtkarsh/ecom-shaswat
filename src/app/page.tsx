import HeroBanner from '@/components/home/HeroBanner';
import FeatureHighlights from '@/components/home/FeatureHighlights';
import PromotionalSection from '@/components/home/PromotionalSection';
import CategoryBrowser from '@/components/home/CategoryBrowser';
import ProductCard from '@/components/ui/ProductCard';
import { products, promotionalSections } from '@/lib/data';

export default function Home() {
  const healthSections = promotionalSections.slice(0, 4);
  const beautySections = promotionalSections.slice(4, 8);

  return (
    <div>
      <HeroBanner />
      <FeatureHighlights />

      {/* Health & Personal Section */}
      <PromotionalSection title="Health & Personal Care" sections={healthSections} />

      {/* Featured Products - Category Browser */}
      <CategoryBrowser />

      {/* Beauty Section */}
      <div className="bg-gray-50">
        <PromotionalSection title="Beauty & Wellness" sections={beautySections} />
      </div>

      {/* Best Sellers */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
