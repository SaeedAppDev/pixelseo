import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialShareButtons } from '@/components/SocialShareButtons';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { FeaturesStructuredData } from '@/components/structured-data/FeaturesStructuredData';
import { CanonicalUrl } from '@/components/CanonicalUrl';
import { Zap, Image, FileSearch, Shield, Download, Settings } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: FileSearch,
      title: "AI SEO Filenames",
      description: "Automatically generate search-engine optimized filenames using AI analysis of your image content."
    },
    {
      icon: Image,
      title: "WebP Conversion",
      description: "Convert images to WebP format for up to 80% smaller file sizes without quality loss."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "All processing happens locally in your browser for instant results."
    },
    {
      icon: Shield,
      title: "100% Private",
      description: "Your images never leave your device. Complete privacy guaranteed."
    },
    {
      icon: Download,
      title: "Batch Processing",
      description: "Process unlimited images at once and download them all in a single ZIP file."
    },
    {
      icon: Settings,
      title: "Customizable Settings",
      description: "Fine-tune quality, format, and SEO settings to match your exact needs."
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <FeaturesStructuredData />
      <CanonicalUrl />
      <ScrollProgressBar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Header />
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Features
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in mb-4">
            Discover all the powerful features that make PixelSEO the best choice for image optimization.
          </p>
          <SocialShareButtons title="PixelSEO Features - AI Image Optimizer" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-card rounded-xl p-6 shadow-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <Footer />
      </div>
    </main>
  );
};

export default Features;
