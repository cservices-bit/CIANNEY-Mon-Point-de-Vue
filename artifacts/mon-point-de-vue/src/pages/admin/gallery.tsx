import React from "react";
import { useListPhotos, useDeletePhoto } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2 } from "lucide-react";

export default function AdminGallery() {
  const { data: photos, isLoading, refetch } = useListPhotos();
  const deletePhoto = useDeletePhoto();

  const handleDelete = async (id: number) => {
    if (confirm("Confirmer la suppression ?")) {
      await deletePhoto.mutateAsync({ data: { id } as any });
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-foreground">Galerie</h1>
        <Button className="rounded-none"><Plus className="mr-2 h-4 w-4" /> Ajouter Photo</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos?.map((p) => (
            <div key={p.id} className="group relative aspect-square bg-muted">
              <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                <Button variant="destructive" size="icon" className="self-end rounded-none" onClick={() => handleDelete(p.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="text-white text-xs">
                  <p className="font-bold">{p.album}</p>
                  <p className="line-clamp-2">{p.caption}</p>
                </div>
              </div>
            </div>
          ))}
          {(!photos || photos.length === 0) && (
            <div className="col-span-full text-center py-12 text-muted-foreground bg-card border border-border">Aucune photo</div>
          )}
        </div>
      )}
    </div>
  );
}
