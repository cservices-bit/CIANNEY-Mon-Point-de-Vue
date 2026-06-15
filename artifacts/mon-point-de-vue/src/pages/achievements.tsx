import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useListAchievements } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Trophy, Star, Target, Zap, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Achievements() {
  const { t, language } = useLanguage();
  const { data: achievements, isLoading } = useListAchievements();

  const getIcon = (category: string) => {
    switch(category) {
      case 'award': return <Trophy className="text-primary h-8 w-8" />;
      case 'media': return <Star className="text-primary h-8 w-8" />;
      case 'project': return <Target className="text-primary h-8 w-8" />;
      case 'recognition': return <Award className="text-primary h-8 w-8" />;
      default: return <Zap className="text-primary h-8 w-8" />;
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
          {t("Réalisations", "Achievements")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("Les grandes étapes, distinctions et moments clés du parcours.", "Key milestones, awards, and defining moments of the journey.")}
        </p>
        <div className="h-1 w-16 bg-primary mx-auto mt-8" />
      </div>

      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          <div className="space-y-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-6">
                <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
                <div className="space-y-3 flex-1">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : achievements && achievements.length > 0 ? (
          <div className="relative border-l-2 border-primary/20 pl-8 ml-4 md:ml-0 md:pl-0 md:border-l-0 space-y-16">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative md:flex items-center justify-center"
              >
                {/* Desktop Timeline Line */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-primary/20 -translate-x-1/2" />
                
                {/* Node */}
                <div className="absolute -left-12 md:left-1/2 top-0 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>

                <div className={`w-full md:w-1/2 pb-8 md:pb-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'}`}>
                  <div className="bg-card border border-border p-6 hover:border-primary/50 transition-colors">
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="bg-muted p-3 rounded-full">
                        {getIcon(achievement.category)}
                      </div>
                      <span className="text-primary font-bold tracking-widest text-sm">
                        {new Date(achievement.date).getFullYear()}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 border border-border">
            <p className="text-muted-foreground">{t("Aucune réalisation pour le moment.", "No achievements yet.")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
