import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ConversionSettings } from '@/hooks/useImageConverter';

interface SettingsPanelProps {
  settings: ConversionSettings;
  onUpdateSettings: (settings: Partial<ConversionSettings>) => void;
  onResetSettings: () => void;
}

export function SettingsPanel({ settings, onUpdateSettings, onResetSettings }: SettingsPanelProps) {
  const getQualityLabel = (quality: number) => {
    if (quality >= 80) return 'High';
    if (quality >= 50) return 'Medium';
    return 'Low';
  };

  return (
    <section className="bg-card rounded-xl p-6 mb-6 shadow-card animate-fade-in">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Conversion Settings</h2>
        <Button variant="secondary" onClick={onResetSettings}>
          Reset Settings
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Quality Slider */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">
            Quality: {settings.isLossless ? '100' : settings.quality}%
          </Label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.quality}
            onChange={(e) => onUpdateSettings({ quality: parseInt(e.target.value) })}
            disabled={settings.isLossless}
            className="w-full disabled:opacity-50"
          />
          <p className="text-xs text-muted-foreground">
            {settings.isLossless ? 'Lossless' : getQualityLabel(settings.quality)}
          </p>
        </div>

        {/* Lossless Toggle */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Compression Type</Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={settings.isLossless}
              onCheckedChange={(checked) => onUpdateSettings({ isLossless: checked })}
            />
            <span className="text-sm text-muted-foreground">
              Lossless: {settings.isLossless ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Auto Convert Toggle */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Auto Convert on Upload</Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={settings.autoConvert}
              onCheckedChange={(checked) => onUpdateSettings({ autoConvert: checked })}
            />
          </div>
        </div>

        {/* Resize Options */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Resize Before Convert</Label>
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
