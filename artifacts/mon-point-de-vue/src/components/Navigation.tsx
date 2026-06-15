import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { SiFacebook, SiYoutube, SiTiktok } from "react-icons/si";
import { Menu, X, Moon, Sun, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  const navLinks = [
    { href: "/about", label: t("À Propos", "About") },
    { href: "/blog", label: "Blog" },
    { href: "/videos", label: t("Vidéos", "Videos") },
    { href: "/events", label: t("Événements", "Events") },
    { href: "/gallery", label: t("Galerie", "Gallery") },
    { href: "/shop", label: "Boutique" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <span className="cursor-pointer font-serif text-xl md:text-2xl font-bold tracking-tight text-foreground hover:text-primary transition-colors">
                CIANNEY <span className="text-primary opacity-70">|</span> MON POINT DE VUE
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${location === link.href ? "text-primary" : "text-muted-foreground"}`}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4 border-l border-border pl-6">
              {/* Socials */}
              <div className="flex items-center space-x-3 text-muted-foreground">
                <a href="https://www.facebook.com/cianney.haddock2025?mibextid=ZbWKwL" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  <SiFacebook size={18} />
                </a>
                <a href="https://youtube.com/@monpointdevue-k1u?si=HXLMEZeKH5kY8Iui" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  <SiYoutube size={18} />
                </a>
                <a href="https://tiktok.com/@monpointdevue6" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  <SiTiktok size={18} />
                </a>
              </div>

              {/* Language */}
              <button onClick={toggleLanguage} className="text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                {language.toUpperCase()}
              </button>

              {/* Theme */}
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-muted-foreground hover:text-primary transition-colors w-8 h-8 flex items-center justify-center rounded-full">
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Auth */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full border border-primary/20">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || ""} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/member">
                        <span className="flex items-center w-full cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>{t("Espace Membre", "Member Area")}</span>
                        </span>
                      </Link>
                    </DropdownMenuItem>
                    {user.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin">
                          <span className="flex items-center w-full cursor-pointer text-primary">
                            <span className="font-semibold">Administration</span>
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t("Déconnexion", "Logout")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button variant="outline" className="border-primary/50 hover:bg-primary hover:text-primary-foreground text-primary rounded-none h-9 px-4 text-xs font-semibold tracking-wider">
                    {t("CONNEXION", "LOGIN")}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden space-x-4">
            <button onClick={toggleLanguage} className="text-xs font-bold">
              {language.toUpperCase()}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground hover:text-primary transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border shadow-lg"
          >
            <div className="flex flex-col px-6 py-6 space-y-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className={`text-lg font-serif transition-colors hover:text-primary cursor-pointer block ${location === link.href ? "text-primary" : "text-foreground"}`}>
                    {link.label}
                  </span>
                </Link>
              ))}

              <div className="pt-4 border-t border-border flex flex-col space-y-6">
                {user ? (
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || ""} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Link href="/member">
                      <Button variant="outline" className="w-full justify-start rounded-none border-primary/20">{t("Espace Membre", "Member Area")}</Button>
                    </Link>
                    {user.role === "admin" && (
                      <Link href="/admin">
                        <Button variant="default" className="w-full justify-start rounded-none">Administration</Button>
                      </Link>
                    )}
                    <Button variant="ghost" onClick={logout} className="w-full justify-start text-destructive rounded-none">
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("Déconnexion", "Logout")}
                    </Button>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button className="w-full rounded-none tracking-widest">{t("CONNEXION", "LOGIN")}</Button>
                  </Link>
                )}

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-4">
                    <a href="https://www.facebook.com/cianney.haddock2025?mibextid=ZbWKwL" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
                      <SiFacebook size={20} />
                    </a>
                    <a href="https://youtube.com/@monpointdevue-k1u?si=HXLMEZeKH5kY8Iui" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
                      <SiYoutube size={20} />
                    </a>
                    <a href="https://tiktok.com/@monpointdevue6" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
                      <SiTiktok size={20} />
                    </a>
                  </div>
                  <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    <span className="text-sm">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
