import React from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useListProducts } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Shop() {
  const { t } = useLanguage();
  const { data: products, isLoading } = useListProducts();

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
          {t("Boutique", "Boutique")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("Livres, formations et services exclusifs.", "Books, courses, and exclusive services.")}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[3/4] w-full rounded-none" />
              <Skeleton className="h-6 w-3/4 rounded-none" />
              <Skeleton className="h-4 w-1/4 rounded-none" />
            </div>
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-card border border-border"
            >
              <Link href={`/shop/${product.id}`}>
                <div className="relative aspect-[4/5] bg-muted overflow-hidden cursor-pointer">
                  {product.coverImage ? (
                    <img 
                      src={product.coverImage} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="font-serif text-3xl text-muted-foreground/30">CIANNEY</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-background px-3 py-1 text-sm font-bold border border-border">
                    {product.price} {product.currency}
                  </div>
                </div>
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs font-bold tracking-widest text-primary uppercase mb-2">
                  {product.type}
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">
                  <Link href={`/shop/${product.id}`} className="hover:text-primary transition-colors">
                    {product.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">
                  {product.description}
                </p>
                <Link href={`/shop/${product.id}`}>
                  <Button className="w-full rounded-none font-bold tracking-widest">
                    {t("DÉCOUVRIR", "DISCOVER")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/30 border border-border">
          <p className="text-muted-foreground">{t("Aucun produit disponible pour le moment.", "No products available at the moment.")}</p>
        </div>
      )}
    </div>
  );
}
