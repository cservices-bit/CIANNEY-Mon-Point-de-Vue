import React from "react";
import { useListEvents, useDeleteEvent } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2, Edit } from "lucide-react";
import { format } from "date-fns";

export default function AdminEvents() {
  const { data: events, isLoading, refetch } = useListEvents();
  const deleteEvent = useDeleteEvent();

  const handleDelete = async (id: number) => {
    if (confirm("Confirmer la suppression ?")) {
      await deleteEvent.mutateAsync({ data: { id } as any });
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-foreground">Événements</h1>
        <Button className="rounded-none"><Plus className="mr-2 h-4 w-4" /> Nouvel Événement</Button>
      </div>

      <div className="bg-card border border-border">
        {isLoading ? (
          <div className="p-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Lieu</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events?.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.title}</TableCell>
                  <TableCell className="uppercase text-xs">{e.type}</TableCell>
                  <TableCell>{format(new Date(e.date), "dd/MM/yyyy HH:mm")}</TableCell>
                  <TableCell>{e.location}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-muted-foreground"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(e.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!events || events.length === 0) && (
                <TableRow><TableCell colSpan={5} className="text-center py-4">Aucun événement</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
