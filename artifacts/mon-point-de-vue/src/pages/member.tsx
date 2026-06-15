import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function MemberDashboard() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  if (!user) return null;

  return (
    <div className="container mx-auto py-16 px-4 max-w-4xl">
      <h1 className="font-serif text-4xl font-bold mb-8 text-foreground">{t("Espace Membre", "Member Area")}</h1>
      
      <div className="bg-card border border-border p-8 flex flex-col md:flex-row gap-8 items-start">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-32 w-32 border-4 border-primary/20">
            <AvatarImage src={user.avatar || ""} />
            <AvatarFallback className="text-4xl bg-primary/10 text-primary">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
            {user.role}
          </div>
        </div>
        
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Bio</h3>
            <p className="text-muted-foreground text-sm">{user.bio || "Aucune biographie renseignée."}</p>
          </div>

          <div className="pt-6 flex gap-4">
            <Button variant="outline" className="rounded-none">Modifier le profil</Button>
            <Button variant="ghost" className="text-destructive rounded-none" onClick={logout}>Déconnexion</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
