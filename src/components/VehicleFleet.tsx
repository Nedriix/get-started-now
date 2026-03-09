import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Vehicle = Tables<"vehicles">;

const VehicleFleet = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as Vehicle[];
    },
  });

  // Generate unique filter categories from the DB data
  const uniqueCategories = Array.from(new Set(vehicles.map((v) => v.category)));
  const filterTabs = [
    { id: "all", label: "Vše" },
    ...uniqueCategories.map((c) => ({ id: c, label: c })),
  ];

  const filtered =
    activeCategory === "all"
      ? vehicles
      : vehicles.filter((v) => v.category === activeCategory);

  return (
    <section id="vozovy-park" className="py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Vozový park
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Moderní výcviková technika
          </h2>
          <p className="text-lg text-muted-foreground">
            Pro výcvik používáme moderní soudobou automobilovou a motocyklovou techniku.
            Disponujeme dostatečným množstvím vozidel na všechny skupiny.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Filter tabs */}
            {filterTabs.length > 1 && (
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {filterTabs.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200",
                      activeCategory === cat.id
                        ? "accent-gradient text-accent-foreground shadow-md"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}

            {/* Vehicle cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={cn(
                    "group bg-card rounded-2xl overflow-hidden card-shadow hover:elevated-shadow transition-all duration-300 hover:-translate-y-1",
                    vehicle.highlight && "ring-2 ring-accent"
                  )}
                >
                  {/* Image area */}
                  <div className="relative bg-secondary/50 h-52 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={vehicle.image_url ?? "/placeholder.svg"}
                      alt={vehicle.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    {vehicle.badge && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full accent-gradient text-accent-foreground text-xs font-semibold">
                        {vehicle.badge}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      {vehicle.type}
                    </p>
                    <h3 className="text-xl font-display font-bold text-foreground mb-3">
                      {vehicle.name}
                    </h3>

                    {/* Group badges */}
                    {vehicle.groups.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vehicle.groups.map((g) => (
                          <span
                            key={g}
                            className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold"
                          >
                            sk. {g}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Features */}
                    {vehicle.features.length > 0 && (
                      <ul className="space-y-2">
                        {vehicle.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Trenažér callout */}
        <div className="mt-12 bg-primary rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-primary-foreground">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 text-4xl">
              🏍️
            </div>
            <div>
              <h3 className="text-xl font-display font-bold mb-1">
                Honda Mototrenažér
              </h3>
              <p className="text-primary-foreground/80">
                Pro začátečníky nabízíme výcvik na mototrenažeru Honda – nejdřív si osvojíte základní dovednosti, pak teprve na silnici.
              </p>
            </div>
          </div>
          <span className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm font-semibold whitespace-nowrap">
            Pouze u nás v Třebíči
          </span>
        </div>
      </div>
    </section>
  );
};

export default VehicleFleet;
