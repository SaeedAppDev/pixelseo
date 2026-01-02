import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://www.pixelseo.net';

export const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": BASE_URL,
        "name": "PixelSEO",
        "description": "AI-powered image optimization tool with smart SEO filenames, OCR text detection, and WebP conversion.",
        "publisher": {
          "@id": `${BASE_URL}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${BASE_URL}/?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        "name": "PixelSEO",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "@id": `${BASE_URL}/#logo`,
          "url": `${BASE_URL}/favicon.png`,
          "contentUrl": `${BASE_URL}/favicon.png`,
          "width": 512,
          "height": 512,
          "caption": "PixelSEO Logo"
        },
        "image": {
          "@id": `${BASE_URL}/#logo`
        },
        "description": "PixelSEO provides free AI-powered image optimization with automatic SEO filenames, OCR text extraction, and modern format conversion.",
        "email": "pixelseo71@gmail.com",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "pixelseo71@gmail.com",
          "availableLanguage": ["English"]
        },
        "sameAs": [
          "https://twitter.com/pixelseo",
          "https://facebook.com/pixelseo",
          "https://instagram.com/pixelseo",
          "https://linkedin.com/company/pixelseo",
          "https://youtube.com/@pixelseo",
          "https://pinterest.com/pixelseo"
        ]
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${BASE_URL}/#navigation`,
        "name": "Main Navigation",
        "hasPart": [
          {
            "@type": "SiteNavigationElement",
            "name": "Home",
            "url": BASE_URL
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Features",
            "url": `${BASE_URL}/features`
          },
          {
            "@type": "SiteNavigationElement",
            "name": "About",
            "url": `${BASE_URL}/about`
          },
          {
            "@type": "SiteNavigationElement",
            "name": "FAQ",
            "url": `${BASE_URL}/faq`
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Contact",
            "url": `${BASE_URL}/contact`
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Privacy Policy",
            "url": `${BASE_URL}/privacy`
          },
          {
            "@type": "SiteNavigationElement",
            "name": "Terms of Service",
            "url": `${BASE_URL}/terms`
          }
        ]
      },
      {
        "@type": "WebApplication",
        "@id": `${BASE_URL}/#application`,
        "name": "PixelSEO Image Optimizer",
        "url": BASE_URL,
        "description": "Free AI-powered image optimization tool that automatically generates SEO-friendly filenames, extracts text via OCR, and converts images to WebP format for better web performance.",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "AI-powered SEO filename generation",
          "OCR text detection and extraction",
          "WebP, PNG, JPEG format conversion",
          "Image compression and optimization",
          "Batch processing support",
          "No registration required"
        ],
        "screenshot": `${BASE_URL}/og-image.png`,
        "provider": {
          "@id": `${BASE_URL}/#organization`
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE_URL}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": BASE_URL
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is PixelSEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PixelSEO is a free AI-powered image optimization tool that automatically generates SEO-friendly filenames, extracts text from images using OCR, and converts images to modern formats like WebP for better web performance."
            }
          },
          {
            "@type": "Question",
            "name": "Is PixelSEO free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, PixelSEO is completely free to use. No registration or account is required. Simply upload your images and start optimizing."
            }
          },
          {
            "@type": "Question",
            "name": "What image formats does PixelSEO support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PixelSEO supports JPEG, PNG, GIF, BMP, and TIFF input formats. You can convert to WebP, PNG, or JPEG output formats."
            }
          },
          {
            "@type": "Question",
            "name": "How does AI filename generation work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PixelSEO uses advanced AI to analyze your image content and automatically generate descriptive, SEO-friendly filenames that help improve your image search rankings."
            }
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
