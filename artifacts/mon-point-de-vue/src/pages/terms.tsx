import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Terms() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-20 px-4 max-w-4xl">
      <h1 className="font-serif text-5xl font-bold mb-10 text-foreground">
        Conditions d'Utilisation
      </h1>
      <div className="prose dark:prose-invert">
        <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
        <h2>1. Acceptation des conditions</h2>
        <p>En utilisant ce site, vous acceptez d'être lié par ces conditions d'utilisation.</p>
        <h2>2. Propriété intellectuelle</h2>
        <p>Tout le contenu présent sur ce site (textes, vidéos, images) est la propriété exclusive de CIANNEY / MON POINT DE VUE, sauf mention contraire.</p>
      </div>
    </div>
  );
}
