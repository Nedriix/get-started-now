import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type NewsItem = Tables<'news'>;

function NewsDialog({ open, onClose, initial }: { open: boolean; onClose: () => void; initial?: NewsItem | null }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [title, setTitle] = useState(initial?.title ?? '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [publishDate, setPublishDate] = useState(initial?.publish_date ?? new Date().toISOString().slice(0, 10));
  const [active, setActive] = useState(initial?.active ?? true);

  const save = useMutation({
    mutationFn: async () => {
      const payload = { title, content, publish_date: publishDate, active };
      if (initial) {
        const { error } = await supabase.from('news').update(payload).eq('id', initial.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('news').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['news'] });
      toast({ title: initial ? 'Aktualita upravena' : 'Aktualita přidána' });
      onClose();
    },
    onError: (e: Error) => toast({ title: 'Chyba', description: e.message, variant: 'destructive' }),
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initial ? 'Upravit aktualitu' : 'Přidat aktualitu'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Nadpis *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Název aktuality" />
          </div>
          <div className="space-y-2">
            <Label>Obsah *</Label>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Text aktuality..." rows={5} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Datum zveřejnění</Label>
              <Input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} />
            </div>
            <div className="flex items-end gap-2 pb-1">
              <Switch checked={active} onCheckedChange={setActive} id="active" />
              <Label htmlFor="active">Aktivní</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Zrušit</Button>
          <Button onClick={() => save.mutate()} disabled={save.isPending || !title.trim() || !content.trim()}>
            {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Uložit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function NewsManager() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [dialog, setDialog] = useState<{ open: boolean; item?: NewsItem | null }>({ open: false });

  const { data: newsList = [], isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase.from('news').select('*').order('publish_date', { ascending: false });
      if (error) throw error;
      return data as NewsItem[];
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['news'] });
      toast({ title: 'Aktualita smazána' });
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
          <CardTitle>Aktuality</CardTitle>
          <Button size="sm" onClick={() => setDialog({ open: true, item: null })}>
            <Plus className="h-4 w-4 mr-1" /> Přidat aktualitu
          </Button>
        </CardHeader>
        <CardContent>
          {newsList.length === 0 ? (
            <p className="text-muted-foreground text-sm">Žádné aktuality.</p>
          ) : (
            <div className="space-y-2">
              {newsList.map((item) => (
                <div key={item.id} className="flex items-start justify-between p-3 rounded-lg border bg-card gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{item.title}</span>
                      <Badge variant={item.active ? 'default' : 'secondary'}>
                        {item.active ? 'Aktivní' : 'Skrytá'}
                      </Badge>
                      <span className="text-muted-foreground text-xs">{item.publish_date}</span>
                    </div>
                    <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1">{item.content}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="icon" variant="ghost" onClick={() => setDialog({ open: true, item })}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => { if (confirm('Smazat aktualitu?')) del.mutate(item.id); }}
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

      <NewsDialog
        key={dialog.item?.id ?? 'new'}
        open={dialog.open}
        onClose={() => setDialog({ open: false })}
        initial={dialog.item}
      />
    </div>
  );
}
