import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || 'G-T8GLK7P5LH';

const GoogleAnalytics = () => {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);

    return () => {
      // Cleanup script on unmount (optional, usually not needed)
      const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
};

export default GoogleAnalytics;
