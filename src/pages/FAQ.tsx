import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialShareButtons } from '@/components/SocialShareButtons';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { FAQStructuredData } from '@/components/structured-data/FAQStructuredData';
import { CanonicalUrl } from '@/components/CanonicalUrl';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is PixelSEO?',
    answer: 'PixelSEO is an AI-powered image optimization tool that converts images to modern formats like WebP, generates SEO-friendly filenames, and uses AI to analyze image content for smart naming.',
  },
  {
    question: 'How does the AI analysis work?',
    answer: 'Our AI analyzes your images to detect content, read text via OCR, and understand the context. This information is used to generate descriptive, keyword-rich filenames that improve your SEO.',
  },
  {
    question: 'Is my data safe?',
    answer: 'Absolutely! All image processing happens locally in your browser. Your images are never uploaded to our servers unless you explicitly use the AI analysis feature, which processes data securely.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'PixelSEO supports JPG, JPEG, PNG, GIF, BMP, and TIFF as input formats. You can convert to WebP, PNG, or JPEG output formats.',
  },
  {
    question: 'How much can I compress my images?',
    answer: 'WebP conversion can reduce file sizes by up to 80% compared to traditional formats while maintaining visual quality. You can adjust the quality slider to balance size and quality.',
  },
  {
    question: 'Is PixelSEO free to use?',
    answer: 'Yes! The basic features including format conversion, compression, and manual SEO naming are completely free. AI-powered analysis may have usage limits.',
  },
  {
    question: 'Can I process multiple images at once?',
    answer: 'Yes, PixelSEO supports batch processing. You can upload multiple images and convert them all at once, then download them as a ZIP file.',
  },
  {
    question: 'What makes a good SEO filename?',
    answer: 'A good SEO filename is descriptive, uses hyphens to separate words, includes relevant keywords, and accurately describes the image content. PixelSEO generates these automatically.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-background">
      <FAQStructuredData faqs={faqs} />
      <CanonicalUrl />
      <ScrollProgressBar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Header />
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in-up stagger-1 mb-4">
            Find answers to common questions about PixelSEO.
          </p>
          <SocialShareButtons title="PixelSEO FAQ - Frequently Asked Questions" />
        </div>

        <div className="bg-card rounded-xl p-6 md:p-8 shadow-card animate-fade-in">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border border-border rounded-lg overflow-hidden transition-all duration-300 animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="p-4 text-muted-foreground bg-card">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
};

export default FAQ;
