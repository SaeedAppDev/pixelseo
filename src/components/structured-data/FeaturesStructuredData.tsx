import { Helmet } from 'react-helmet-async';

export const FeaturesStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://pixelseo.net/features",
        "url": "https://pixelseo.net/features",
        "name": "Features - PixelSEO AI Image Optimizer",
        "description": "Discover all the powerful features that make PixelSEO the best choice for image optimization including AI analysis, OCR, and WebP conversion.",
        "isPartOf": {
          "@id": "https://pixelseo.net/#website"
        },
        "breadcrumb": {
          "@id": "https://pixelseo.net/features#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://pixelseo.net/features#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://pixelseo.net"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Features",
            "item": "https://pixelseo.net/features"
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": "https://pixelseo.net/features#featurelist",
        "name": "PixelSEO Features",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "AI-Powered SEO Analysis",
            "description": "Intelligent image content analysis with automatic SEO-friendly filename generation"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "OCR Text Detection",
            "description": "Extract and incorporate text from images into filenames for better searchability"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "WebP Conversion",
            "description": "Convert images to modern WebP format for up to 80% smaller file sizes"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Batch Processing",
            "description": "Process multiple images at once and download as a convenient ZIP file"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Quality Control",
            "description": "Adjust compression quality to balance file size and visual quality"
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      <title>Features - PixelSEO AI Image Optimizer</title>
      <meta name="description" content="Discover all the powerful features that make PixelSEO the best choice for image optimization including AI analysis, OCR, and WebP conversion." />
      <link rel="canonical" href="https://pixelseo.net/features" />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
