import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialShareButtons } from '@/components/SocialShareButtons';
import { Cookie, Settings, Shield, Clock, ToggleLeft, HelpCircle } from 'lucide-react';

const sections = [
  {
    icon: Cookie,
    title: 'What Are Cookies',
    content: 'Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and improve your experience.'
  },
  {
    icon: Settings,
    title: 'How We Use Cookies',
    content: 'We use cookies to remember your theme preference (light/dark mode), understand how you use our site, and improve our services. We do not use cookies for advertising or tracking across other websites.'
  },
  {
    icon: Shield,
    title: 'Types of Cookies',
    content: 'Essential cookies: Required for basic site functionality. Preference cookies: Remember your settings like theme. Analytics cookies: Help us understand usage patterns to improve our service.'
  },
  {
    icon: Clock,
    title: 'Cookie Duration',
    content: 'Session cookies are deleted when you close your browser. Persistent cookies remain on your device for a set period or until you delete them manually.'
  },
  {
    icon: ToggleLeft,
    title: 'Managing Cookies',
    content: 'You can control cookies through your browser settings. You can delete existing cookies and block new ones. Note that blocking essential cookies may affect site functionality.'
  },
  {
    icon: HelpCircle,
    title: 'Questions',
    content: 'If you have questions about our cookie policy, please contact us at privacy@pixelseo.com. We\'re happy to explain our data practices in more detail.'
  }
];

const Cookies = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Header />
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
            Cookie Policy
          </h1>
          <p className="text-muted-foreground animate-fade-in-up stagger-1 mb-4">
            Last updated: January 2026
          </p>
          <SocialShareButtons title="PixelSEO Cookie Policy" />
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
        </div>

        <Footer />
      </div>
    </main>
  );
};

export default Cookies;
