import HeroBanner from "@/components/home/HeroBanner";
import CategoryBrowser from "@/components/home/CategoryBrowser";
import YouMightNeed from "@/components/home/YouMightNeed";
import AppDownload from "@/components/home/AppDownload";

export default function Home() {
  return (
    <div className="min-h-screen bg-warmth">
      <HeroBanner />
      <CategoryBrowser />
      <YouMightNeed />
      <AppDownload />
    </div>
  );
}
