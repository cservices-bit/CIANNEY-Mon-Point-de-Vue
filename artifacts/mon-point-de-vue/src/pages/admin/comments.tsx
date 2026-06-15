import React from "react";
import { useListComments, useDeleteComment } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

export default function AdminComments() {
  const { data: comments, isLoading, refetch } = useListComments();
  const deleteComment = useDeleteComment();

  const handleDelete = async (id: number) => {
    if (confirm("Confirmer la suppression ?")) {
      await deleteComment.mutateAsync({ data: { id } as any });
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-foreground">Commentaires</h1>
      
      <div className="bg-card border border-border">
        {isLoading ? (
          <div className="p-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
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
              {comments?.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.authorName}</TableCell>
                  <TableCell className="max-w-xs truncate">{c.content}</TableCell>
                  <TableCell><span className="uppercase text-xs font-bold">{c.status}</span></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(c.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!comments || comments.length === 0) && (
                <TableRow><TableCell colSpan={4} className="text-center py-4">Aucun commentaire</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
