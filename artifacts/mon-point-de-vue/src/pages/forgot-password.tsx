import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotSchema = z.object({
  email: z.string().email("Email invalide"),
});

export default function ForgotPassword() {
  const form = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" }
  });

  const onSubmit = (data: any) => {
    alert("Fonctionnalité de réinitialisation à implémenter : " + data.email);
  };

  return (
    <div className="container max-w-md mx-auto py-24 px-4">
      <div className="bg-card border border-border p-8 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
        <h1 className="font-serif text-3xl font-bold mb-2 text-center text-foreground">
          Mot de passe oublié
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Entrez votre email pour recevoir un lien de réinitialisation.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input {...form.register("email")} className="rounded-none" />
          </div>
          <Button type="submit" className="w-full rounded-none tracking-widest">
            ENVOYER LE LIEN
          </Button>
        </form>

        <div className="mt-8 text-center text-sm">
          <Link href="/login">
            <span className="text-foreground hover:text-primary cursor-pointer underline">Retour à la connexion</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
