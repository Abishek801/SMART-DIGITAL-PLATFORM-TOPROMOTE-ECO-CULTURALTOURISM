import HeroSection from "@/components/home/HeroSection";
import TickerSection from "@/components/home/TickerSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedSection from "@/components/home/FeaturedSection";
import CarbonSection from "@/components/home/CarbonSection";
import AiTeaserSection from "@/components/home/AiTeaserSection";
import ShopPreviewSection from "@/components/home/ShopPreviewSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-ink">
      <HeroSection />
      <TickerSection />
      <CategorySection />
      <FeaturedSection />
      <CarbonSection />
      <AiTeaserSection />
      <ShopPreviewSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
