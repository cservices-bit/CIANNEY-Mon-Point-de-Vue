import React from "react";
import { useListContactMessages } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function AdminMessages() {
  const { data: messages, isLoading } = useListContactMessages();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-foreground">Messages Contact</h1>
      <div className="bg-card border border-border">
        {isLoading ? (
          <div className="p-8 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>De</TableHead>
                <TableHead>Sujet</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Lu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages?.map((m) => (
                <TableRow key={m.id} className={m.read ? "opacity-70" : "font-semibold"}>
                  <TableCell>{format(new Date(m.createdAt), "dd/MM/yyyy")}</TableCell>
                  <TableCell>{m.name} ({m.email})</TableCell>
                  <TableCell>{m.subject}</TableCell>
                  <TableCell className="uppercase text-xs">{m.type}</TableCell>
                  <TableCell>{m.read ? "Oui" : "Non"}</TableCell>
                </TableRow>
              ))}
              {(!messages || messages.length === 0) && (
                <TableRow><TableCell colSpan={5} className="text-center py-4">Aucun message</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
