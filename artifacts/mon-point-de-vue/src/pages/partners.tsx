import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useListPartners } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Partners() {
  const { t } = useLanguage();
  const { data: partners, isLoading } = useListPartners();

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
          {t("Partenaires", "Partners")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("Les marques et institutions qui soutiennent notre vision.", "Brands and institutions supporting our vision.")}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-none" />
          ))}
        </div>
      ) : partners && partners.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <motion.a
              key={partner.id}
              href={partner.website}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border p-8 flex items-center justify-center hover:border-primary transition-colors grayscale hover:grayscale-0"
            >
              <img src={partner.logo} alt={partner.name} className="max-w-full max-h-16 object-contain" />
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/30 border border-border">
          <p className="text-muted-foreground">{t("Aucun partenaire pour le moment.", "No partners yet.")}</p>
        </div>
      )}
    </div>
  );
}
