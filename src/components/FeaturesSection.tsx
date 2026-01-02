import { 
  Sparkles, 
  Zap, 
  FileSearch, 
  ImageDown, 
  Shield, 
  Gauge,
  ScanText,
  Palette
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Analysis',
    description: 'Smart content detection and OCR text recognition for intelligent SEO optimization.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: FileSearch,
    title: 'Smart SEO Filenames',
    description: 'Automatically generate keyword-rich, search-engine optimized filenames.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Convert multiple images instantly with our optimized compression engine.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: ImageDown,
    title: 'WebP Conversion',
    description: 'Convert to modern WebP format for up to 80% smaller file sizes.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: ScanText,
    title: 'OCR Text Detection',
    description: 'Extract text from images to create meaningful, descriptive filenames.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Gauge,
    title: 'Quality Control',
    description: 'Fine-tune compression quality to balance size and visual fidelity.',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    icon: Palette,
    title: 'Multiple Formats',
    description: 'Support for WebP, PNG, and JPEG output formats with custom settings.',
    color: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All processing happens locally. Your images never leave your browser.',
    color: 'from-green-500 to-emerald-600',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-card rounded-xl p-6 md:p-8 mb-6 shadow-card overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground animate-fade-in-up">
          Powerful <strong>PixelSEO</strong> Features
        </h2>
        <p className="text-muted-foreground mt-2 animate-fade-in-up stagger-1">
          Everything you need to optimize images for the web
        </p>
      </div>

      {/* Features Comparison Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="p-3 text-foreground font-semibold">Feature</th>
              <th className="p-3 text-foreground font-semibold">PixelSEO</th>
              <th className="p-3 text-foreground font-semibold">Others</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50">
              <td className="p-3 text-muted-foreground">AI SEO Filenames</td>
              <td className="p-3 text-success">✓ Free</td>
              <td className="p-3 text-destructive">✗ Paid</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="p-3 text-muted-foreground">OCR Text Detection</td>
              <td className="p-3 text-success">✓ Included</td>
              <td className="p-3 text-destructive">✗ Limited</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="p-3 text-muted-foreground">WebP Conversion</td>
              <td className="p-3 text-success">✓ 80% smaller</td>
              <td className="p-3 text-muted-foreground">Varies</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="p-3 text-muted-foreground">Privacy</td>
              <td className="p-3 text-success">✓ 100% Local</td>
              <td className="p-3 text-destructive">Cloud Upload</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-4 text-center">All Features at a Glance</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`group relative bg-secondary/50 hover:bg-secondary rounded-xl p-5 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
          >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
            
            {/* Icon */}
            <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:animate-pulse-glow transition-transform duration-300`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <h3 className="relative font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {feature.title}
            </h3>
            <p className="relative text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl">
              <div className={`absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rotate-45 transition-opacity duration-300`} />
            </div>
          </div>
        ))}
      </div>

      {/* External Resource Links */}
      <div className="mt-8 text-center">
        <p className="text-muted-foreground text-sm mb-2">Learn more about image optimization:</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="https://developers.google.com/speed/webp" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm"
          >
            Google WebP Documentation →
          </a>
          <a 
            href="https://web.dev/articles/image-optimization" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm"
          >
            Web.dev Image Optimization Guide →
          </a>
        </div>
      </div>
    </section>
  );
}
