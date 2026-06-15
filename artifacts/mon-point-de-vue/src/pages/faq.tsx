import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  const { t } = useLanguage();

  const faqs = [
    {
      q: "Comment puis-je contacter CIANNEY pour une interview ?",
      a: "Vous pouvez utiliser le formulaire de contact sur la page Contact en sélectionnant le type 'Interview' ou 'Presse'."
    },
    {
      q: "Les événements sont-ils accessibles en ligne ?",
      a: "Certains de nos événements sont diffusés en direct. Consultez la page Événements pour voir les détails de chaque rencontre."
    },
    {
      q: "Comment devenir partenaire ?",
      a: "Rendez-vous sur la page Contact et sélectionnez 'Partenariat'. Notre équipe vous répondra dans les plus brefs délais avec notre kit média."
    }
  ];

  return (
    <div className="container mx-auto py-20 px-4 max-w-3xl">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
          Foire Aux Questions
        </h1>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="font-serif text-lg text-left hover:text-primary">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
