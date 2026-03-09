import { FileText, Clock, Award, CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Training = () => {
  return (
    <section id="skoleni" className="py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
              Pro profesionály
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Školení řidičů
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Jsme <strong>1. akreditované školící středisko v Třebíči</strong> ke zdokonalování 
              odborné způsobilosti řidičů podle zák. 247/2000 Sb.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Vstupní školení</h4>
                  <p className="text-sm text-muted-foreground">140 nebo 280 hodin</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Pravidelné školení</h4>
                  <p className="text-sm text-muted-foreground">35 hodin / 5 let</p>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-accent" />
                <h4 className="font-semibold text-foreground">Cena školení</h4>
              </div>
              <p className="text-muted-foreground mb-2">
                <strong className="text-foreground">Pravidelné školení:</strong> 990,- Kč s DPH/osoba
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Vstupní školení:</strong> individuální domluva
              </p>
            </div>
          </div>

          <div>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="who" className="bg-card rounded-xl border-0 card-shadow px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Kdo musí na školení?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Řidič, pokud řídí motorové vozidlo skupiny C, C+E, D a D+E nebo podskupiny C1, C1+E, D1 a D1+E.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="exempt" className="bg-card rounded-xl border-0 card-shadow px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Kdo nemusí na školení?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <ul className="space-y-2">
                    <li>• Vozidla s max. rychlostí do 45 km/h</li>
                    <li>• Vozidla ozbrojených sil, policie, celní správy</li>
                    <li>• Vozidla hasičů a záchranné služby</li>
                    <li>• Vozidla ve zkušebním provozu</li>
                    <li>• Vozidla pro vlastní potřebu</li>
                    <li>• Zemědělské a lesnické traktory</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="how" className="bg-card rounded-xl border-0 card-shadow px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Jak se přihlásit?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Podejte písemnou žádost e-mailem na <strong>autoskola@aujezdsky.cz</strong> nebo 
                  poštou na adresu školicího střediska. Po přijetí žádosti vás budeme kontaktovat 
                  k ověření údajů a informování o nejbližším kurzu.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="validity" className="bg-card rounded-xl border-0 card-shadow px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Platnost profesní způsobilosti
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Profesní způsobilost má platnost <strong>5 let</strong>. Zapisuje se do řidičského průkazu 
                  formou harmonizačního kódu 95.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 p-6 bg-primary rounded-2xl text-primary-foreground">
              <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Přihláška ke stažení</h4>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Stáhněte si formulář přihlášky do autoškoly včetně lékařského posudku.
                  </p>
                  <a 
                    href="https://www.prihlaska-do-autoskoly.cz" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
                  >
                    prihlaska-do-autoskoly.cz →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Training;
