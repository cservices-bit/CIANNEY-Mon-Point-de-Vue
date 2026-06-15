import React from "react";
import { useListPartners, useDeletePartner } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2 } from "lucide-react";

export default function AdminPartners() {
  const { data: partners, isLoading, refetch } = useListPartners();
  const deletePartner = useDeletePartner();

  const handleDelete = async (id: number) => {
    if (confirm("Confirmer la suppression ?")) {
      await deletePartner.mutateAsync({ data: { id } as any });
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-foreground">Partenaires</h1>
        <Button className="rounded-none"><Plus className="mr-2 h-4 w-4" /> Nouveau</Button>
      </div>

      <div className="bg-card border border-border">
        {isLoading ? (
          <div className="p-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Site web</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners?.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="uppercase text-xs">{p.type}</TableCell>
                  <TableCell>{p.website}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!partners || partners.length === 0) && (
                <TableRow><TableCell colSpan={4} className="text-center py-4">Aucun partenaire</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
