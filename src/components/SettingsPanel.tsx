import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ConversionSettings } from '@/hooks/useImageConverter';
import { OUTPUT_FORMATS } from '@/lib/imageUtils';
import { Search, Sparkles } from 'lucide-react';

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
  const getQualityLabel = (quality: number) => {
    if (quality >= 80) return 'High';
    if (quality >= 50) return 'Medium';
    return 'Low';
  };

  return (
    <section className="bg-card rounded-xl p-6 mb-6 shadow-card animate-fade-in">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Conversion Settings</h2>
        <div className="flex gap-2">
          {hasFiles && onReconvert && (
            <Button variant="default" onClick={onReconvert}>
              Re-convert All
            </Button>
          )}
          <Button variant="secondary" onClick={onResetSettings}>
            Reset Settings
          </Button>
        </div>
      </div>

      {/* AI Analysis Toggle */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-secondary rounded-lg border border-primary/20">
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            AI-Powered SEO Analysis
          </Label>
          <Switch
            checked={settings.enableAIAnalysis}
            onCheckedChange={(checked) => onUpdateSettings({ enableAIAnalysis: checked })}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {settings.enableAIAnalysis 
            ? "AI will analyze image content, detect text (OCR), and generate smart SEO metadata."
            : "Using basic dimension-based analysis. Enable AI for smarter SEO generation."}
        </p>
      </div>

      {/* Focus Keyword */}
      <div className="mb-6 p-4 bg-secondary rounded-lg border border-border">
        <Label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
          <Search className="w-4 h-4" />
          Focus Keyword (SEO)
        </Label>
        <Input
          type="text"
          placeholder="e.g., blue-running-shoes, company-logo, product-photo"
          value={settings.focusKeyword}
          onChange={(e) => onUpdateSettings({ focusKeyword: e.target.value.toLowerCase().replace(/[^a-z0-9-\s]/g, '') })}
          className="mt-2"
        />
        <p className="text-xs text-muted-foreground mt-2">
          {settings.enableAIAnalysis 
            ? "AI will incorporate this keyword with detected image content for optimal SEO."
            : "Enter your target keyword for SEO filename, ALT, and TITLE generation."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Output Format */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Output Format</Label>
          <div className="flex flex-wrap gap-2">
            {OUTPUT_FORMATS.map((format) => (
              <button
                key={format.value}
                onClick={() => onUpdateSettings({ outputFormat: format.value })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
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
          <Label className="text-sm font-medium text-muted-foreground">Compression Mode</Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={settings.maxCompress}
              onCheckedChange={(checked) => onUpdateSettings({ maxCompress: checked })}
            />
            <span className="text-sm text-muted-foreground">
              Maximum Compression
            </span>
          </div>
          {settings.maxCompress && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground">Target:</span>
              <Input
                type="number"
                min="10"
                max="500"
                value={settings.targetSize}
                onChange={(e) => onUpdateSettings({ targetSize: parseInt(e.target.value) || 50 })}
                className="w-20 h-8 text-sm"
              />
              <span className="text-xs text-muted-foreground">KB</span>
            </div>
          )}
        </div>

        {/* Quality Slider */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
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
          <p className="text-xs text-muted-foreground">
            {settings.maxCompress ? 'Auto (Max Compress)' : settings.isLossless ? 'Lossless' : getQualityLabel(settings.quality)}
          </p>
        </div>

        {/* Lossless Toggle */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Lossless Mode</Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={settings.isLossless}
              onCheckedChange={(checked) => onUpdateSettings({ isLossless: checked, maxCompress: checked ? false : settings.maxCompress })}
            />
            <span className="text-sm text-muted-foreground">
              {settings.isLossless ? 'On' : 'Off'}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">No quality loss, larger files</p>
        </div>

        {/* Auto Convert Toggle */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Auto Convert</Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={settings.autoConvert}
              onCheckedChange={(checked) => onUpdateSettings({ autoConvert: checked })}
            />
            <span className="text-sm text-muted-foreground">
              Convert on upload
            </span>
          </div>
        </div>

        {/* Resize Options */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Custom Resize</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Width"
              min="1"
              value={settings.resizeWidth || ''}
              onChange={(e) => onUpdateSettings({ resizeWidth: e.target.value ? parseInt(e.target.value) : undefined })}
              className="w-20"
            />
            <span className="text-muted-foreground">×</span>
            <Input
              type="number"
              placeholder="Height"
              min="1"
              value={settings.resizeHeight || ''}
              onChange={(e) => onUpdateSettings({ resizeHeight: e.target.value ? parseInt(e.target.value) : undefined })}
              className="w-20"
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              id="aspectRatio"
              checked={settings.maintainAspectRatio}
              onCheckedChange={(checked) => onUpdateSettings({ maintainAspectRatio: checked as boolean })}
            />
            <label htmlFor="aspectRatio" className="text-xs text-muted-foreground cursor-pointer">
              Maintain aspect ratio
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
