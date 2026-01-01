import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Shield, Eye, Lock, Server, Trash2, Mail } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      icon: Eye,
      title: 'Information We Collect',
      content: 'We collect minimal information necessary to provide our services. When using AI analysis features, images are temporarily processed to generate SEO metadata. We do not store your images permanently.',
    },
    {
      icon: Lock,
      title: 'How We Protect Your Data',
      content: 'All data transmission is encrypted using industry-standard SSL/TLS protocols. Local processing means most operations happen directly in your browser without data leaving your device.',
    },
    {
      icon: Server,
      title: 'Data Storage',
      content: 'Images processed locally never leave your device. For AI-powered features, data is processed in real-time and not stored on our servers after the analysis is complete.',
    },
    {
      icon: Trash2,
      title: 'Data Retention',
      content: 'We do not retain your images or personal data. Any temporary data created during AI processing is automatically deleted after the session ends.',
    },
    {
      icon: Shield,
      title: 'Third-Party Services',
      content: 'We use trusted AI services to power our image analysis features. These services are bound by strict data protection agreements and do not use your data for training.',
    },
    {
      icon: Mail,
      title: 'Contact Us',
      content: 'If you have any questions about our privacy practices, please contact us at privacy@pixelseo.com. We are committed to addressing your concerns promptly.',
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Header />
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in-up stagger-1">
            Last updated: January 2026
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 md:p-8 shadow-card animate-fade-in mb-6">
          <p className="text-muted-foreground mb-6">
            At PixelSEO, we take your privacy seriously. This policy explains how we handle your data when you use our image optimization service.
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

        <Footer />
      </div>
    </main>
  );
};

export default Privacy;
