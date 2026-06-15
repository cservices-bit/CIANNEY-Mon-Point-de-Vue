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

const registerSchema = z.object({
  name: z.string().min(2, "Le nom est trop court"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const { register } = useAuth();
  const { t } = useLanguage();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await register(data);
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
            {t("Inscription", "Register")}
          </h1>
          <p className="text-muted-foreground">
            {t("Rejoignez la communauté CIANNEY", "Join the CIANNEY community")}
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t("Nom complet", "Full Name")}</Label>
            <Input
              id="name"
              className="rounded-none border-border focus-visible:ring-primary bg-background"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

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
            <Label htmlFor="password">{t("Mot de passe", "Password")}</Label>
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
              t("S'INSCRIRE", "REGISTER")
            )}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground border-t border-border pt-6">
          {t("Vous avez déjà un compte ?", "Already have an account?")}{" "}
          <Link href="/login">
            <span className="text-foreground hover:text-primary font-medium cursor-pointer underline underline-offset-4">
              {t("Se connecter", "Log in")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
