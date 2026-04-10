import HeroBanner from "@/components/home/HeroBanner";
import CategoryBrowser from "@/components/home/CategoryBrowser";
import YouMightNeed from "@/components/home/YouMightNeed";
import AppDownload from "@/components/home/AppDownload";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="min-h-screen bg-warmth">
      <HeroBanner />
      <CategoryBrowser />
      <YouMightNeed />
      <AppDownload />
      <Newsletter />
    </div>
  );
}
