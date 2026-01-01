import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import pixelSeoLogo from '@/assets/pixelseo-logo.png';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-card rounded-xl p-6 md:p-8 mb-6 shadow-card animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center gap-4">
          <img 
            src={pixelSeoLogo} 
            alt="PixelSEO Logo" 
            className="w-14 h-14 md:w-16 md:h-16 rounded-xl shadow-lg"
          />
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              PixelSEO
            </h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              AI-Powered Image Optimizer
            </p>
          </div>
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
