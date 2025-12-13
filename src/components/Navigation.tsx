import { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';

interface NavigationProps {
  onSoundToggle: () => void;
  isSoundEnabled: boolean;
}

const Navigation = ({ onSoundToggle, isSoundEnabled }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Índice', href: '#index' },
    { label: 'Identidade', href: '#identity' },
    { label: 'Aplicação', href: '#application' },
    { label: 'Downloads', href: '#downloads' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Navigation */}
      <nav
        className={`fixed top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 z-50 transition-all duration-500 ${
          isScrolled ? 'top-3 md:top-4' : ''
        }`}
      >
        <div className="glass rounded-2xl px-4 py-3 md:px-6 md:py-4 flex items-center justify-between shadow-soft">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="font-heading font-semibold text-lg md:text-xl tracking-tight text-foreground hover:text-accent transition-colors duration-300"
          >
            SENSORIAL
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            {/* Sound Toggle */}
            <button
              onClick={onSoundToggle}
              className="p-2 rounded-lg hover:bg-secondary transition-colors duration-300"
              aria-label={isSoundEnabled ? 'Desativar som' : 'Ativar som'}
            >
              {isSoundEnabled ? (
                <Volume2 className="w-4 h-4 text-accent" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onSoundToggle}
              className="p-2 rounded-lg hover:bg-secondary transition-colors duration-300"
              aria-label={isSoundEnabled ? 'Desativar som' : 'Ativar som'}
            >
              {isSoundEnabled ? (
                <Volume2 className="w-4 h-4 text-accent" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors duration-300"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="menu-overlay animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-20 left-4 right-4 z-50 glass rounded-2xl p-6 animate-scale-in">
            <div className="flex flex-col gap-4">
              {menuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="text-lg font-medium text-foreground py-2 border-b border-border/50 last:border-0 transition-colors duration-300 active:text-accent"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
