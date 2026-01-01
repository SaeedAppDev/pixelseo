import { useState, useEffect } from 'react';
import { Pencil, Check, X, Copy, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageFile, SEOMetadata } from '@/hooks/useImageConverter';
import { toast } from 'sonner';

interface SEOMetadataEditorProps {
  file: ImageFile;
  focusKeyword: string;
  onUpdateSEO: (id: string, seo: Partial<SEOMetadata>) => void;
}

export function SEOMetadataEditor({ file, focusKeyword, onUpdateSEO }: SEOMetadataEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localFilename, setLocalFilename] = useState(file.seoMetadata?.filename || '');
  const [localAlt, setLocalAlt] = useState(file.seoMetadata?.altText || '');
  const [localTitle, setLocalTitle] = useState(file.seoMetadata?.titleText || '');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    setLocalFilename(file.seoMetadata?.filename || '');
    setLocalAlt(file.seoMetadata?.altText || '');
    setLocalTitle(file.seoMetadata?.titleText || '');
  }, [file.seoMetadata]);

  const handleSave = () => {
    onUpdateSEO(file.id, {
      filename: localFilename,
      altText: localAlt,
      titleText: localTitle,
    });
    setIsEditing(false);
    toast.success('SEO metadata updated');
  };

  const handleCancel = () => {
    setLocalFilename(file.seoMetadata?.filename || '');
    setLocalAlt(file.seoMetadata?.altText || '');
    setLocalTitle(file.seoMetadata?.titleText || '');
    setIsEditing(false);
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
    toast.success(`${field} copied to clipboard`);
  };

  if (!file.seoMetadata) {
    return (
      <div className="text-xs text-muted-foreground italic">
        {focusKeyword ? 'Converting...' : 'Enter focus keyword to generate SEO'}
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-3 p-3 bg-secondary rounded-lg border border-border">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Filename</Label>
          <Input
            value={localFilename}
            onChange={(e) => setLocalFilename(e.target.value.toLowerCase().replace(/[^a-z0-9-_.]/g, '-'))}
            className="h-8 text-xs font-mono"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">ALT Text</Label>
          <Input
            value={localAlt}
            onChange={(e) => setLocalAlt(e.target.value)}
            className="h-8 text-xs"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Title Text</Label>
          <Input
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            className="h-8 text-xs"
          />
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave} className="h-7 text-xs gap-1">
            <Check className="w-3 h-3" /> Save
          </Button>
          <Button size="sm" variant="secondary" onClick={handleCancel} className="h-7 text-xs gap-1">
            <X className="w-3 h-3" /> Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 p-3 bg-secondary rounded-lg border border-border">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">SEO Metadata</span>
        <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)} className="h-6 px-2 text-xs gap-1">
          <Pencil className="w-3 h-3" /> Edit
        </Button>
      </div>
      
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-16 shrink-0">Filename:</span>
          <code className="text-xs bg-accent px-2 py-0.5 rounded flex-1 truncate font-mono">
            {file.seoMetadata.filename}
          </code>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => copyToClipboard(file.seoMetadata!.filename, 'Filename')} 
            className="h-6 w-6 p-0"
          >
            {copied === 'Filename' ? <CheckCheck className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-16 shrink-0">ALT:</span>
          <span className="text-xs text-foreground flex-1 truncate">{file.seoMetadata.altText}</span>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => copyToClipboard(file.seoMetadata!.altText, 'ALT')} 
            className="h-6 w-6 p-0"
          >
            {copied === 'ALT' ? <CheckCheck className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-16 shrink-0">Title:</span>
          <span className="text-xs text-foreground flex-1 truncate">{file.seoMetadata.titleText}</span>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => copyToClipboard(file.seoMetadata!.titleText, 'Title')} 
            className="h-6 w-6 p-0"
          >
            {copied === 'Title' ? <CheckCheck className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
          </Button>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground pt-1 border-t border-border mt-2">
        Type: <span className="text-foreground capitalize">{file.seoMetadata.imageType}</span> • 
        {file.seoMetadata.isTransparent && ' Transparent •'}
        {' '}{file.seoMetadata.aspectRatioLabel}
      </div>
    </div>
  );
}
