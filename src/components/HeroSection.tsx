import { Zap, Image, FileSearch } from 'lucide-react';
export function HeroSection() {
  return <section className="bg-card rounded-xl p-4 md:p-6 mb-4 shadow-card animate-fade-in">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 animate-fade-in-up">
          <strong>PixelSEO</strong> – Free AI Image Optimizer for <span className="text-primary">Better SEO</span>
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mb-4 animate-fade-in-up stagger-1">
          <strong>PixelSEO</strong> optimizes your images instantly with AI-powered SEO filenames, OCR text detection, and WebP conversion. 
          Improve your website's performance and search rankings with our free online tool.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-3 animate-fade-in-up stagger-2">
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            </div>
            <span>Lightning Fast</span>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Image className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            </div>
            <span>WebP Conversion</span>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileSearch className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            </div>
            <span>SEO Filenames</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground animate-fade-in-up stagger-3">
          No registration required. All processing happens in your browser. 100% free to use.
        </p>
      </div>
    </section>;
}