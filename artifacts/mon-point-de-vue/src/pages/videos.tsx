import React from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useListVideos } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { SiYoutube, SiTiktok } from "react-icons/si";

export default function Videos() {
  const { t } = useLanguage();
  const { data: videos, isLoading } = useListVideos();

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
          {t("Vidéos", "Videos")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("Découvrez les dernières interventions, interviews et pensées de CIANNEY.", "Discover the latest talks, interviews, and thoughts from CIANNEY.")}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="aspect-video w-full rounded-none" />
          ))}
        </div>
      ) : videos && videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col bg-card border border-border"
            >
              <div className="relative aspect-video bg-muted overflow-hidden group">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center backdrop-blur-sm">
                    {video.platform === "youtube" ? <SiYoutube size={24} /> : <SiTiktok size={24} />}
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-2 py-1 text-xs font-bold flex items-center space-x-2">
                  {video.platform === "youtube" ? (
                    <SiYoutube className="text-red-500" />
                  ) : (
                    <SiTiktok className="text-foreground" />
                  )}
                  <span className="uppercase">{video.platform}</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs font-bold tracking-widest text-primary uppercase mb-2">
                  {video.category}
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/30 border border-border">
          <p className="text-muted-foreground">Aucune vidéo disponible.</p>
        </div>
      )}
    </div>
  );
}
