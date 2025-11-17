import { useSettings } from "@/hooks/useSettings";

const PromoBanner = () => {
  const { settings } = useSettings();

  return (
    <div className="w-full bg-primary py-4 text-center">
      <p className="text-base font-bold text-primary-foreground md:text-lg">
        Livraison GRATUITE sur toutes les commandes de ${settings.freeDeliveryThreshold}+
      </p>
    </div>
  );
};

export default PromoBanner;
