import { Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Category = Tables<"pricing_categories">;
type Item = Tables<"pricing_items">;

const Pricing = () => {
  const { data: categories = [], isLoading: cLoading } = useQuery({
    queryKey: ["pricing_categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pricing_categories")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as Category[];
    },
  });

  const { data: items = [], isLoading: iLoading } = useQuery({
    queryKey: ["pricing_items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pricing_items")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as Item[];
    },
  });

  const isLoading = cLoading || iLoading;

  return (
    <section id="cenik" className="py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Ceník
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Transparentní ceny
          </h2>
          <p className="text-lg text-muted-foreground">
            Žádné skryté poplatky. Ceny zahrnují veškeré náklady na výcvik včetně učebních materiálů.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const catItems = items.filter((i) => i.category_id === category.id);
              return (
                <Card key={category.id} className="border-0 card-shadow bg-card">
                  <CardHeader className="pb-4">
                    <h3 className="text-xl font-display font-bold text-foreground">
                      {category.name}
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {catItems.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-xl transition-all ${
                          item.featured
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary hover:bg-secondary/80"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-accent" />
                            <span className="font-semibold">{item.name}</span>
                          </div>
                          <span className="font-display font-bold text-accent">
                            {item.price}
                          </span>
                        </div>
                        {item.details && (
                          <p
                            className={`text-sm pl-7 ${
                              item.featured
                                ? "text-primary-foreground/80"
                                : "text-muted-foreground"
                            }`}
                          >
                            {item.details}
                          </p>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="mt-16 bg-card rounded-3xl p-8 md:p-12 card-shadow">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                Bude vám 17 let? 🎉
              </h3>
              <p className="text-lg text-muted-foreground">
                Udělejte si u nás řidičák B-L17! Neváhejte a přihlaste se ještě dnes.
              </p>
            </div>
            <Button
              size="lg"
              className="accent-gradient border-0 text-accent-foreground font-semibold px-8 whitespace-nowrap"
            >
              Zjistit více o B L17
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
