import HeroBanner from "@/components/home/HeroBanner";
import FeatureHighlights from "@/components/home/FeatureHighlights";
import PromoBanners from "@/components/home/PromoBanners";
import YouMightNeed from "@/components/home/YouMightNeed";
import CategoryBrowser from "@/components/home/CategoryBrowser";
import AppDownload from "@/components/home/AppDownload";

export default function Home() {
  return (
    <div className="min-h-screen aurora">
      <HeroBanner />
      <FeatureHighlights />
      <PromoBanners />
      <CategoryBrowser />
      <YouMightNeed />
      <AppDownload />
    </div>
  );
}
