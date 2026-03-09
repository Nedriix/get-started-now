import { ArrowRight, Shield, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const { data: courseText } = useQuery({
    queryKey: ['site_settings', 'next_course_text'],
    queryFn: async () => {
      const { data } = await supabase.from('site_settings').select('value').eq('key', 'next_course_text').single();
      return data?.value ?? '';
    },
  });

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient opacity-95" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-accent" />
            Airbagové vesty pro maximální bezpečí
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Vaše cesta za
            <span className="block text-gradient mt-2">řidičským průkazem</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Od roku 1990 pomáháme začínajícím řidičům. Více než 10 000 spokojených absolventů. 
            Profesionální výcvik na osobní, nákladní automobily i motocykly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" className="accent-gradient border-0 text-accent-foreground font-semibold px-8 py-6 text-lg group">
              Přihlásit se do kurzu
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white px-8 py-6 text-lg">
              Zobrazit ceník
            </Button>
          </div>

          {courseText && (
            <div className="inline-block bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-2xl px-6 py-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <p className="text-accent font-semibold text-lg">
                {courseText}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
          {[
            { icon: Award, title: "Od roku 1990", desc: "Jedna z prvních soukromých autoškol" },
            { icon: Users, title: "10 000+ absolventů", desc: "Spokojených řidičů všech kategorií" },
            { icon: Shield, title: "Bezpečnost", desc: "Airbagové vesty pro motocyklisty" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 animate-fade-in"
              style={{ animationDelay: `${0.5 + i * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg">{item.title}</p>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
