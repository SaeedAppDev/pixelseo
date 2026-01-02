import { Twitter, Mail, Heart, Instagram, Facebook, Linkedin, Youtube, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import pixelSeoLogo from '@/assets/pixelseo-logo-v3.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Features', href: '/features' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Sitemap', href: '/sitemap' },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/pixelseo', label: 'Twitter/X', ariaLabel: 'Follow PixelSEO on Twitter' },
    { icon: Facebook, href: 'https://facebook.com/pixelseo', label: 'Facebook', ariaLabel: 'Follow PixelSEO on Facebook' },
    { icon: Instagram, href: 'https://instagram.com/pixelseo', label: 'Instagram', ariaLabel: 'Follow PixelSEO on Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/pixelseo', label: 'LinkedIn', ariaLabel: 'Follow PixelSEO on LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/@pixelseo', label: 'YouTube', ariaLabel: 'Subscribe to PixelSEO on YouTube' },
    { icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/>
      </svg>
    ), href: 'https://pinterest.com/pixelseo', label: 'Pinterest', ariaLabel: 'Follow PixelSEO on Pinterest' },
  ];

  return (
    <footer 
      className="bg-card rounded-xl p-6 md:p-8 mt-6 shadow-card animate-fade-in"
      itemScope 
      itemType="https://schema.org/WPFooter"
    >
      <div className="flex flex-col gap-6">
        {/* Top section */}
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-start gap-6 text-center md:text-left">
          {/* Brand with schema markup */}
          <div itemScope itemType="https://schema.org/Organization">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={pixelSeoLogo} 
                alt="PixelSEO Logo" 
                className="w-10 h-10 rounded-lg shadow-md group-hover:scale-105 transition-transform"
                itemProp="logo"
                width="40"
                height="40"
              />
              <div>
                <h3 className="font-bold text-lg text-foreground" itemProp="name">
                  Pixel<span className="text-primary">SEO</span>
                </h3>
                <p className="text-xs text-muted-foreground">AI Image Optimizer</p>
              </div>
            </Link>
            <meta itemProp="url" content="https://www.pixelseo.net" />
            
            {/* Contact Information for E-E-A-T */}
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <a 
                href="mailto:pixelseo71@gmail.com" 
                className="flex items-center gap-2 hover:text-primary transition-colors justify-center md:justify-start"
                itemProp="email"
              >
                <Mail className="w-4 h-4" />
                <span>pixelseo71@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 justify-center md:justify-start" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <MapPin className="w-4 h-4" />
                <span itemProp="addressLocality">Digital Services Worldwide</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6" aria-label="Footer navigation">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-xs text-muted-foreground font-medium">Follow Us</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label={social.ariaLabel}
                  title={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Bottom section */}
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center gap-3 text-xs text-muted-foreground text-center">
          <p>
            <span>© </span>
            <span>{currentYear}</span>
            <span> PixelSEO. All rights reserved.</span>
          </p>
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" aria-label="love" /> for better web performance
          </p>
        </div>
      </div>
    </footer>
  );
}
