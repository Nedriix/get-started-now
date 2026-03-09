import { Shield, Radio, Target, Gauge } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Airbagové vesty",
    desc: "Jako jediná autoškola v Třebíči používáme airbagové vesty pro maximální bezpečnost."
  },
  {
    icon: Radio,
    title: "Komunikace přes intercom",
    desc: "Učitel vás doprovází na druhém motocyklu nebo ve vozidle s komunikací přes intercom."
  },
  {
    icon: Gauge,
    title: "Bez druhého ovládání",
    desc: "Jezdíte samostatně bez druhého ovládání, které by vám překáželo v řízení."
  },
  {
    icon: Target,
    title: "Soukromá cvičná plocha",
    desc: "Všechny úkony si nacvičíte na uzavřené cvičné ploše před závěrečnou zkouškou."
  }
];

const pricing = [
  { category: "AM", price: "15 490 Kč", hours: "13h" },
  { category: "A1", price: "15 490 Kč", hours: "13h" },
  { category: "A2", price: "16 490 Kč", hours: "13h" },
  { category: "A", price: "17 490 Kč", hours: "13h" },
  { category: "Rozšíření A2/A", price: "9 890 Kč", hours: "7h" },
  { category: "Doplňková zkouška", price: "7 990 Kč", hours: "-" },
];

const Motorcycles = () => {
  return (
    <section id="motocykly" className="py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
              Pro motorkáře
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Naučte se jezdit na motorce
              <span className="text-gradient"> bezpečně</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Bojíte se začít? U nás máte možnost začít na mototrenažeru Honda. 
              Po osvojení základních dovedností postoupíte k samostatné jízdě.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-card rounded-3xl p-8 card-shadow">
              <h3 className="text-2xl font-display font-bold text-foreground mb-6">
                Ceník motocyklů
              </h3>
              <div className="space-y-4">
                {pricing.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">{item.category}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Skupina {item.category}</p>
                        {item.hours !== "-" && (
                          <p className="text-sm text-muted-foreground">{item.hours} výcviku</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-display font-bold text-accent">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 accent-gradient rounded-full blur-3xl opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Motorcycles;
