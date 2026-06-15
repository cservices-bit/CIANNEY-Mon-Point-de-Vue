import React from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { SiFacebook, SiYoutube, SiTiktok } from "react-icons/si";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-1">
            <Link href="/">
              <span className="cursor-pointer font-serif text-2xl font-bold tracking-tight text-foreground block mb-4">
                CIANNEY
                <br />
                <span className="text-sm font-sans tracking-widest text-primary font-normal">MON POINT DE VUE</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {t("Une plateforme d'expression libre, de réflexion et d'inspiration. Rejoignez la discussion.", "A platform for free expression, thought, and inspiration. Join the discussion.")}
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://www.facebook.com/cianney.haddock2025?mibextid=ZbWKwL" target="_blank" rel="noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-accent/10 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <SiFacebook size={18} />
              </a>
              <a href="https://youtube.com/@monpointdevue-k1u?si=HXLMEZeKH5kY8Iui" target="_blank" rel="noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-accent/10 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <SiYoutube size={18} />
              </a>
              <a href="https://tiktok.com/@monpointdevue6" target="_blank" rel="noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-accent/10 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <SiTiktok size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-foreground">{t("Navigation", "Navigation")}</h4>
            <ul className="space-y-3">
              <li><Link href="/about"><span className="text-muted-foreground hover:text-primary text-sm cursor-pointer transition-colors">{t("À Propos", "About")}</span></Link></li>
              <li><Link href="/blog"><span className="text-muted-foreground hover:text-primary text-sm cursor-pointer transition-colors">Blog</span></Link></li>
              <li><Link href="/videos"><span className="text-muted-foreground hover:text-primary text-sm cursor-pointer transition-colors">{t("Vidéos", "Videos")}</span></Link></li>
              <li><Link href="/events"><span className="text-muted-foreground hover:text-primary text-sm cursor-pointer transition-colors">{t("Événements", "Events")}</span></Link></li>
              <li><Link href="/gallery"><span className="text-muted-foreground hover:text-primary text-sm cursor-pointer transition-colors">{t("Galerie", "Gallery")}</span></Link></li>
              <li><Link href="/shop"><span className="text-muted-foreground hover:text-primary text-sm cursor-pointer transition-colors">Boutique</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-foreground">{t("Ressources", "Resources")}</h4>
            <ul className="space-y-3">
              <li><Link href="/media"><span className="text-muted-foreground hover:text-primary text-sm cursor-pointer transition-colors">{t("Presse & Médias", "Press & Media")}</span></Link></li>
              <li><Link href="/partners"><span className="text-muted-foreground hover:text-primary text-sm cursor-pointer transition-colors">{t("Partenaires", "Partners")}</span></Link></li>
              <li><Link href="/guestbook"><span className="text-muted-foreground hover:text-primary text-sm cursor-pointer transition-colors">{t("Livre d'or", "Guestbook")}</span></Link></li>
              <li><Link href="/faq"><span className="text-muted-foreground hover:text-primary text-sm cursor-pointer transition-colors">FAQ</span></Link></li>
              <li><Link href="/contact"><span className="text-muted-foreground hover:text-primary text-sm cursor-pointer transition-colors">Contact</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-foreground">{t("Newsletter", "Newsletter")}</h4>
            <p className="text-muted-foreground text-sm mb-4">
              {t("Inscrivez-vous pour recevoir les dernières actualités et réflexions.", "Subscribe to receive the latest news and thoughts.")}
            </p>
            <form className="flex mt-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t("Votre adresse email", "Your email address")}
                className="bg-background border border-border px-4 py-2 text-sm w-full focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 transition-colors"
                aria-label={t("S'inscrire", "Subscribe")}
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-xs mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CIANNEY. {t("Tous droits réservés.", "All rights reserved.")}
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy"><span className="text-muted-foreground hover:text-primary text-xs cursor-pointer transition-colors">{t("Politique de confidentialité", "Privacy Policy")}</span></Link>
            <Link href="/terms"><span className="text-muted-foreground hover:text-primary text-xs cursor-pointer transition-colors">{t("Conditions d'utilisation", "Terms of Service")}</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
