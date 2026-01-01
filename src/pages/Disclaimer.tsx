import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialShareButtons } from '@/components/SocialShareButtons';
import { AlertTriangle, FileWarning, Scale, Sparkles, Link2, RefreshCw } from 'lucide-react';

const sections = [
  {
    icon: AlertTriangle,
    title: 'General Disclaimer',
    content: 'The information and services provided by PixelSEO are for general informational purposes only. While we strive for accuracy, we make no warranties about the completeness, reliability, or suitability of our services.'
  },
  {
    icon: FileWarning,
    title: 'No Guarantees',
    content: 'We do not guarantee specific results from using our image optimization tools. SEO performance depends on many factors beyond image optimization, including content quality, website structure, and competition.'
  },
  {
    icon: Sparkles,
    title: 'AI-Generated Content',
    content: 'Our AI-powered features generate suggestions based on machine learning models. These suggestions should be reviewed and may not always be accurate or appropriate for your specific use case.'
  },
  {
    icon: Scale,
    title: 'Limitation of Liability',
    content: 'PixelSEO shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services. Use our tools at your own discretion.'
  },
  {
    icon: Link2,
    title: 'External Links',
    content: 'Our website may contain links to external sites. We are not responsible for the content, privacy policies, or practices of any third-party websites or services.'
  },
  {
    icon: RefreshCw,
    title: 'Changes to Disclaimer',
    content: 'We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of these changes.'
  }
];

const Disclaimer = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Header />
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
            Disclaimer
          </h1>
          <p className="text-muted-foreground animate-fade-in-up stagger-1 mb-4">
            Last updated: January 2026
          </p>
          <SocialShareButtons title="PixelSEO Disclaimer" />
        </div>

        <div className="bg-card rounded-xl p-6 md:p-8 shadow-card animate-fade-in-up stagger-2">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div 
                key={section.title}
                className="flex gap-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              For questions about this disclaimer, contact us at{' '}
              <a href="mailto:legal@pixelseo.com" className="text-primary hover:underline">
                legal@pixelseo.com
              </a>
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
};

export default Disclaimer;
