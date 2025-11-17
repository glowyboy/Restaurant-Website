import { Utensils, Truck, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "1",
    icon: Utensils,
    title: "CHOISISSEZ VOS REPAS",
    description: "Un menu varié qui change chaque semaine.",
  },
  {
    number: "2",
    icon: Truck,
    title: "LIVRÉ CHEZ VOUS !",
    description: "Des plats frais, jamais congelés, livrés directement à votre porte.",
  },
  {
    number: "3",
    icon: Flame,
    title: "RÉCHAUFFEZ ET SAVOUREZ",
    description: "Au micro-ondes, au four ou à la poêle, prêts en 3 minutes.",
  },
];

const HowItWorks = () => {
  return (
    <section className="container py-16 md:py-24">
      <div className="text-center">
        <p className="mb-4 text-lg font-semibold text-primary">Comment Ça marche ?</p>
        <h2 className="mb-4 text-3xl font-black md:text-4xl">
          COMMENT LA BOX MAROCAINE VOUS SIMPLIFIE LA VIE
        </h2>
        <p className="mx-auto mb-16 max-w-3xl text-lg text-muted-foreground">
          Chaque semaine, recevez des repas marocains faits maison en trois étapes simples :
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
