import React from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useListEvents } from "@workspace/api-client-react";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Events() {
  const { t, language } = useLanguage();
  const { data: events, isLoading } = useListEvents({ upcoming: true });
  
  const dateLocale = language === "fr" ? fr : enUS;

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
          {t("Événements", "Events")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("Rencontrez CIANNEY lors de conférences, ateliers et événements exclusifs.", "Meet CIANNEY at conferences, workshops, and exclusive events.")}
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-48 w-full rounded-none" />
          ))}
        </div>
      ) : events && events.length > 0 ? (
        <div className="space-y-8 max-w-4xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row bg-card border border-border group overflow-hidden"
            >
              <div className="w-full md:w-1/3 aspect-[4/3] md:aspect-auto relative bg-muted flex-shrink-0">
                {event.coverImage ? (
                  <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute top-0 left-0 bg-primary text-primary-foreground p-4 text-center">
                  <span className="block text-2xl font-bold leading-none">{format(new Date(event.date), "dd")}</span>
                  <span className="block text-sm uppercase tracking-widest">{format(new Date(event.date), "MMM", { locale: dateLocale })}</span>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                <div className="flex items-center space-x-2 text-xs font-bold tracking-widest text-primary uppercase mb-3">
                  <span>{event.type}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-6 text-muted-foreground text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-3 text-primary/70" />
                    <span>{format(new Date(event.date), "EEEE d MMMM yyyy 'à' HH:mm", { locale: dateLocale })}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-3 text-primary/70" />
                    <span>{event.location}</span>
                  </div>
                  {event.maxAttendees && (
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-3 text-primary/70" />
                      <span>{event.registeredCount || 0} / {event.maxAttendees} participants</span>
                    </div>
                  )}
                </div>
                
                <p className="text-muted-foreground line-clamp-2 mb-6">
                  {event.description}
                </p>
                
                <div className="mt-auto">
                  {event.registrationOpen ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="rounded-none font-bold tracking-widest">
                          S'INSCRIRE <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-none border-border">
                        <DialogHeader>
                          <DialogTitle className="font-serif text-2xl">Inscription : {event.title}</DialogTitle>
                          <DialogDescription>
                            Remplissez ce formulaire pour confirmer votre présence à l'événement.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <p className="text-sm text-muted-foreground">Formulaire d'inscription à intégrer</p>
                          <Button className="w-full rounded-none">CONFIRMER</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button variant="outline" disabled className="rounded-none font-bold tracking-widest border-border text-muted-foreground">
                      INSCRIPTIONS FERMÉES
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/30 border border-border">
          <p className="text-muted-foreground">Aucun événement à venir pour le moment.</p>
        </div>
      )}
    </div>
  );
}
