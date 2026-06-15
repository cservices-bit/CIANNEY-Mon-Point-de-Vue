import React from "react";
import { useListGuestbook } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function AdminGuestbook() {
  const { data: entries, isLoading } = useListGuestbook();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-foreground">Livre d'or</h1>
      <div className="bg-card border border-border">
        {isLoading ? (
          <div className="p-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Pays</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Approuvé</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries?.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{format(new Date(e.createdAt), "dd/MM/yyyy")}</TableCell>
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell>{e.country || "-"}</TableCell>
                  <TableCell className="max-w-xs truncate">{e.message}</TableCell>
                  <TableCell>{e.approved ? "Oui" : "Non"}</TableCell>
                </TableRow>
              ))}
              {(!entries || entries.length === 0) && (
                <TableRow><TableCell colSpan={5} className="text-center py-4">Aucune entrée</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
