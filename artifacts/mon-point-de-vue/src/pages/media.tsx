import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export default function Media() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <h1 className="font-serif text-5xl font-bold mb-6 text-foreground">
        {t("Presse & Médias", "Press & Media")}
      </h1>
      <p className="text-muted-foreground">Page en construction.</p>
    </div>
  );
}
