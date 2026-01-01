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
        }
      },
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        "name": "PixelSEO",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/og-image.png`
        },
        "sameAs": [
          "https://twitter.com/PixelSEO",
          "https://github.com/PixelSEO"
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
