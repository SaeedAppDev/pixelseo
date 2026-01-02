import { 
  Sparkles, 
  Zap, 
  FileSearch, 
  ImageDown, 
  Shield, 
  Gauge,
  ScanText,
  Palette,
  Check,
  X
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Analysis',
    description: 'Smart content detection and OCR text recognition for intelligent SEO optimization.',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
  },
  {
    icon: FileSearch,
    title: 'Smart SEO Filenames',
    description: 'Automatically generate keyword-rich, search-engine optimized filenames.',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Convert multiple images instantly with our optimized compression engine.',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
  },
  {
    icon: ImageDown,
    title: 'WebP Conversion',
    description: 'Convert to modern WebP format for up to 80% smaller file sizes.',
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
  },
  {
    icon: ScanText,
    title: 'OCR Text Detection',
    description: 'Extract text from images to create meaningful, descriptive filenames.',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
  },
  {
    icon: Gauge,
    title: 'Quality Control',
    description: 'Fine-tune compression quality to balance size and visual fidelity.',
    gradient: 'from-indigo-500 via-blue-500 to-cyan-500',
  },
  {
    icon: Palette,
    title: 'Multiple Formats',
    description: 'Support for WebP, PNG, and JPEG output formats with custom settings.',
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All processing happens locally. Your images never leave your browser.',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
  },
];

const comparisonData = [
  { feature: 'AI SEO Filenames', pixelseo: 'Free', others: 'Paid', pixelseoWin: true },
  { feature: 'OCR Text Detection', pixelseo: 'Included', others: 'Limited', pixelseoWin: true },
  { feature: 'WebP Conversion', pixelseo: '80% smaller', others: 'Varies', pixelseoWin: true },
  { feature: 'Privacy', pixelseo: '100% Local', others: 'Cloud Upload', pixelseoWin: true },
  { feature: 'Batch Processing', pixelseo: 'Unlimited', others: '5-10 files', pixelseoWin: true },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-12 md:py-16">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
            Why Choose <strong className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">PixelSEO</strong>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in-up stagger-1">
            Everything you need to optimize images for the web, powered by AI
          </p>
        </div>

        {/* Comparison Table - Modern Card Style */}
        <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden mb-16 animate-fade-in-up stagger-2">
          <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 px-6 py-4 border-b border-border">
            <h3 className="text-xl font-bold text-foreground text-center">PixelSEO vs Competitors</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">PixelSEO</span>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">Others</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr 
                    key={row.feature} 
                    className={`border-b border-border/50 transition-colors hover:bg-secondary/20 ${
                      index % 2 === 0 ? 'bg-transparent' : 'bg-secondary/10'
                    }`}
                  >
                    <td className="px-6 py-4 text-foreground font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success font-medium text-sm">
                        <Check className="w-4 h-4" />
                        {row.pixelseo}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive font-medium text-sm">
                        <X className="w-4 h-4" />
                        {row.others}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features Grid */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground animate-fade-in-up">
            All Features at a Glance
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
            >
              {/* Card */}
              <div className="relative h-full bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Animated border gradient */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`} />
                <div className="absolute inset-[1px] bg-card rounded-2xl" />
                
                {/* Content */}
                <div className="relative">
                  {/* Icon container */}
                  <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  </div>

                  {/* Text */}
                  <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative corner gradient */}
                <div className="absolute -top-12 -right-12 w-24 h-24 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <div className={`w-full h-full bg-gradient-to-br ${feature.gradient} rounded-full blur-2xl`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits List */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 rounded-2xl p-8 border border-border animate-fade-in-up">
          <h3 className="text-xl font-bold text-foreground text-center mb-6">
            Top Benefits of Using PixelSEO
          </h3>
          <ol className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              'Improve website loading speed by up to 80%',
              'Boost SEO rankings with optimized image filenames',
              'No signup required - start optimizing instantly',
              'Works offline - your data stays private',
              'Unlimited batch processing for free',
              'AI-powered smart filename suggestions',
            ].map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-foreground">{benefit}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* External Resource Links */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm mb-3">Learn more about image optimization:</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://developers.google.com/speed/webp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors group"
            >
              <span>Google WebP Documentation</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a 
              href="https://web.dev/articles/image-optimization" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors group"
            >
              <span>Web.dev Image Optimization Guide</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
