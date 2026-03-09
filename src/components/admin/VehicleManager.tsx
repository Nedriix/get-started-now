import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2, X } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Vehicle = Tables<'vehicles'>;

function VehicleDialog({ open, onClose, initial }: { open: boolean; onClose: () => void; initial?: Vehicle | null }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [name, setName] = useState(initial?.name ?? '');
  const [type, setType] = useState(initial?.type ?? '');
  const [category, setCategory] = useState(initial?.category ?? '');
  const [badge, setBadge] = useState(initial?.badge ?? '');
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [highlight, setHighlight] = useState(initial?.highlight ?? false);
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0));
  const [featuresStr, setFeaturesStr] = useState((initial?.features ?? []).join(', '));
  const [groupsStr, setGroupsStr] = useState((initial?.groups ?? []).join(', '));

  const save = useMutation({
    mutationFn: async () => {
      let finalImageUrl = imageUrl;
      
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('vehicle-images')
          .upload(fileName, imageFile);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('vehicle-images')
          .getPublicUrl(fileName);
          
        finalImageUrl = publicUrl;
      }

      const payload = {
        name,
        type,
        category,
        badge: badge || null,
        image_url: finalImageUrl || null,
        highlight,
        sort_order: Number(sortOrder),
        features: featuresStr.split(',').map((s) => s.trim()).filter(Boolean),
        groups: groupsStr.split(',').map((s) => s.trim()).filter(Boolean),
      };
      if (initial) {
        const { error } = await supabase.from('vehicles').update(payload).eq('id', initial.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('vehicles').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['vehicles'] });
      toast({ title: initial ? 'Vozidlo upraveno' : 'Vozidlo přidáno' });
      onClose();
    },
    onError: (e: Error) => toast({ title: 'Chyba', description: e.message, variant: 'destructive' }),
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? 'Upravit vozidlo' : 'Přidat vozidlo'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Název *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Škoda Octavia" />
            </div>
            <div className="space-y-2">
              <Label>Typ *</Label>
              <Input value={type} onChange={(e) => setType(e.target.value)} placeholder="Osobní vozidlo" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kategorie *</Label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="B" />
            </div>
            <div className="space-y-2">
              <Label>Odznak (volitelný)</Label>
              <Input value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="Nové" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Obrázek vozidla</Label>
            {imageUrl || imageFile ? (
              <div className="relative w-full max-w-[200px] h-32 border rounded-md overflow-hidden bg-secondary/50 flex items-center justify-center">
                <img 
                  src={imageFile ? URL.createObjectURL(imageFile) : imageUrl} 
                  alt="Náhled" 
                  className="w-full h-full object-contain"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => {
                    setImageUrl('');
                    setImageFile(null);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <Input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
              />
            )}
          </div>
          <div className="space-y-2">
            <Label>Výbava (čárkou oddělené)</Label>
            <Input value={featuresStr} onChange={(e) => setFeaturesStr(e.target.value)} placeholder="Klimatizace, ABS, ESP" />
          </div>
          <div className="space-y-2">
            <Label>Skupiny (čárkou oddělené)</Label>
            <Input value={groupsStr} onChange={(e) => setGroupsStr(e.target.value)} placeholder="B, B+E" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Pořadí</Label>
              <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
            </div>
            <div className="flex items-end gap-2 pb-1">
              <Switch checked={highlight} onCheckedChange={setHighlight} id="highlight" />
              <Label htmlFor="highlight">Zvýraznit</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Zrušit</Button>
          <Button onClick={() => save.mutate()} disabled={save.isPending || !name.trim() || !type.trim() || !category.trim()}>
            {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Uložit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function VehicleManager() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [dialog, setDialog] = useState<{ open: boolean; item?: Vehicle | null }>({ open: false });

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data, error } = await supabase.from('vehicles').select('*').order('sort_order');
      if (error) throw error;
      return data as Vehicle[];
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('vehicles').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['vehicles'] });
      toast({ title: 'Vozidlo smazáno' });
    },
    onError: (e: Error) => toast({ title: 'Chyba', description: e.message, variant: 'destructive' }),
  });

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Vozový park</CardTitle>
          <Button size="sm" onClick={() => setDialog({ open: true, item: null })}>
            <Plus className="h-4 w-4 mr-1" /> Přidat vozidlo
          </Button>
        </CardHeader>
        <CardContent>
          {vehicles.length === 0 ? (
            <p className="text-muted-foreground text-sm">Žádná vozidla.</p>
          ) : (
            <div className="space-y-2">
              {vehicles.map((v) => (
                <div key={v.id} className="flex items-center justify-between p-3 rounded-lg border bg-card gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{v.name}</span>
                      <Badge variant="outline" className="text-xs">{v.category}</Badge>
                      <span className="text-muted-foreground text-sm">{v.type}</span>
                      {v.badge && <Badge>{v.badge}</Badge>}
                      {v.highlight && <Badge variant="secondary">Zvýrazněno</Badge>}
                    </div>
                    {v.features.length > 0 && (
                      <div className="text-muted-foreground text-xs mt-0.5 truncate">{v.features.join(', ')}</div>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="icon" variant="ghost" onClick={() => setDialog({ open: true, item: v })}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => { if (confirm(`Smazat vozidlo "${v.name}"?`)) del.mutate(v.id); }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <VehicleDialog
        key={dialog.item?.id ?? 'new'}
        open={dialog.open}
        onClose={() => setDialog({ open: false })}
        initial={dialog.item}
      />
    </div>
  );
}
