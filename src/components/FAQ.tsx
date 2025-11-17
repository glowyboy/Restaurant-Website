import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Vos repas sont-ils frais ou congelés ?",
    answer:
      "Tous nos repas sont préparés frais et livrés directement chez vous. Ils ne sont jamais congelés, garantissant ainsi une qualité et un goût authentiques.",
  },
  {
    question: "Comment réchauffer mes repas ?",
    answer:
      "Nos repas peuvent être réchauffés au micro-ondes en 2-3 minutes, au four traditionnel ou à la poêle selon vos préférences. Des instructions détaillées sont fournies avec chaque commande.",
  },
  {
    question: "Livrez-vous dans ma ville ?",
    answer:
      "Nous livrons actuellement dans les régions de Montréal, Laval, Longueuil, et plusieurs autres villes de la région métropolitaine. Consultez notre section 'Zones de livraison' pour voir la liste complète.",
  },
  {
    question: "Puis-je commander des repas en format familial ?",
    answer:
      "Oui ! Nous proposons des portions individuelles ainsi que des formats familiaux pour 2, 4 ou 6 personnes. Vous pouvez choisir le format qui vous convient lors de votre commande.",
  },
  {
    question: "Comment fonctionne l'abonnement ?",
    answer:
      "Notre service d'abonnement vous permet de recevoir automatiquement vos repas préférés chaque semaine. Vous pouvez modifier, suspendre ou annuler votre abonnement à tout moment sans frais.",
  },
  {
    question: "Puis-je annuler ma commande ?",
    answer:
      "Oui, vous pouvez annuler votre commande jusqu'à 24 heures avant la date de livraison prévue. Pour toute annulation, veuillez nous contacter directement.",
  },
];

const FAQ = () => {
  return (
    <section className="w-full bg-warm-cream py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold text-primary">FAQs</p>
          <h2 className="mb-12 text-3xl font-black md:text-4xl">
            FOIRE AUX QUESTIONS
          </h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl border-2 border-primary bg-background px-6"
              >
                <AccordionTrigger className="text-left text-lg font-bold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
