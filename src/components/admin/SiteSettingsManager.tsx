import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';

export default function SiteSettingsManager() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [courseText, setCourseText] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['site_settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const item = data?.find((d) => d.key === 'next_course_text');
    if (item) setCourseText(item.value);
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key: 'next_course_text', value: courseText }, { onConflict: 'key' });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['site_settings'] });
      toast({ title: 'Nastavení uloženo' });
    },
    onError: (e: Error) => toast({ title: 'Chyba', description: e.message, variant: 'destructive' }),
  });

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Nastavení webu</CardTitle>
          <CardDescription>Upravte texty zobrazované na hlavní stránce.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Text o nejbližším kurzu (banner v úvodu)</Label>
            <div className="flex gap-2">
              <Input
                value={courseText}
                onChange={(e) => setCourseText(e.target.value)}
                placeholder="např. 🚗 Nejbližší kurz začíná 1.4. 2026 v 15:00"
                className="flex-1"
              />
              <Button onClick={() => save.mutate()} disabled={save.isPending}>
                {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                <span className="ml-1.5">Uložit</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Pokud pole necháte prázdné, banner se na webu nezobrazí.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
