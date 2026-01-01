import { Moon, Sun, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-card rounded-xl p-6 md:p-8 mb-6 shadow-card animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground flex items-center gap-3">
            <Rocket className="w-8 h-8 text-primary" />
            <span>PixelSEO</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            AI-Powered Image Optimizer with Smart SEO Filenames & WebP Conversion
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="shrink-0"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
