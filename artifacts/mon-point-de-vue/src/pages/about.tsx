import React from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl font-bold text-white mb-6"
          >
            {t("À Propos", "About")}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="h-1 w-20 bg-primary mx-auto"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="prose prose-lg dark:prose-invert mx-auto font-sans text-muted-foreground leading-relaxed"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground font-bold mb-8 text-center">
            {t("L'Histoire", "The Story")}
          </h2>
          <p className="first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
            CIANNEY est bien plus qu'une simple marque, c'est une voix. Née d'une volonté de partager une perspective unique sur le monde qui nous entoure, "MON POINT DE VUE" s'est rapidement imposé comme un espace de réflexion incontournable.
          </p>
          <p>
            À travers des analyses pointues, des prises de parole audacieuses et un engagement constant envers la vérité et l'authenticité, CIANNEY explore les dynamiques sociétales, culturelles et humaines avec une acuité rare.
          </p>
          
          <h3 className="font-serif text-2xl text-foreground font-bold mt-12 mb-6">Mission & Vision</h3>
          <p>
            Notre mission est d'élever le débat, de remettre en question les idées reçues et d'inspirer notre audience à penser par elle-même. Nous croyons que la clarté de la pensée mène à des actions plus justes.
          </p>
          
          <blockquote className="border-l-4 border-primary pl-6 py-2 my-10 italic font-serif text-2xl text-foreground">
            "La véritable influence ne réside pas dans le bruit que l'on fait, mais dans la résonance des idées que l'on sème."
          </blockquote>
        </motion.div>
      </section>
    </div>
  );
}
