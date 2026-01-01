import { FeaturesSection } from '@/components/FeaturesSection';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialShareButtons } from '@/components/SocialShareButtons';

const Features = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Header />
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
            Features
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in-up stagger-1 mb-4">
            Discover all the powerful features that make PixelSEO the best choice for image optimization.
          </p>
          <SocialShareButtons title="PixelSEO Features - AI Image Optimizer" />
        </div>
        <FeaturesSection />
        <Footer />
      </div>
    </main>
  );
};

export default Features;
