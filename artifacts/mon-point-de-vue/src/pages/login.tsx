import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
    } catch (error) {
      // Error is handled in AuthContext
    }
  };

  return (
    <div className="container max-w-md mx-auto py-24 px-4">
      <div className="bg-card border border-border p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
        
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl font-bold mb-2 text-foreground">
            {t("Connexion", "Login")}
          </h1>
          <p className="text-muted-foreground">
            {t("Accédez à votre espace membre", "Access your member area")}
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">{t("Adresse Email", "Email Address")}</Label>
            <Input
              id="email"
              type="email"
              className="rounded-none border-border focus-visible:ring-primary bg-background"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t("Mot de passe", "Password")}</Label>
              <Link href="/forgot-password">
                <span className="text-xs text-primary hover:underline cursor-pointer">
                  {t("Mot de passe oublié ?", "Forgot password?")}
                </span>
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              className="rounded-none border-border focus-visible:ring-primary bg-background"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-destructive text-sm mt-1">{form.formState.errors.password.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full rounded-none font-semibold tracking-wider mt-4" 
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              t("SE CONNECTER", "LOGIN")
            )}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground border-t border-border pt-6">
          {t("Vous n'avez pas de compte ?", "Don't have an account?")}{" "}
          <Link href="/register">
            <span className="text-foreground hover:text-primary font-medium cursor-pointer underline underline-offset-4">
              {t("Créer un compte", "Create an account")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
