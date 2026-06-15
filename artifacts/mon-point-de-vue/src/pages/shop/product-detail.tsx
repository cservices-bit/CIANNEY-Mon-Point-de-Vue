import React from "react";
import { Link, useRoute } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGetProduct } from "@workspace/api-client-react";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductDetail() {
  const [match, params] = useRoute("/shop/:id");
  const productId = params?.id ? parseInt(params.id, 10) : 0;
  const { t } = useLanguage();

  const { data: product, isLoading } = useGetProduct(productId, {
    query: { enabled: !!productId }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-32 flex justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-32 text-center">
        <h1 className="text-3xl font-serif mb-4">Produit non trouvé</h1>
        <Link href="/shop">
          <Button variant="outline">Retour à la boutique</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <Link href="/shop">
        <span className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 cursor-pointer transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la boutique
        </span>
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <div className="bg-muted aspect-[4/5] relative">
          {product.coverImage ? (
            <img src={product.coverImage} alt={product.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-serif text-4xl text-muted-foreground/30">CIANNEY</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="text-xs font-bold tracking-widest text-primary uppercase mb-4">
            {product.type}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {product.title}
          </h1>
          <div className="text-3xl font-bold mb-8">
            {product.price} {product.currency}
          </div>
          
          <div className="prose prose-lg dark:prose-invert text-muted-foreground mb-10">
            <p>{product.description}</p>
          </div>
          
          <Button size="lg" className="rounded-none w-full md:w-auto px-12 h-14 font-bold tracking-widest text-lg">
            {t("ACHETER MAINTENANT", "BUY NOW")}
          </Button>
        </div>
      </div>
    </div>
  );
}
