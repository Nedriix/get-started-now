import { Car, Bike, Truck, Bus, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Bike,
    title: "Motocykly",
    categories: "AM, A1, A2, A",
    price: "od 15 490 Kč",
    features: [
      "Airbagové vesty pro bezpečí",
      "Jízda bez druhého ovládání",
      "Mototrenažér Honda",
      "Soukromá cvičná plocha"
    ],
    highlight: true
  },
  {
    icon: Car,
    title: "Osobní automobily",
    categories: "B, B L17",
    price: "21 990 Kč",
    features: [
      "Průběžné zahájení kurzů",
      "28 hodin jízd",
      "Vlastní prostory autoškoly",
      "Možnost B L17 od 17 let"
    ]
  },
  {
    icon: Truck,
    title: "Nákladní automobily",
    categories: "C, CE",
    price: "od 12 990 Kč",
    features: [
      "Individuální výcvik",
      "Spolupráce s Úřadem práce",
      "Rekvalifikace řidičů",
      "Souprava Iveco"
    ]
  },
  {
    icon: Bus,
    title: "Autobusy",
    categories: "D",
    price: "25 990 Kč",
    features: [
      "14 hodin jízd",
      "Profesionální výcvik",
      "Individuální přístup",
      "Kvalifikovaní instruktoři"
    ]
  },
  {
    icon: GraduationCap,
    title: "Profesní školení",
    categories: "Profesní průkaz",
    price: "1 500 Kč",
    features: [
      "Pravidelné školení 7h",
      "Vstupní školení",
      "Akreditované středisko",
      "Školení referentů"
    ]
  }
];

const Services = () => {
  return (
    <section id="sluzby" className="py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Naše služby
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Kompletní nabídka výcviku
          </h2>
          <p className="text-lg text-muted-foreground">
            Nabízíme výcvik na všechny kategorie řidičských oprávnění. 
            Od motocyklů přes osobní a nákladní automobily až po autobusy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden border-0 card-shadow hover:elevated-shadow transition-all duration-300 hover:-translate-y-1 ${
                service.highlight ? "lg:col-span-1 ring-2 ring-accent" : ""
              }`}
            >
              {service.highlight && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full accent-gradient text-accent-foreground text-xs font-semibold">
                  Novinka
                </div>
              )}
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  service.highlight ? "accent-gradient" : "bg-primary/10"
                }`}>
                  <service.icon className={`w-8 h-8 ${service.highlight ? "text-accent-foreground" : "text-primary"}`} />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{service.categories}</p>
                
                <div className="text-3xl font-display font-bold text-accent mb-6">
                  {service.price}
                </div>
                
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
