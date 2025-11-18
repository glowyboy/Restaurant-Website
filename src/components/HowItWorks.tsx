import { Utensils, Truck, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      number: "1",
      icon: Utensils,
      title: t('step1Title'),
      description: t('step1Description'),
    },
    {
      number: "2",
      icon: Truck,
      title: t('step2Title'),
      description: t('step2Description'),
    },
    {
      number: "3",
      icon: Flame,
      title: t('step3Title'),
      description: t('step3Description'),
    },
  ];

  return (
    <section className="container py-16 md:py-24">
      <div className="text-center">
        <p className="mb-4 text-lg font-semibold text-primary">{t('howItWorksQuestion')}</p>
        <h2 className="mb-4 text-3xl font-black md:text-4xl">
          {t('howItWorksTitle')}
        </h2>
        <p className="mx-auto mb-16 max-w-3xl text-lg text-muted-foreground">
          {t('howItWorksSubtitle')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.number} className="border-2 shadow-lg transition-all hover:shadow-xl">
            <CardContent className="pt-12">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-black text-primary-foreground">
                    {step.number}
                  </div>
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-terracotta-soft">
                    <step.icon className="h-12 w-12 text-primary" />
                  </div>
                </div>
              </div>
              <h3 className="mb-3 text-center text-xl font-black">{step.title}</h3>
              <p className="text-center text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
