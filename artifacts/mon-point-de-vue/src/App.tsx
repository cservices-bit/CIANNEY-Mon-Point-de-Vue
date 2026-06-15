import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PublicLayout } from "@/components/PublicLayout";
import { AdminLayout } from "@/components/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import NotFound from "@/pages/not-found";

// Public Pages
import Home from "@/pages/home";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import ArticleDetail from "@/pages/article-detail";
import Videos from "@/pages/videos";
import Events from "@/pages/events";
import Gallery from "@/pages/gallery";
import Achievements from "@/pages/achievements";
import Media from "@/pages/media";
import Partners from "@/pages/partners";
import Shop from "@/pages/shop";
import ProductDetail from "@/pages/shop/product-detail";
import Contact from "@/pages/contact";
import Guestbook from "@/pages/guestbook";
import FAQ from "@/pages/faq";
import Newsletter from "@/pages/newsletter";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";

// Auth Pages
import Login from "@/pages/login";
import Register from "@/pages/register";
import ForgotPassword from "@/pages/forgot-password";
import MemberDashboard from "@/pages/member";

// Admin Pages
import AdminDashboard from "@/pages/admin/dashboard";
import AdminArticles from "@/pages/admin/articles";
import AdminEvents from "@/pages/admin/events";
import AdminGallery from "@/pages/admin/gallery";
import AdminComments from "@/pages/admin/comments";
import AdminTestimonials from "@/pages/admin/testimonials";
import AdminPartners from "@/pages/admin/partners";
import AdminShop from "@/pages/admin/shop";
import AdminNewsletter from "@/pages/admin/newsletter";
import AdminMessages from "@/pages/admin/messages";
import AdminGuestbook from "@/pages/admin/guestbook";
import AdminVideos from "@/pages/admin/videos";
import AdminUsers from "@/pages/admin/users";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Admin Routes */}
      <Route path="/admin" nest>
        <ProtectedRoute requireAdmin>
          <AdminLayout>
            <Switch>
              <Route path="/" component={AdminDashboard} />
              <Route path="/articles" component={AdminArticles} />
              <Route path="/events" component={AdminEvents} />
              <Route path="/videos" component={AdminVideos} />
              <Route path="/gallery" component={AdminGallery} />
              <Route path="/comments" component={AdminComments} />
              <Route path="/testimonials" component={AdminTestimonials} />
              <Route path="/partners" component={AdminPartners} />
              <Route path="/shop" component={AdminShop} />
              <Route path="/newsletter" component={AdminNewsletter} />
              <Route path="/messages" component={AdminMessages} />
              <Route path="/guestbook" component={AdminGuestbook} />
              <Route path="/users" component={AdminUsers} />
              <Route component={NotFound} />
            </Switch>
          </AdminLayout>
        </ProtectedRoute>
      </Route>

      {/* Public Routes */}
      <Route path="/login">
        <PublicLayout><Login /></PublicLayout>
      </Route>
      <Route path="/register">
        <PublicLayout><Register /></PublicLayout>
      </Route>
      <Route path="/forgot-password">
        <PublicLayout><ForgotPassword /></PublicLayout>
      </Route>
      <Route path="/member">
        <ProtectedRoute>
          <PublicLayout><MemberDashboard /></PublicLayout>
        </ProtectedRoute>
      </Route>
      
      <Route path="/">
        <PublicLayout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:id" component={ArticleDetail} />
            <Route path="/videos" component={Videos} />
            <Route path="/events" component={Events} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/achievements" component={Achievements} />
            <Route path="/media" component={Media} />
            <Route path="/partners" component={Partners} />
            <Route path="/shop" component={Shop} />
            <Route path="/shop/:id" component={ProductDetail} />
            <Route path="/contact" component={Contact} />
            <Route path="/guestbook" component={Guestbook} />
            <Route path="/faq" component={FAQ} />
            <Route path="/newsletter" component={Newsletter} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route component={NotFound} />
          </Switch>
        </PublicLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
