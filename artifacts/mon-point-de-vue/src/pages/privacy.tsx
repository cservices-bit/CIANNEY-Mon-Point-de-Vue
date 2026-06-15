import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Privacy() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-20 px-4 max-w-4xl">
      <h1 className="font-serif text-5xl font-bold mb-10 text-foreground">
        Politique de Confidentialité
      </h1>
      <div className="prose dark:prose-invert">
        <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
        <h2>1. Collecte des données</h2>
        <p>Nous collectons les données que vous nous fournissez volontairement lors de la création d'un compte, l'inscription à la newsletter ou l'utilisation du formulaire de contact.</p>
        <h2>2. Utilisation des données</h2>
        <p>Vos données sont utilisées exclusivement pour améliorer votre expérience sur MON POINT DE VUE et ne sont jamais vendues à des tiers.</p>
      </div>
    </div>
  );
}
