import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="kontakt" className="py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Kontakt
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Ozvěte se nám
          </h2>
          <p className="text-lg text-muted-foreground">
            Máte dotazy? Neváhejte nás kontaktovat. Rádi vám pomůžeme s výběrem správného kurzu.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 card-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Adresa provozovny</h4>
                  <p className="text-muted-foreground">
                    Klimentova 24<br />
                    674 01 Třebíč
                  </p>
                  <p className="text-sm text-accent mt-2">Akreditované školící středisko</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 card-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Telefon</h4>
                  <a href="tel:603783358" className="block text-muted-foreground hover:text-accent transition-colors">
                    603 783 358
                  </a>
                  <a href="tel:603704882" className="block text-muted-foreground hover:text-accent transition-colors">
                    603 704 882
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 card-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">E-mail</h4>
                  <a href="mailto:autoskola@aujezdsky.cz" className="text-muted-foreground hover:text-accent transition-colors">
                    autoskola@aujezdsky.cz
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-card rounded-2xl p-6 card-shadow hover:elevated-shadow transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <Facebook className="w-6 h-6 text-[#1877F2]" />
                <span className="font-semibold text-foreground">Facebook</span>
              </a>
            </div>
          </div>

          <div className="bg-card rounded-3xl p-8 card-shadow">
            <h3 className="text-2xl font-display font-bold text-foreground mb-6">
              Napište nám
            </h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Jméno</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent outline-none transition-all"
                    placeholder="Vaše jméno"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Telefon</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent outline-none transition-all"
                    placeholder="Váš telefon"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">E-mail</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent outline-none transition-all"
                  placeholder="vas@email.cz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Zájem o kurz</label>
                <select className="w-full px-4 py-3 rounded-xl bg-secondary border-0 text-foreground focus:ring-2 focus:ring-accent outline-none transition-all">
                  <option value="">Vyberte typ kurzu</option>
                  <option value="b">Osobní automobil (B)</option>
                  <option value="b17">Osobní automobil L17 (B)</option>
                  <option value="moto">Motocykl (AM, A1, A2, A)</option>
                  <option value="c">Nákladní automobil (C, CE)</option>
                  <option value="d">Autobus (D)</option>
                  <option value="skoleni">Profesní školení</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Zpráva</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent outline-none transition-all resize-none"
                  placeholder="Vaše zpráva..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full accent-gradient border-0 text-accent-foreground font-semibold">
                Odeslat zprávu
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
