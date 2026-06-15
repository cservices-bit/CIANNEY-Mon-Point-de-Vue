import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSendContact } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(2, "Sujet requis"),
  message: z.string().min(10, "Message trop court"),
  type: z.enum(["general", "interview", "partnership", "press", "other"]).optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const sendContact = useSendContact();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      type: ContactInputType.general,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await sendContact.mutateAsync({ data });
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
          {t("Contact", "Contact")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("Pour toute demande de partenariat, interview ou question générale.", "For partnership requests, interviews, or general inquiries.")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-card border border-border p-8 text-center flex flex-col items-center">
            <Mail className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-serif text-xl font-bold mb-2">Email</h3>
            <p className="text-muted-foreground">contact@monpointdevue.com</p>
          </div>
          <div className="bg-card border border-border p-8 text-center flex flex-col items-center">
            <Phone className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-serif text-xl font-bold mb-2">Téléphone</h3>
            <p className="text-muted-foreground">+33 1 23 45 67 89</p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-card border border-border p-8 md:p-10">
          <h2 className="font-serif text-2xl font-bold mb-8">Envoyer un message</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" {...form.register("name")} className="rounded-none bg-background" />
                {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register("email")} className="rounded-none bg-background" />
                {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Type de demande</Label>
                <Select onValueChange={(val) => form.setValue("type", val as ContactInputType)} defaultValue={form.getValues("type")}>
                  <SelectTrigger className="rounded-none bg-background">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ContactInputType.general}>Question générale</SelectItem>
                    <SelectItem value={ContactInputType.partnership}>Partenariat</SelectItem>
                    <SelectItem value={ContactInputType.interview}>Interview</SelectItem>
                    <SelectItem value={ContactInputType.press}>Presse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input id="subject" {...form.register("subject")} className="rounded-none bg-background" />
                {form.formState.errors.subject && <p className="text-xs text-destructive">{form.formState.errors.subject.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" {...form.register("message")} className="min-h-[150px] rounded-none bg-background" />
              {form.formState.errors.message && <p className="text-xs text-destructive">{form.formState.errors.message.message}</p>}
            </div>

            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full rounded-none tracking-widest font-bold">
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              ENVOYER LE MESSAGE
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
