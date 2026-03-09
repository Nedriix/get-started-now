import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="font-display font-bold text-xl">A</span>
              </div>
              <div>
                <span className="font-display font-bold text-lg">Autoškola</span>
                <span className="font-display font-bold text-lg text-accent ml-1">Aujezdský</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              Jedna z prvních soukromých autoškol v Třebíči. Od roku 1990 pomáháme začínajícím řidičům.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Služby</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#sluzby" className="hover:text-accent transition-colors">Osobní automobily</a></li>
              <li><a href="#motocykly" className="hover:text-accent transition-colors">Motocykly</a></li>
              <li><a href="#sluzby" className="hover:text-accent transition-colors">Nákladní automobily</a></li>
              <li><a href="#sluzby" className="hover:text-accent transition-colors">Autobusy</a></li>
              <li><a href="#skoleni" className="hover:text-accent transition-colors">Profesní školení</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Užitečné odkazy</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#cenik" className="hover:text-accent transition-colors">Ceník</a></li>
              <li><a href="#o-nas" className="hover:text-accent transition-colors">O nás</a></li>
              <li><a href="https://www.prihlaska-do-autoskoly.cz" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Přihláška ke stažení</a></li>
              <li><a href="#kontakt" className="hover:text-accent transition-colors">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Klimentova 24<br />674 01 Třebíč</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>603 783 358, 603 704 882</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>autoskola@aujezdsky.cz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Autoškola Aujezdský. Všechna práva vyhrazena.</p>
          <p>Akreditované školící středisko č.j. KUJI 51410/2008</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
