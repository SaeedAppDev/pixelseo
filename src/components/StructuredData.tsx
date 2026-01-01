import { Helmet } from 'react-helmet-async';

export const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://pixelseo.net/#website",
        "url": "https://pixelseo.net",
        "name": "PixelSEO",
        "description": "AI-powered image optimization tool with smart SEO filenames, OCR text detection, and WebP conversion.",
        "publisher": {
          "@id": "https://pixelseo.net/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://pixelseo.net/#organization",
        "name": "PixelSEO",
        "url": "https://pixelseo.net",
        "logo": {
          "@type": "ImageObject",
          "url": "https://pixelseo.net/og-image.png"
        },
        "sameAs": [
          "https://twitter.com/PixelSEO",
          "https://github.com/PixelSEO"
        ]
      },
      {
        "@type": "WebApplication",
        "@id": "https://pixelseo.net/#application",
        "name": "PixelSEO Image Optimizer",
        "url": "https://pixelseo.net",
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
        "screenshot": "https://pixelseo.net/og-image.png",
        "provider": {
          "@id": "https://pixelseo.net/#organization"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://pixelseo.net/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://pixelseo.net"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://pixelseo.net/#faq",
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
