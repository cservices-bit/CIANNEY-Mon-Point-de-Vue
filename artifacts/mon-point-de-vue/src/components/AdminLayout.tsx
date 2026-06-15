import React from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, FileText, Calendar, Video, Image as ImageIcon, 
  MessageSquare, Star, Users, ShoppingBag, Mail, BookOpen, UserCircle, LogOut 
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/events", label: "Événements", icon: Calendar },
  { href: "/admin/videos", label: "Vidéos", icon: Video },
  { href: "/admin/gallery", label: "Galerie", icon: ImageIcon },
  { href: "/admin/comments", label: "Commentaires", icon: MessageSquare },
  { href: "/admin/testimonials", label: "Témoignages", icon: Star },
  { href: "/admin/partners", label: "Partenaires", icon: Users },
  { href: "/admin/shop", label: "Boutique", icon: ShoppingBag },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/guestbook", label: "Livre d'or", icon: BookOpen },
  { href: "/admin/users", label: "Utilisateurs", icon: UserCircle },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { logout } = useAuth();

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-card flex-shrink-0 flex flex-col h-[100dvh] md:sticky md:top-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/">
            <span className="font-serif font-bold text-lg cursor-pointer hover:text-primary transition-colors">
              CIANNEY Admin
            </span>
          </Link>
        </div>
        
        <ScrollArea className="flex-1 py-6">
          <nav className="space-y-1 px-4">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href || (location.startsWith(link.href) && link.href !== "/admin");
              return (
                <Link key={link.href} href={link.href}>
                  <span 
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors text-sm font-medium ${
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-border mt-auto">
          <button 
            onClick={logout}
            className="flex items-center space-x-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors text-sm font-medium text-destructive hover:bg-destructive/10 w-full"
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
