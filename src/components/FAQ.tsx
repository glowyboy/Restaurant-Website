import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const { t } = useLanguage();
  
  const faqs = [
    {
      question: t('faq1Q'),
      answer: t('faq1A'),
    },
    {
      question: t('faq2Q'),
      answer: t('faq2A'),
    },
    {
      question: t('faq3Q'),
      answer: t('faq3A'),
    },
    {
      question: t('faq4Q'),
      answer: t('faq4A'),
    },
    {
      question: t('faq5Q'),
      answer: t('faq5A'),
    },
    {
      question: t('faq6Q'),
      answer: t('faq6A'),
    },
  ];

  return (
    <section className="w-full bg-warm-cream py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold text-primary">{t('faqs')}</p>
          <h2 className="mb-12 text-3xl font-black md:text-4xl">
            {t('faqTitle')}
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
