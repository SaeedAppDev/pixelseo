import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What image formats are supported?',
    answer: 'We support JPEG, JPG, and PNG formats. All images are converted to WebP format.',
  },
  {
    question: 'What is the maximum file size?',
    answer: 'We recommend files up to 50MB for optimal performance. Larger files may take longer to process.',
  },
  {
    question: 'How does SEO filename optimization work?',
    answer: 'Our tool analyzes your image filename, dimensions, and properties to generate SEO-friendly filenames with lowercase letters, hyphens, and descriptive terms that help search engines understand your content.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes! All processing happens entirely in your browser. No images are uploaded to any server. Your privacy is completely protected.',
  },
];

const features = [
  'Advanced compression algorithms for smaller file sizes',
  'Lossy and lossless compression support',
  'Transparency support (like PNG)',
  'Animation support',
  'Wide browser support',
  'Better SEO with optimized filenames',
];

export function InfoSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => prev === index ? null : index);
  };

  return (
    <>
      <section className="bg-card rounded-xl p-6 md:p-8 mb-6 shadow-card animate-fade-in">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Why Choose <strong>PixelSEO</strong> for WebP Conversion?</h2>
        <p className="text-muted-foreground mb-6">
          <strong>PixelSEO</strong> uses the modern WebP format that provides superior compression compared to JPEG and PNG. 
          It can reduce file sizes by 25-35% while maintaining the same visual quality, resulting in 
          faster page loads and better user experience.
        </p>
        <h3 className="text-lg font-semibold text-foreground mb-4">Key Benefits of Using PixelSEO</h3>
        <ol className="space-y-3 list-decimal list-inside">
          {features.map((feature, index) => (
            <li key={index} className="text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success shrink-0 inline" />
                <span>{feature}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-card rounded-xl p-6 md:p-8 mb-6 shadow-card animate-fade-in">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6"><strong>PixelSEO</strong> Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-4 bg-secondary hover:bg-accent text-left font-medium text-foreground transition-colors"
              >
                <span>{faq.question}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </button>
              {openFaq === index && (
                <div className="p-4 text-muted-foreground border-t border-border">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
