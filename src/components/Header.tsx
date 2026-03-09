import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#sluzby", label: "Služby" },
    { href: "#vozovy-park", label: "Vozový park" },
    { href: "#motocykly", label: "Motocykly" },
    { href: "#cenik", label: "Ceník" },
    { href: "#skoleni", label: "Školení řidičů" },
    { href: "#o-nas", label: "O nás" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container">
        <div className="hidden lg:flex items-center justify-end gap-6 py-2 text-sm text-muted-foreground border-b border-border">
          <a href="tel:603783358" className="flex items-center gap-2 hover:text-accent transition-colors">
            <Phone className="w-3.5 h-3.5" />
            603 783 358
          </a>
          <a href="tel:603704882" className="flex items-center gap-2 hover:text-accent transition-colors">
            <Phone className="w-3.5 h-3.5" />
            603 704 882
          </a>
          <a href="mailto:autoskola@aujezdsky.cz" className="flex items-center gap-2 hover:text-accent transition-colors">
            <Mail className="w-3.5 h-3.5" />
            autoskola@aujezdsky.cz
          </a>
        </div>
        
        <div className="flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-3">
            <div>
              <span className="font-display font-bold text-xl text-foreground">Autoškola</span>
              <span className="font-display font-bold text-xl text-accent ml-1">Aujezdský</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-accent transition-colors rounded-lg hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
          </nav>


          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-foreground/80 hover:text-accent hover:bg-secondary rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 px-4 flex flex-col gap-3">
                <a href="tel:603783358" className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  603 783 358
                </a>
                <a href="mailto:autoskola@aujezdsky.cz" className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  autoskola@aujezdsky.cz
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
