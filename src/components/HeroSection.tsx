import { Zap, Image, FileSearch } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-card rounded-xl p-6 md:p-10 mb-6 shadow-card animate-fade-in">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
          Free AI Image Optimizer for <span className="text-primary">Better SEO</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6 animate-fade-in-up stagger-1">
          Optimize your images instantly with AI-powered SEO filenames, OCR text detection, and WebP conversion. 
          Improve your website's performance and search rankings with our free online tool.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 animate-fade-in-up stagger-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span>Lightning Fast</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Image className="w-4 h-4 text-primary" />
            </div>
            <span>WebP Conversion</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileSearch className="w-4 h-4 text-primary" />
            </div>
            <span>SEO Filenames</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground animate-fade-in-up stagger-3">
          No registration required. All processing happens in your browser. 100% free to use.
        </p>
      </div>
    </section>
  );
}
