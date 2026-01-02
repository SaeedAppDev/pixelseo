import { Sparkles, FileText, Zap, Image, ScanText, SlidersHorizontal, Palette, Shield } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Analysis",
    description: "Smart content detection and OCR text recognition for intelligent SEO optimization.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: FileText,
    title: "Smart SEO Filenames",
    description: "Automatically generate keyword-rich, search-engine optimized filenames.",
    color: "from-cyan-500 to-cyan-600"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Convert multiple images instantly with our optimized compression engine.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Image,
    title: "WebP Conversion",
    description: "Convert to modern WebP format for up to 80% smaller file sizes.",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: ScanText,
    title: "OCR Text Detection",
    description: "Extract text from images to create meaningful, descriptive filenames.",
    color: "from-pink-500 to-pink-600"
  },
  {
    icon: SlidersHorizontal,
    title: "Quality Control",
    description: "Fine-tune compression quality to balance size and visual fidelity.",
    color: "from-sky-500 to-sky-600"
  },
  {
    icon: Palette,
    title: "Multiple Formats",
    description: "Support for WebP, PNG, and JPEG output formats with custom settings.",
    color: "from-rose-500 to-rose-600"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "All processing happens locally. Your images never leave your browser.",
    color: "from-green-500 to-green-600"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Powerful Features
        </h2>
        <p className="text-muted-foreground">
          Everything you need to optimize images for the web
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div 
            key={feature.title}
            className="bg-card border border-border rounded-xl p-5 hover:border-border/80 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
