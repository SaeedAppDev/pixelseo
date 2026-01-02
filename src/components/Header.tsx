import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';
import pixelSeoLogo from '@/assets/pixelseo-logo-v3.png';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header 
      className="bg-card/80 backdrop-blur-lg rounded-2xl p-4 md:p-5 mb-6 shadow-lg border border-border/50 animate-fade-in sticky top-4 z-50"
      itemScope 
      itemType="https://schema.org/WPHeader"
    >
      <div className="flex items-center justify-between">
        {/* Logo with proper schema markup */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group"
          itemScope 
          itemType="https://schema.org/Organization"
          itemProp="publisher"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:bg-primary/30 transition-colors" />
            <img 
              src={pixelSeoLogo} 
              alt="PixelSEO Logo - AI Image Optimizer" 
              className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl shadow-lg group-hover:scale-105 transition-transform"
              itemProp="logo"
              width="48"
              height="48"
            />
          </div>
          <div>
            <span 
              className="text-xl md:text-2xl font-bold text-foreground tracking-tight"
              itemProp="name"
            >
              Pixel<span className="text-primary">SEO</span>
            </span>
            <p className="text-xs text-muted-foreground hidden sm:block">
              AI Image Optimizer
            </p>
            <meta itemProp="url" content="https://www.pixelseo.net" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav 
          className="hidden md:flex items-center gap-1" 
          itemScope 
          itemType="https://schema.org/SiteNavigationElement"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              itemProp="url"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === link.href
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <span itemProp="name">{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl hover:bg-secondary"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-xl"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav 
          className="md:hidden mt-4 pt-4 border-t border-border animate-fade-in"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
