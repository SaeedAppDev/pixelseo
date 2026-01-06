import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ConversionSettings } from '@/hooks/useImageConverter';
import { OUTPUT_FORMATS } from '@/lib/imageUtils';
import { Search, Sparkles, Key, Eye, EyeOff } from 'lucide-react';

interface SettingsPanelProps {
  settings: ConversionSettings;
  onUpdateSettings: (settings: Partial<ConversionSettings>) => void;
  onResetSettings: () => void;
  onReconvert?: () => void;
  hasFiles?: boolean;
}

export function SettingsPanel({ 
  settings, 
  onUpdateSettings, 
  onResetSettings, 
  onReconvert,
  hasFiles 
}: SettingsPanelProps) {
  const [showApiKey, setShowApiKey] = useState(false);

  const getQualityLabel = (quality: number) => {
    if (quality >= 80) return 'High';
    if (quality >= 50) return 'Medium';
    return 'Low';
  };

  return (
    <section className="bg-card rounded-xl p-4 md:p-6 mb-4 md:mb-6 shadow-card animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6 pb-4 border-b border-border">
        <h2 className="text-base md:text-lg font-semibold text-foreground">Conversion Settings</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          {hasFiles && onReconvert && (
            <Button variant="default" onClick={onReconvert} size="sm" className="flex-1 sm:flex-none text-xs md:text-sm">
              Re-convert All
            </Button>
          )}
          <Button variant="secondary" onClick={onResetSettings} size="sm" className="flex-1 sm:flex-none text-xs md:text-sm">
            Reset Settings
          </Button>
        </div>
      </div>

      {/* AI Analysis Toggle */}
      <div className="mb-4 md:mb-6 p-3 md:p-4 bg-gradient-to-r from-primary/10 to-secondary rounded-lg border border-primary/20">
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <Label className="text-xs md:text-sm font-medium text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>AI-Powered SEO Analysis</span>
          </Label>
          <Switch
            checked={settings.enableAIAnalysis}
            onCheckedChange={(checked) => onUpdateSettings({ enableAIAnalysis: checked })}
          />
        </div>
        <p className="text-[10px] md:text-xs text-muted-foreground">
          {settings.enableAIAnalysis 
            ? "AI will analyze image content, detect text (OCR), and generate smart SEO metadata."
            : "Using basic dimension-based analysis. Enable AI for smarter SEO generation."}
        </p>

        {/* OpenAI API Key Input */}
        {settings.enableAIAnalysis && (
          <div className="mt-3 pt-3 border-t border-primary/20">
            <Label className="text-xs font-medium text-foreground flex items-center gap-2 mb-2">
              <Key className="w-3 h-3 text-primary shrink-0" />
              <span>OpenAI API Key (Optional)</span>
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="sk-..."
                  value={settings.openaiApiKey}
                  onChange={(e) => onUpdateSettings({ openaiApiKey: e.target.value })}
                  className="pr-10 text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button
                size="sm"
                variant={settings.openaiApiKey ? "default" : "secondary"}
                disabled={!settings.openaiApiKey || settings.openaiApiKey.length < 10}
                onClick={() => {
                  if (settings.openaiApiKey) {
                    // Store in localStorage
                    localStorage.setItem('pixelseo_openai_key', settings.openaiApiKey);
                    // Show confirmation
                    const btn = document.activeElement as HTMLButtonElement;
                    if (btn) {
                      btn.textContent = 'Saved!';
                      setTimeout(() => { btn.textContent = 'Save'; }, 1500);
                    }
                  }
                }}
                className="shrink-0"
              >
                Save
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Add your own API key if default service is unavailable. Get one from{' '}
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                platform.openai.com
              </a>
            </p>
          </div>
        )}
      </div>

      {/* Focus Keyword */}
      <div className="mb-4 md:mb-6 p-3 md:p-4 bg-secondary rounded-lg border border-border">
        <Label className="text-xs md:text-sm font-medium text-foreground mb-2 flex items-center gap-2">
          <Search className="w-4 h-4 shrink-0" />
          <span>Focus Keyword (SEO)</span>
        </Label>
        <Input
          type="text"
          placeholder="e.g., blue-running-shoes"
          value={settings.focusKeyword}
          onChange={(e) => onUpdateSettings({ focusKeyword: e.target.value.toLowerCase().replace(/[^a-z0-9-\s]/g, '') })}
          className="mt-2 text-sm"
        />
        <p className="text-[10px] md:text-xs text-muted-foreground mt-2">
          {settings.enableAIAnalysis 
            ? "AI will incorporate this keyword with detected image content for optimal SEO."
            : "Enter your target keyword for SEO filename, ALT, and TITLE generation."}
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {/* Output Format */}
        <div className="space-y-2 col-span-2 md:col-span-1">
          <Label className="text-xs md:text-sm font-medium text-muted-foreground">Output Format</Label>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {OUTPUT_FORMATS.map((format) => (
              <button
                key={format.value}
                onClick={() => onUpdateSettings({ outputFormat: format.value })}
                className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  settings.outputFormat === format.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-accent-foreground hover:bg-accent/80'
                }`}
              >
                {format.label}
              </button>
            ))}
          </div>
        </div>

        {/* Max Compress Toggle */}
        <div className="space-y-2">
          <Label className="text-xs md:text-sm font-medium text-muted-foreground">Compression</Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={settings.maxCompress}
              onCheckedChange={(checked) => onUpdateSettings({ maxCompress: checked })}
            />
            <span className="text-xs md:text-sm text-muted-foreground">
              Max Compress
            </span>
          </div>
          {settings.maxCompress && (
            <div className="flex items-center gap-1 md:gap-2 mt-2">
              <span className="text-[10px] md:text-xs text-muted-foreground">Target:</span>
              <Input
                type="number"
                min="10"
                max="500"
                value={settings.targetSize}
                onChange={(e) => onUpdateSettings({ targetSize: parseInt(e.target.value) || 50 })}
                className="w-14 md:w-20 h-7 md:h-8 text-xs md:text-sm"
              />
              <span className="text-[10px] md:text-xs text-muted-foreground">KB</span>
            </div>
          )}
        </div>

        {/* Quality Slider */}
        <div className="space-y-2">
          <Label className="text-xs md:text-sm font-medium text-muted-foreground">
            Quality: {settings.isLossless ? '100' : settings.quality}%
          </Label>
          <input
            type="range"
            min="10"
            max="100"
            value={settings.quality}
            onChange={(e) => onUpdateSettings({ quality: parseInt(e.target.value) })}
            disabled={settings.isLossless || settings.maxCompress}
            className="w-full disabled:opacity-50"
          />
          <p className="text-[10px] md:text-xs text-muted-foreground">
            {settings.maxCompress ? 'Auto' : settings.isLossless ? 'Lossless' : getQualityLabel(settings.quality)}
          </p>
        </div>

        {/* Lossless Toggle */}
        <div className="space-y-2">
          <Label className="text-xs md:text-sm font-medium text-muted-foreground">Lossless</Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={settings.isLossless}
              onCheckedChange={(checked) => onUpdateSettings({ isLossless: checked, maxCompress: checked ? false : settings.maxCompress })}
            />
            <span className="text-xs md:text-sm text-muted-foreground">
              {settings.isLossless ? 'On' : 'Off'}
            </span>
          </div>
          <p className="text-[10px] md:text-xs text-muted-foreground">No quality loss</p>
        </div>

        {/* Auto Convert Toggle */}
        <div className="space-y-2">
          <Label className="text-xs md:text-sm font-medium text-muted-foreground">Auto Convert</Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={settings.autoConvert}
              onCheckedChange={(checked) => onUpdateSettings({ autoConvert: checked })}
            />
            <span className="text-xs md:text-sm text-muted-foreground">
              On upload
            </span>
          </div>
        </div>

        {/* Resize Options */}
        <div className="space-y-2 col-span-2 md:col-span-1">
          <Label className="text-xs md:text-sm font-medium text-muted-foreground">Custom Resize</Label>
          <div className="flex items-center gap-1.5 md:gap-2">
            <Input
              type="number"
              placeholder="W"
              min="1"
              value={settings.resizeWidth || ''}
              onChange={(e) => onUpdateSettings({ resizeWidth: e.target.value ? parseInt(e.target.value) : undefined })}
              className="w-16 md:w-20 text-xs md:text-sm"
            />
            <span className="text-muted-foreground text-xs">×</span>
            <Input
              type="number"
              placeholder="H"
              min="1"
              value={settings.resizeHeight || ''}
              onChange={(e) => onUpdateSettings({ resizeHeight: e.target.value ? parseInt(e.target.value) : undefined })}
              className="w-16 md:w-20 text-xs md:text-sm"
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              id="aspectRatio"
              checked={settings.maintainAspectRatio}
              onCheckedChange={(checked) => onUpdateSettings({ maintainAspectRatio: checked as boolean })}
            />
            <label htmlFor="aspectRatio" className="text-[10px] md:text-xs text-muted-foreground cursor-pointer">
              Maintain aspect ratio
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
