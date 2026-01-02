import { Play, PlayCircle } from 'lucide-react';
import { useState } from 'react';

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // YouTube video ID for the demo video
  const videoId = 'dQw4w9WgXcQ'; // Replace with actual demo video ID

  return (
    <section id="video-demo" className="py-12 md:py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
          <Play className="w-4 h-4" />
          <span>Video Tutorial</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
          See <strong className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">PixelSEO</strong> in Action
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in-up stagger-1">
          Watch how easy it is to optimize your images for SEO and performance
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto animate-fade-in-up stagger-2">
        {/* Video container with gradient border */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          {/* Gradient border effect */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-2xl opacity-75" />
          
          {/* Video wrapper */}
          <div className="relative bg-card rounded-2xl overflow-hidden">
            {!isPlaying ? (
              /* Thumbnail/Placeholder */
              <div 
                className="relative aspect-video bg-gradient-to-br from-secondary via-accent to-secondary cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                {/* Placeholder gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10" />
                
                {/* Grid pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(hsl(var(--foreground)/0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                />
                
                {/* Decorative elements */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
                    
                    {/* Button */}
                    <button 
                      className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300"
                      aria-label="Play demo video"
                    >
                      <PlayCircle className="w-12 h-12 md:w-14 md:h-14 text-white ml-1" />
                    </button>
                  </div>
                </div>

                {/* Text overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-card/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-border">
                    <p className="text-foreground font-medium text-sm md:text-base">
                      🎬 PixelSEO Quick Demo - Optimize Images in 30 Seconds
                    </p>
                    <p className="text-muted-foreground text-xs md:text-sm mt-1">
                      Click to watch the tutorial
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Embedded YouTube video */
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="PixelSEO Demo Video - How to Optimize Images for SEO"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* Video features below */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Duration', value: '2 min' },
            { label: 'Topics Covered', value: '5+' },
            { label: 'Skill Level', value: 'Beginner' },
          ].map((item) => (
            <div key={item.label} className="text-center p-4 bg-card rounded-xl border border-border">
              <p className="text-2xl font-bold text-primary">{item.value}</p>
              <p className="text-muted-foreground text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Schema for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": "PixelSEO Demo - How to Optimize Images for SEO",
          "description": "Learn how to use PixelSEO to optimize your images for SEO and web performance. This quick tutorial shows you how to convert images to WebP, generate AI-powered SEO filenames, and compress images by up to 80%.",
          "thumbnailUrl": "https://www.pixelseo.net/og-image.png",
          "uploadDate": "2024-01-01T00:00:00Z",
          "duration": "PT2M",
          "contentUrl": `https://www.youtube.com/watch?v=${videoId}`,
          "embedUrl": `https://www.youtube.com/embed/${videoId}`,
          "publisher": {
            "@type": "Organization",
            "name": "PixelSEO",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.pixelseo.net/favicon.png"
            }
          }
        })
      }} />
    </section>
  );
}
