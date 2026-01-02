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
    <section className="py-6 md:py-8">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 md:mb-3">
          Powerful Features
        </h2>
        <p className="text-sm md:text-base text-muted-foreground px-4">
          Everything you need to optimize images for the web
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {features.map((feature, index) => (
          <div 
            key={feature.title}
            className="group bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-5 hover:border-primary/40 md:hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 ease-out animate-fade-in cursor-pointer"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className={`w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-2 md:mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl transition-all duration-300`}>
              <feature.icon className="w-4 h-4 md:w-6 md:h-6 text-white group-hover:animate-pulse" />
            </div>
            <h3 className="text-xs md:text-base font-semibold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">{feature.title}</h3>
            <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-none">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
