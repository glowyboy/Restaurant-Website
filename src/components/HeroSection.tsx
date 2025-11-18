import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-family.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t, language } = useLanguage();
  
  // Hardcoded restaurant type - always "algériens" in French, "جزائرية" in Arabic
  const restaurantType = language === 'ar' ? 'جزائرية' : 'algériens';
  const restaurantTypeUpper = language === 'ar' ? 'جزائرية' : 'ALGÉRIENS';

  return (
    <section className="container py-12 md:py-20">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-center space-y-6">
          <div className="inline-block rounded-full bg-terracotta-soft px-6 py-2">
            <p className="text-sm font-semibold text-primary">
              {t('serviceNumber1')} {restaurantType} {t('inCanada')}
            </p>
          </div>
          
          <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
            {t('mealsLikeHome')} {restaurantTypeUpper},{" "}
            <span className="block">{t('asIfYouWereThere')}</span>
          </h1>
          
          <div className="space-y-3 text-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                <span className="text-xl text-primary">✓</span>
              </div>
              <p>{t('readyIn3Min')}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                <span className="text-xl text-primary">✓</span>
              </div>
              <p>{t('deliveryInAlgeria')}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                <span className="text-xl text-primary">✓</span>
              </div>
              <p>{t('dishesAvailable')}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="rounded-full bg-primary px-8 py-6 text-base font-bold hover:bg-primary-dark"
              onClick={() => window.location.href = '/menu'}
            >
              {t('seeMenu')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full border-2 border-primary px-8 py-6 text-base font-bold text-primary hover:bg-primary-light"
              onClick={() => window.location.href = '/comment-ca-marche'}
            >
              {t('howItWorksQuestion')}
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <img 
              src={heroImage} 
              alt="Famille savourant un repas algérien ensemble" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
