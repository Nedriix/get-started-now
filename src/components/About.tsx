import { Users, Target, Award, Heart } from "lucide-react";

const stats = [
  { value: "1990", label: "Rok založení" },
  { value: "10 000+", label: "Absolventů" },
  { value: "35+", label: "Let zkušeností" },
  { value: "100%", label: "Spokojenost" },
];

const values = [
  {
    icon: Users,
    title: "Individuální přístup",
    desc: "Ke každému žákovi přistupujeme individuálně podle jeho potřeb a tempa učení."
  },
  {
    icon: Target,
    title: "Defenzivní jízda",
    desc: "Klademe důraz na výchovu ohleduplného a bezpečného řidiče."
  },
  {
    icon: Award,
    title: "Evropská úroveň",
    desc: "Výuku provádí mladí instruktoři na vysoké odborné evropské úrovni."
  },
  {
    icon: Heart,
    title: "Domácí prostředí",
    desc: "Kurzy probíhají ve vlastních prostorách v příjemném, téměř domácím prostředí."
  },
];

const About = () => {
  return (
    <section id="o-nas" className="py-24 bg-secondary/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
              O nás
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Autoškola s tradicí
              <span className="text-gradient"> od roku 1990</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Autoškolu AUJEZDSKÝ založil v roce 1990 Jiří Aujezdský. Tímto se řadíme mezi 
              první soukromé autoškoly v Třebíči.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Prioritou naší firmy je stálý vývoj a zkvalitnění nabízených služeb zákazníkovi, 
              o čemž svědčí více než 10 000 spokojených uchazečů. Svoji velikostí a druhem 
              poskytovaných výcviků zaujímáme přední místo v oboru.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-card rounded-xl card-shadow">
                  <div className="text-2xl md:text-3xl font-display font-bold text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl hero-gradient p-1">
              <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl hero-gradient flex items-center justify-center">
                    <span className="text-primary-foreground font-display font-bold text-4xl">A</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    Autoškola Aujezdský
                  </h3>
                  <p className="text-muted-foreground">
                    Akreditované školící středisko
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 hero-gradient rounded-full blur-3xl opacity-20" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 card-shadow hover:elevated-shadow transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <value.icon className="w-7 h-7 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
              <p className="text-muted-foreground text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
