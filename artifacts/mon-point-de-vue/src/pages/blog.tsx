import React from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useListArticles } from "@workspace/api-client-react";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Blog() {
  const { t, language } = useLanguage();
  const { data: articles, isLoading } = useListArticles();

  const dateLocale = language === "fr" ? fr : enUS;

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
          Journal & Réflexions
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("Lisez les derniers articles, essais et opinions de CIANNEY.", "Read the latest articles, essays, and opinions by CIANNEY.")}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col space-y-4">
              <Skeleton className="h-64 w-full rounded-none" />
              <Skeleton className="h-4 w-24 rounded-none" />
              <Skeleton className="h-8 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
            </div>
          ))}
        </div>
      ) : articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <Link href={`/blog/${article.id}`}>
                <div className="overflow-hidden mb-4 relative aspect-[4/3] bg-muted">
                  {article.coverImage ? (
                    <img 
                      src={article.coverImage} 
                      alt={article.title} 
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-card">
                      <span className="font-serif text-muted-foreground/30 text-3xl">CIANNEY</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold tracking-widest uppercase">
                    {article.category}
                  </div>
                </div>
              </Link>
              <div className="flex-1 flex flex-col">
                <span className="text-muted-foreground text-sm font-medium mb-3">
                  {format(new Date(article.createdAt), "d MMMM yyyy", { locale: dateLocale })}
                </span>
                <Link href={`/blog/${article.id}`}>
                  <h3 className="font-serif text-2xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">
                  {article.excerpt}
                </p>
                <Link href={`/blog/${article.id}`}>
                  <span className="text-sm font-bold tracking-widest uppercase text-foreground group-hover:text-primary inline-flex items-center transition-colors mt-auto">
                    {t("Lire la suite", "Read more")}
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/30 border border-border">
          <p className="text-muted-foreground">{t("Aucun article trouvé.", "No articles found.")}</p>
        </div>
      )}
    </div>
  );
}
