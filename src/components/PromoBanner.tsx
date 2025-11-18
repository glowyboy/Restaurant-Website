import { useSettings } from "@/hooks/useSettings";
import { useLanguage } from "@/contexts/LanguageContext";

const PromoBanner = () => {
  const { settings } = useSettings();
  const { t } = useLanguage();

  return (
    <div className="w-full bg-primary py-4 text-center">
      <p className="text-base font-bold text-primary-foreground md:text-lg">
        {t('freeDeliveryOn')} ${settings.freeDeliveryThreshold}+
      </p>
    </div>
  );
};

export default PromoBanner;
