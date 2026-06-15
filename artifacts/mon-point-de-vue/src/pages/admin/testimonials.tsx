import React from "react";
import { useListTestimonials, useDeleteTestimonial } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

export default function AdminTestimonials() {
  const { data: testimonials, isLoading, refetch } = useListTestimonials();
  const deleteTestimonial = useDeleteTestimonial();

  const handleDelete = async (id: number) => {
    if (confirm("Confirmer la suppression ?")) {
      await deleteTestimonial.mutateAsync({ data: { id } as any });
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-foreground">Témoignages</h1>
      <div className="bg-card border border-border">
        {isLoading ? (
          <div className="p-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Auteur</TableHead>
                <TableHead>Contenu</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials?.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.authorName}</TableCell>
                  <TableCell className="max-w-xs truncate">{t.content}</TableCell>
                  <TableCell>{t.status}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(t.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!testimonials || testimonials.length === 0) && (
                <TableRow><TableCell colSpan={4} className="text-center py-4">Aucun témoignage</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
