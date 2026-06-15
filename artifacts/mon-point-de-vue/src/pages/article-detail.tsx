import React from "react";
import { Link, useRoute } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGetArticle, useListComments, useCreateComment } from "@workspace/api-client-react";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { Loader2, Share2, Heart, ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Label } from "recharts";

const commentSchema = z.object({
  authorName: z.string().min(2, "Nom trop court"),
  authorEmail: z.string().email("Email invalide"),
  content: z.string().min(5, "Commentaire trop court"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

export default function ArticleDetail() {
  const [match, params] = useRoute("/blog/:id");
  const articleId = params?.id ? parseInt(params.id, 10) : 0;
  const { t, language } = useLanguage();
  const { toast } = useToast();

  const { data: article, isLoading } = useGetArticle(articleId, {
    query: { enabled: !!articleId }
  });

  const { data: comments, refetch: refetchComments } = useListComments({ articleId, status: "approved" }, {
    query: { enabled: !!articleId }
  });

  const createComment = useCreateComment();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      authorName: "",
      authorEmail: "",
      content: "",
    },
  });

  const onSubmitComment = async (data: CommentFormValues) => {
    try {
      await createComment.mutateAsync({
        data: { ...data, articleId }
      });
      toast({
        title: t("Commentaire envoyé", "Comment sent"),
        description: t("Votre commentaire est en attente de modération.", "Your comment is pending moderation."),
      });
      form.reset();
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le commentaire",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-32 flex justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto py-32 text-center">
        <h1 className="text-3xl font-serif mb-4">Article non trouvé</h1>
        <Link href="/blog">
          <Button variant="outline">Retour au blog</Button>
        </Link>
      </div>
    );
  }

  const dateLocale = language === "fr" ? fr : enUS;

  return (
    <article className="pb-20">
      {/* Header / Cover */}
      <div className="relative w-full h-[50vh] md:h-[70vh] bg-muted">
        {article.coverImage ? (
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-card flex items-center justify-center">
            <span className="text-muted-foreground opacity-30 text-5xl font-serif">CIANNEY</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto max-w-4xl">
            <Link href="/blog">
              <span className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 mb-6 cursor-pointer transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux articles
              </span>
            </Link>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-bold tracking-wider uppercase">
                {article.category}
              </span>
              <span className="text-muted-foreground text-sm font-medium">
                {format(new Date(article.createdAt), "d MMMM yyyy", { locale: dateLocale })}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
              {article.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-muted-foreground border-t border-border/50 pt-6 mt-6">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>{article.likes || 0}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>{comments?.length || 0}</span>
              </div>
              <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Partager</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-16">
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-a:text-primary max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Comments Section */}
        <div className="mt-20 pt-10 border-t border-border">
          <h3 className="text-2xl font-serif font-bold mb-8">
            Commentaires ({comments?.length || 0})
          </h3>
          
          <div className="space-y-8 mb-12">
            {comments?.map((comment) => (
              <div key={comment.id} className="bg-card p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold">{comment.authorName}</h4>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(comment.createdAt), "d MMM yyyy", { locale: dateLocale })}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{comment.content}</p>
              </div>
            ))}
            
            {comments?.length === 0 && (
              <p className="text-muted-foreground italic">Soyez le premier à commenter.</p>
            )}
          </div>

          <div className="bg-muted/50 p-6 md:p-8 border border-border">
            <h4 className="text-xl font-serif font-bold mb-6">Laisser un commentaire</h4>
            <form onSubmit={form.handleSubmit(onSubmitComment)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="authorName">Nom</Label>
                  <Input id="authorName" {...form.register("authorName")} className="bg-background rounded-none border-border" />
                  {form.formState.errors.authorName && (
                    <p className="text-xs text-destructive">{form.formState.errors.authorName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authorEmail">Email (ne sera pas publié)</Label>
                  <Input id="authorEmail" type="email" {...form.register("authorEmail")} className="bg-background rounded-none border-border" />
                  {form.formState.errors.authorEmail && (
                    <p className="text-xs text-destructive">{form.formState.errors.authorEmail.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Message</Label>
                <Textarea 
                  id="content" 
                  {...form.register("content")} 
                  className="bg-background rounded-none border-border min-h-[120px]" 
                />
                {form.formState.errors.content && (
                  <p className="text-xs text-destructive">{form.formState.errors.content.message}</p>
                )}
              </div>
              <Button 
                type="submit" 
                disabled={form.formState.isSubmitting}
                className="rounded-none tracking-widest px-8 mt-2"
              >
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                ENVOYER
              </Button>
            </form>
          </div>
        </div>
      </div>
    </article>
  );
}
