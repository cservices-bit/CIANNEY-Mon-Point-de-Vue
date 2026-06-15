import React from "react";
import { useListSubscribers } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export default function AdminNewsletter() {
  const { data: subscribers, isLoading } = useListSubscribers();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-foreground">Newsletter</h1>
      <div className="bg-card border border-border">
        {isLoading ? (
          <div className="p-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Langue</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers?.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.email}</TableCell>
                  <TableCell>{s.name || "-"}</TableCell>
                  <TableCell className="uppercase text-xs">{s.lang}</TableCell>
                  <TableCell>{s.active ? "Actif" : "Inactif"}</TableCell>
                </TableRow>
              ))}
              {(!subscribers || subscribers.length === 0) && (
                <TableRow><TableCell colSpan={4} className="text-center py-4">Aucun abonné</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
