import { Zap, Image, FileSearch, Shield, Download, Settings } from 'lucide-react';

export function FeaturesSection() {
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
    <section className="py-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div 
            key={feature.title}
            className="group bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 animate-fade-in border border-border/50 hover:border-primary/30"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
