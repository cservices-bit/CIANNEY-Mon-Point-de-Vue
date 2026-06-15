import React, { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useListPhotos } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const { t } = useLanguage();
  const { data: photos, isLoading } = useListPhotos();
  
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    document.body.style.overflow = "auto";
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photos && selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photos && selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
          {t("Galerie", "Gallery")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("Un aperçu visuel du parcours, des événements et des moments marquants.", "A visual glimpse of the journey, events, and key moments.")}
        </p>
      </div>

      {isLoading ? (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="w-full h-64 md:h-80 rounded-none break-inside-avoid" />
          ))}
        </div>
      ) : photos && photos.length > 0 ? (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden bg-muted"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-medium">{photo.caption}</p>
                <p className="text-primary text-xs uppercase tracking-widest mt-2">{photo.album}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/30 border border-border">
          <p className="text-muted-foreground">{t("Aucune photo disponible.", "No photos available.")}</p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && photos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors z-10"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>
            
            <button 
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-background/50 hover:bg-background text-foreground transition-colors z-10"
              onClick={prevPhoto}
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center">
              <motion.img 
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={photos[selectedPhotoIndex].url} 
                alt={photos[selectedPhotoIndex].caption} 
                className="max-w-full max-h-[75vh] object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <div 
                className="mt-6 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-lg font-medium text-foreground">{photos[selectedPhotoIndex].caption}</p>
                <p className="text-primary text-sm uppercase tracking-widest mt-1">{photos[selectedPhotoIndex].album}</p>
              </div>
            </div>
            
            <button 
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-background/50 hover:bg-background text-foreground transition-colors z-10"
              onClick={nextPhoto}
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
