import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SocialShareButtons } from '@/components/SocialShareButtons';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { CanonicalUrl } from '@/components/CanonicalUrl';
import { Helmet } from 'react-helmet-async';
import { Users, Target, Award, Zap, Globe, Heart } from 'lucide-react';

const BASE_URL = 'https://www.pixelseo.net';

const About = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/about`,
        "url": `${BASE_URL}/about`,
        "name": "About PixelSEO - Our Mission & Team",
        "description": "Learn about PixelSEO, our mission to make image optimization accessible to everyone, and the team behind the AI-powered tool.",
        "isPartOf": {
          "@id": `${BASE_URL}/#website`
        },
        "breadcrumb": {
          "@id": `${BASE_URL}/about#breadcrumb`
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE_URL}/about#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": BASE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About",
            "item": `${BASE_URL}/about`
          }
        ]
      },
      {
        "@type": "AboutPage",
        "@id": `${BASE_URL}/about#aboutpage`,
        "mainEntity": {
          "@id": `${BASE_URL}/#organization`
        }
      }
    ]
  };

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      content: 'To make professional image optimization accessible to everyone. We believe great SEO shouldn\'t require expensive tools or technical expertise.',
    },
    {
      icon: Users,
      title: 'Who We Serve',
      content: 'From bloggers and small businesses to agencies and enterprises, PixelSEO helps anyone who wants to improve their website\'s image performance and search rankings.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      content: 'We leverage cutting-edge AI technology to automatically analyze images, generate SEO-friendly filenames, and extract text through OCR - all in seconds.',
    },
    {
      icon: Award,
      title: 'Quality First',
      content: 'Every feature we build prioritizes quality. Our AI models are trained to understand context and generate meaningful, search-optimized metadata.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      content: 'PixelSEO serves users worldwide with a fast, reliable service that works directly in your browser - no downloads or installations required.',
    },
    {
      icon: Heart,
      title: 'Community Driven',
      content: 'We listen to our users. Many of our best features came from community suggestions. Your feedback shapes the future of PixelSEO.',
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>About PixelSEO - Our Mission & Team</title>
        <meta name="description" content="Learn about PixelSEO, our mission to make image optimization accessible to everyone, and the team behind the AI-powered tool." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <CanonicalUrl />
      <ScrollProgressBar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Header />
        
        <article itemScope itemType="https://schema.org/AboutPage">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up" itemProp="headline">
              About PixelSEO
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in-up stagger-1 mb-4" itemProp="description">
              Empowering creators with AI-powered image optimization for better web performance and SEO.
            </p>
            <SocialShareButtons title="About PixelSEO" />
          </div>

          <section className="bg-card rounded-xl p-6 md:p-8 shadow-card animate-fade-in mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              PixelSEO was born from a simple observation: optimizing images for the web was unnecessarily complicated. 
              Business owners and content creators were struggling with technical SEO requirements, spending hours manually 
              renaming files and writing alt text.
            </p>
            <p className="text-muted-foreground mb-4">
              We set out to change that. By harnessing the power of artificial intelligence, we created a tool that 
              automatically analyzes images, understands their content, and generates perfect SEO metadata in seconds.
            </p>
            <p className="text-muted-foreground">
              Today, PixelSEO helps thousands of users optimize their images, improve their search rankings, and 
              save countless hours of manual work.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 md:p-8 shadow-card animate-fade-in mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`flex gap-4 p-4 bg-secondary/50 rounded-lg animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-card rounded-xl p-6 shadow-card animate-fade-in">
            <h2 className="text-xl font-bold text-foreground mb-4 text-center">Get in Touch</h2>
            <p className="text-sm text-muted-foreground text-center">
              Have questions or want to learn more? Contact us at{' '}
              <a href="mailto:pixelseo71@gmail.com" className="text-primary hover:underline">
                pixelseo71@gmail.com
              </a>
            </p>
          </section>
        </article>

        <Footer />
      </div>
    </main>
  );
};

export default About;
