import { Github, Twitter, Mail, Heart } from 'lucide-react';
import pixelSeoLogo from '@/assets/pixelseo-logo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Features', href: '#features' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Privacy', href: '#privacy' },
    { name: 'Terms', href: '#terms' },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Mail, href: 'mailto:contact@pixelseo.com', label: 'Email' },
  ];

  return (
    <footer className="bg-card rounded-xl p-6 md:p-8 mt-6 shadow-card animate-fade-in">
      <div className="flex flex-col gap-6">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img 
              src={pixelSeoLogo} 
              alt="PixelSEO Logo" 
              className="w-10 h-10 rounded-lg shadow-md"
            />
            <div>
              <h3 className="font-bold text-lg text-foreground">PixelSEO</h3>
              <p className="text-xs text-muted-foreground">AI-Powered Image Optimizer</p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-4 md:gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 text-xs text-muted-foreground">
          <p>© {currentYear} PixelSEO. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for better web performance
          </p>
        </div>
      </div>
    </footer>
  );
}
