import Header from "@/components/Header";
import PromoBanner from "@/components/PromoBanner";
import HeroSection from "@/components/HeroSection";
import QualityBadges from "@/components/QualityBadges";
import HowItWorks from "@/components/HowItWorks";
import MenuCarousel from "@/components/MenuCarousel";
import DeliveryZones from "@/components/DeliveryZones";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <PromoBanner />
      <main className="pt-24">
        <HeroSection />
        <QualityBadges />
        <HowItWorks />
        <MenuCarousel />
        <DeliveryZones />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
