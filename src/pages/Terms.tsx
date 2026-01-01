import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialShareButtons } from '@/components/SocialShareButtons';
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, RefreshCw } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      icon: CheckCircle,
      title: 'Acceptable Use',
      content: 'You may use PixelSEO for personal and commercial image optimization. You agree to use the service responsibly and not attempt to overload or abuse our systems.',
    },
    {
      icon: XCircle,
      title: 'Prohibited Activities',
      content: 'You may not use PixelSEO to process illegal content, infringe on intellectual property rights, or attempt to reverse-engineer our AI systems. Automated scraping or abuse of the service is prohibited.',
    },
    {
      icon: FileText,
      title: 'Intellectual Property',
      content: 'You retain all rights to your images. PixelSEO does not claim ownership of any content you process through our service. Our branding, code, and AI models remain our property.',
    },
    {
      icon: AlertTriangle,
      title: 'Disclaimer of Warranties',
      content: 'PixelSEO is provided "as is" without warranties of any kind. While we strive for accuracy in AI analysis, we cannot guarantee perfect results for all images.',
    },
    {
      icon: Scale,
      title: 'Limitation of Liability',
      content: 'PixelSEO shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability is limited to the amount you paid for the service.',
    },
    {
      icon: RefreshCw,
      title: 'Changes to Terms',
      content: 'We may update these terms from time to time. Continued use of PixelSEO after changes constitutes acceptance of the new terms. We will notify users of significant changes.',
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Header />
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in-up stagger-1 mb-4">
            Last updated: January 2026
          </p>
          <SocialShareButtons title="PixelSEO Terms of Service" />
        </div>

        <div className="bg-card rounded-xl p-6 md:p-8 shadow-card animate-fade-in mb-6">
          <p className="text-muted-foreground mb-6">
            By using PixelSEO, you agree to these terms of service. Please read them carefully before using our image optimization tool.
          </p>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className={`flex gap-4 p-4 bg-secondary/50 rounded-lg animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card animate-fade-in">
          <p className="text-sm text-muted-foreground text-center">
            Questions about these terms? Contact us at{' '}
            <a href="mailto:legal@pixelseo.com" className="text-primary hover:underline">
              legal@pixelseo.com
            </a>
          </p>
        </div>

        <Footer />
      </div>
    </main>
  );
};

export default Terms;
