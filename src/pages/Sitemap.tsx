import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { CanonicalUrl } from '@/components/CanonicalUrl';
import { BackToTop } from '@/components/BackToTop';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, FileText, Users, HelpCircle, Mail, Shield, Scale, Cookie, AlertTriangle, Layers } from 'lucide-react';

const BASE_URL = 'https://www.pixelseo.net';

const Sitemap = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/sitemap`,
        "url": `${BASE_URL}/sitemap`,
        "name": "Sitemap - PixelSEO",
        "description": "Browse all pages on PixelSEO. Find our image optimization tool, features, FAQ, and legal pages.",
        "isPartOf": {
          "@id": `${BASE_URL}/#website`
        },
        "breadcrumb": {
          "@id": `${BASE_URL}/sitemap#breadcrumb`
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE_URL}/sitemap#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": BASE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Sitemap",
            "item": `${BASE_URL}/sitemap`
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "@id": `${BASE_URL}/sitemap#collection`,
        "name": "Site Navigation",
        "description": "Complete list of all pages on PixelSEO website"
      }
    ]
  };

  const mainPages = [
    { name: 'Home', href: '/', icon: Home, description: 'AI-powered image optimization tool with SEO filenames and WebP conversion' },
    { name: 'Features', href: '/features', icon: Layers, description: 'Explore all features including AI analysis, OCR, and batch processing' },
    { name: 'About Us', href: '/about', icon: Users, description: 'Learn about PixelSEO and our mission' },
    { name: 'FAQ', href: '/faq', icon: HelpCircle, description: 'Frequently asked questions about image optimization' },
    { name: 'Contact', href: '/contact', icon: Mail, description: 'Get in touch with our team' },
  ];

  const legalPages = [
    { name: 'Privacy Policy', href: '/privacy', icon: Shield, description: 'How we handle your data and privacy' },
    { name: 'Terms of Service', href: '/terms', icon: Scale, description: 'Terms and conditions for using PixelSEO' },
    { name: 'Cookie Policy', href: '/cookies', icon: Cookie, description: 'Information about cookies we use' },
    { name: 'Disclaimer', href: '/disclaimer', icon: AlertTriangle, description: 'Legal disclaimers and limitations' },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Sitemap - PixelSEO</title>
        <meta name="description" content="Browse all pages on PixelSEO. Find our image optimization tool, features, FAQ, and legal pages." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <CanonicalUrl />
      <ScrollProgressBar />
      <BackToTop />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Header />
        
        <article>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
              Sitemap
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in-up stagger-1">
              Browse all pages on PixelSEO
            </p>
          </div>

          <section className="bg-card rounded-xl p-6 md:p-8 shadow-card animate-fade-in mb-6">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Main Pages
            </h2>
            <nav aria-label="Main pages navigation">
              <ul className="space-y-4">
                {mainPages.map((page, index) => (
                  <li key={page.href} className={`animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}>
                    <Link 
                      to={page.href}
                      className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <page.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {page.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{page.description}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 shadow-card animate-fade-in">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Legal Pages
            </h2>
            <nav aria-label="Legal pages navigation">
              <ul className="grid md:grid-cols-2 gap-4">
                {legalPages.map((page, index) => (
                  <li key={page.href} className={`animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}>
                    <Link 
                      to={page.href}
                      className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <page.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {page.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{page.description}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        </article>

        <Footer />
      </div>
    </main>
  );
};

export default Sitemap;
