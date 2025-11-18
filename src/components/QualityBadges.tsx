import { CheckCircle, Crown, Beef, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const QualityBadges = () => {
  const { t, language } = useLanguage();
  
  const badges = [
    { icon: CheckCircle, text: t('authenticRecipes') },
    { icon: Crown, text: t('premiumQuality') },
    { icon: Beef, text: t('qualityMeat') },
    { icon: Leaf, text: t('naturalIngredients') },
  ];

  return (
    <section className="w-full bg-muted py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-bold md:text-xl">{t('qualityCommitment')}</h3>
          <div className="flex flex-wrap items-center justify-end gap-8">
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="rounded-full bg-muted-foreground/10 p-2">
                  <badge.icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="hidden text-sm font-semibold md:inline">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityBadges;
