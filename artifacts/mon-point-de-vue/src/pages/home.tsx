import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  useGetStatsSummary, 
  useGetLatestVideos, 
  useGetFeaturedArticles, 
  useGetUpcomingEvents 
} from "@workspace/api-client-react";

export default function Home() {
  const { t } = useLanguage();
  const { data: stats } = useGetStatsSummary();
  const { data: videos } = useGetLatestVideos();
  const { data: articles } = useGetFeaturedArticles();
  const { data: events } = useGetUpcomingEvents();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-background z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <h2 className="text-primary font-medium tracking-[0.2em] text-sm md:text-base uppercase mb-4">
              {t("Inspiration & Réflexion", "Inspiration & Thought")}
            </h2>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-foreground mb-2">
              CIANNEY
            </h1>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full mt-6 mb-8" />
            <p className="text-xl md:text-2xl text-muted-foreground font-serif italic max-w-2xl mx-auto">
              MON POINT DE VUE
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Link href="/blog">
              <Button size="lg" className="rounded-none px-8 font-semibold tracking-wider bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-12">
                {t("LIRE LES ARTICLES", "READ ARTICLES")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/videos">
              <Button variant="outline" size="lg" className="rounded-none px-8 font-semibold tracking-wider border-foreground text-foreground hover:bg-foreground hover:text-background h-12">
                {t("VOIR LES VIDÉOS", "WATCH VIDEOS")} <PlayCircle className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Ticker */}
      <section className="border-y border-border/50 bg-card py-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-serif font-bold text-primary mb-2">{stats?.totalArticles || 0}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("Articles", "Articles")}</p>
            </div>
            <div>
              <p className="text-4xl font-serif font-bold text-primary mb-2">{stats?.totalVideos || 0}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("Vidéos", "Videos")}</p>
            </div>
            <div>
              <p className="text-4xl font-serif font-bold text-primary mb-2">{stats?.totalEvents || 0}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("Événements", "Events")}</p>
            </div>
            <div>
              <p className="text-4xl font-serif font-bold text-primary mb-2">{(stats?.totalViews || 0).toLocaleString()}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("Vues Globales", "Global Views")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
