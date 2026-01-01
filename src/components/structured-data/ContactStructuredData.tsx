import { Helmet } from 'react-helmet-async';

export const ContactStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://pixelseo.net/contact",
        "url": "https://pixelseo.net/contact",
        "name": "Contact Us - PixelSEO",
        "description": "Get in touch with the PixelSEO team. We're here to help with any questions about our AI-powered image optimization tool.",
        "isPartOf": {
          "@id": "https://pixelseo.net/#website"
        },
        "breadcrumb": {
          "@id": "https://pixelseo.net/contact#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://pixelseo.net/contact#breadcrumb",
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
            "name": "Contact",
            "item": "https://pixelseo.net/contact"
          }
        ]
      },
      {
        "@type": "ContactPage",
        "@id": "https://pixelseo.net/contact#contactpage",
        "name": "Contact PixelSEO",
        "mainEntity": {
          "@type": "Organization",
          "name": "PixelSEO",
          "email": "pixelseo71@gmail.com",
          "url": "https://pixelseo.net",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "pixelseo71@gmail.com",
            "availableLanguage": "English"
          }
        }
      }
    ]
  };

  return (
    <Helmet>
      <title>Contact Us - PixelSEO</title>
      <meta name="description" content="Get in touch with the PixelSEO team. We're here to help with any questions about our AI-powered image optimization tool." />
      <link rel="canonical" href="https://pixelseo.net/contact" />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
