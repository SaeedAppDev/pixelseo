import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  faqs: FAQItem[];
}

export const FAQStructuredData = ({ faqs }: FAQStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://pixelseo.net/faq",
        "url": "https://pixelseo.net/faq",
        "name": "FAQ - PixelSEO Frequently Asked Questions",
        "description": "Find answers to common questions about PixelSEO image optimizer, including features, formats, pricing, and more.",
        "isPartOf": {
          "@id": "https://pixelseo.net/#website"
        },
        "breadcrumb": {
          "@id": "https://pixelseo.net/faq#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://pixelseo.net/faq#breadcrumb",
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
            "name": "FAQ",
            "item": "https://pixelseo.net/faq"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://pixelseo.net/faq#faqpage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <Helmet>
      <title>FAQ - PixelSEO Frequently Asked Questions</title>
      <meta name="description" content="Find answers to common questions about PixelSEO image optimizer, including features, formats, pricing, and more." />
      <link rel="canonical" href="https://pixelseo.net/faq" />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
