import { Mail, Heart, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import pixelSeoLogo from '@/assets/pixelseo-logo-v3.png';

// Custom social icon components
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
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
    { icon: TwitterIcon, href: 'https://twitter.com/pixelseo', label: 'Twitter/X' },
    { icon: FacebookIcon, href: 'https://facebook.com/pixelseo', label: 'Facebook' },
    { icon: InstagramIcon, href: 'https://instagram.com/pixelseo', label: 'Instagram' },
    { icon: LinkedInIcon, href: 'https://linkedin.com/company/pixelseo', label: 'LinkedIn' },
    { icon: YouTubeIcon, href: 'https://youtube.com/@pixelseo', label: 'YouTube' },
    { icon: PinterestIcon, href: 'https://pinterest.com/pixelseo', label: 'Pinterest' },
    { icon: TikTokIcon, href: 'https://tiktok.com/@pixelseo', label: 'TikTok' },
  ];

  return (
    <footer 
      className="bg-card rounded-xl p-4 md:p-8 mt-6 shadow-card animate-fade-in"
      itemScope 
      itemType="https://schema.org/WPFooter"
    >
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 mb-6">
        {/* Left Column - Brand & Contact */}
        <div itemScope itemType="https://schema.org/Organization" className="text-center md:text-left">
          <Link to="/" className="inline-flex items-center gap-3 group mb-4">
            <img 
              src={pixelSeoLogo} 
              alt="PixelSEO Logo" 
              className="w-9 h-9 md:w-10 md:h-10 rounded-lg shadow-md group-hover:scale-105 transition-transform"
              itemProp="logo"
              width="40"
              height="40"
            />
            <div className="text-left">
              <h3 className="font-bold text-base md:text-lg text-foreground" itemProp="name">
                Pixel<span className="text-primary">SEO</span>
              </h3>
              <p className="text-xs text-muted-foreground">AI Image Optimizer</p>
            </div>
          </Link>
          <meta itemProp="url" content="https://www.pixelseo.net" />
          
          {/* Contact Information */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <a 
              href="mailto:pixelseo71@gmail.com" 
              className="flex items-center justify-center md:justify-start gap-2 hover:text-primary transition-colors"
              itemProp="email"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span className="text-xs md:text-sm">pixelseo71@gmail.com</span>
            </a>
            <a 
              href="tel:+18166178389" 
              className="flex items-center justify-center md:justify-start gap-2 hover:text-primary transition-colors"
              itemProp="telephone"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span className="text-xs md:text-sm">+1 (816) 617-8389</span>
            </a>
            <div className="flex items-center justify-center md:justify-start gap-2" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <MapPin className="w-4 h-4 shrink-0" />
              <span itemProp="addressLocality" className="text-xs md:text-sm">Digital Services Worldwide</span>
            </div>
          </div>
        </div>

        {/* Center Column - Navigation Links */}
        <nav className="md:col-span-1" aria-label="Footer navigation">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 md:gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Right Column - Social Links */}
        <div className="flex flex-col items-center md:items-end">
          <p className="text-sm font-medium text-foreground mb-3">Follow Us</p>
          <div className="flex flex-wrap justify-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label={`Follow PixelSEO on ${social.label}`}
                title={social.label}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border mb-4" />

      {/* Bottom Bar - Copyright */}
      <div className="flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground text-center">
        <p>© {currentYear} PixelSEO. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" aria-label="love" /> for better web performance
        </p>
      </div>
    </footer>
  );
}