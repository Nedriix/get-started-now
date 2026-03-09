import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Category = Tables<'pricing_categories'>;
type Item = Tables<'pricing_items'>;

// --- Category Dialog ---
function CategoryDialog({
  open,
  onClose,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  initial?: Category | null;
}) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [name, setName] = useState(initial?.name ?? '');
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0));

  const save = useMutation({
    mutationFn: async () => {
      const payload = { name, sort_order: Number(sortOrder) };
      if (initial) {
        const { error } = await supabase.from('pricing_categories').update(payload).eq('id', initial.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('pricing_categories').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['pricing_categories'] });
      toast({ title: initial ? 'Kategorie upravena' : 'Kategorie přidána' });
      onClose();
    },
    onError: (e: Error) => toast({ title: 'Chyba', description: e.message, variant: 'destructive' }),
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? 'Upravit kategorii' : 'Přidat kategorii'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Název</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Např. Kurzy autoškoly" />
          </div>
          <div className="space-y-2">
            <Label>Pořadí</Label>
            <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Zrušit</Button>
          <Button onClick={() => save.mutate()} disabled={save.isPending || !name.trim()}>
            {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Uložit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --- Item Dialog ---
function ItemDialog({
  open,
  onClose,
  initial,
  categories,
}: {
  open: boolean;
  onClose: () => void;
  initial?: Item | null;
  categories: Category[];
}) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [name, setName] = useState(initial?.name ?? '');
  const [price, setPrice] = useState(initial?.price ?? '');
  const [details, setDetails] = useState(initial?.details ?? '');
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [categoryId, setCategoryId] = useState(initial?.category_id ?? (categories[0]?.id ?? ''));
  const [sortOrder, setSortOrder] = useState(String(initial?.sort_order ?? 0));

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        name,
        price,
        details: details || null,
        featured,
        category_id: categoryId,
        sort_order: Number(sortOrder),
      };
      if (initial) {
        const { error } = await supabase.from('pricing_items').update(payload).eq('id', initial.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('pricing_items').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['pricing_items'] });
      toast({ title: initial ? 'Položka upravena' : 'Položka přidána' });
      onClose();
    },
    onError: (e: Error) => toast({ title: 'Chyba', description: e.message, variant: 'destructive' }),
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initial ? 'Upravit položku' : 'Přidat položku'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Kategorie</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Vyberte kategorii" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Název</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Např. Kurz skupiny B" />
          </div>
          <div className="space-y-2">
            <Label>Cena</Label>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Např. 12 900 Kč" />
          </div>
          <div className="space-y-2">
            <Label>Popis (volitelný)</Label>
            <Textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Podrobnosti o kurzu..." rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Pořadí</Label>
              <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
            </div>
            <div className="flex items-end gap-2 pb-1">
              <Switch checked={featured} onCheckedChange={setFeatured} id="featured" />
              <Label htmlFor="featured">Zvýraznit</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Zrušit</Button>
          <Button onClick={() => save.mutate()} disabled={save.isPending || !name.trim() || !price.trim() || !categoryId}>
            {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Uložit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --- Main Component ---
export default function PricingManager() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [catDialog, setCatDialog] = useState<{ open: boolean; item?: Category | null }>({ open: false });
  const [itemDialog, setItemDialog] = useState<{ open: boolean; item?: Item | null }>({ open: false });

  const { data: categories = [], isLoading: cLoading } = useQuery({
    queryKey: ['pricing_categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('pricing_categories').select('*').order('sort_order');
      if (error) throw error;
      return data as Category[];
    },
  });

  const { data: items = [], isLoading: iLoading } = useQuery({
    queryKey: ['pricing_items'],
    queryFn: async () => {
      const { data, error } = await supabase.from('pricing_items').select('*').order('sort_order');
      if (error) throw error;
      return data as Item[];
    },
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('pricing_categories').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['pricing_categories'] });
      qc.invalidateQueries({ queryKey: ['pricing_items'] });
      toast({ title: 'Kategorie smazána' });
    },
    onError: (e: Error) => toast({ title: 'Chyba', description: e.message, variant: 'destructive' }),
  });

  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('pricing_items').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['pricing_items'] });
      toast({ title: 'Položka smazána' });
    },
    onError: (e: Error) => toast({ title: 'Chyba', description: e.message, variant: 'destructive' }),
  });

  if (cLoading || iLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Kategorie ceníku</CardTitle>
          <Button size="sm" onClick={() => setCatDialog({ open: true, item: null })}>
            <Plus className="h-4 w-4 mr-1" /> Přidat kategorii
          </Button>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-muted-foreground text-sm">Žádné kategorie.</p>
          ) : (
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                  <div>
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-muted-foreground text-sm ml-2">— pořadí {cat.sort_order}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => setCatDialog({ open: true, item: cat })}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => { if (confirm('Smazat kategorii?')) deleteCategory.mutate(cat.id); }}
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

      {/* Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Položky ceníku</CardTitle>
          <Button size="sm" onClick={() => setItemDialog({ open: true, item: null })} disabled={categories.length === 0}>
            <Plus className="h-4 w-4 mr-1" /> Přidat položku
          </Button>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-muted-foreground text-sm">Žádné položky.</p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => {
                const cat = categories.find((c) => c.id === item.category_id);
                return (
                  <div key={item.id} className="flex items-start justify-between p-3 rounded-lg border bg-card gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{item.name}</span>
                        {item.featured && <Badge variant="secondary">Zvýrazněno</Badge>}
                        {cat && <Badge variant="outline" className="text-xs">{cat.name}</Badge>}
                      </div>
                      <div className="text-primary font-semibold text-sm mt-0.5">{item.price}</div>
                      {item.details && <div className="text-muted-foreground text-xs mt-0.5 truncate">{item.details}</div>}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="icon" variant="ghost" onClick={() => setItemDialog({ open: true, item })}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => { if (confirm('Smazat položku?')) deleteItem.mutate(item.id); }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <CategoryDialog
        key={catDialog.item?.id ?? 'new-cat'}
        open={catDialog.open}
        onClose={() => setCatDialog({ open: false })}
        initial={catDialog.item}
      />
      <ItemDialog
        key={itemDialog.item?.id ?? 'new-item'}
        open={itemDialog.open}
        onClose={() => setItemDialog({ open: false })}
        initial={itemDialog.item}
        categories={categories}
      />
    </div>
  );
}
