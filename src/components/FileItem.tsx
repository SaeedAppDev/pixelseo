import { Download, Trash2, AlertTriangle, Eye, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageFile, SEOMetadata } from '@/hooks/useImageConverter';
import { formatFileSize } from '@/lib/imageUtils';
import { SEOMetadataEditor } from './SEOMetadataEditor';
import { Badge } from '@/components/ui/badge';

interface FileItemProps {
  file: ImageFile;
  focusKeyword: string;
  onUpdateSEO: (id: string, seo: Partial<SEOMetadata>) => void;
  onDownload: (id: string) => void;
  onRemove: (id: string) => void;
  onCompare: (file: ImageFile) => void;
}

export function FileItem({ file, focusKeyword, onUpdateSEO, onDownload, onRemove, onCompare }: FileItemProps) {
  const showWarning = file.originalFile.size > 10 * 1024 * 1024;
  const isUnder50KB = file.convertedSize > 0 && file.convertedSize < 50 * 1024;

  return (
    <div className="bg-secondary border border-border rounded-lg p-5 animate-fade-in">
      {showWarning && (
        <div className="flex items-center gap-2 bg-warning-bg border border-warning rounded-lg p-3 mb-4 text-sm text-warning-foreground">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          Large file detected. Conversion may take longer.
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative">
          <img
            src={file.preview}
            alt={file.originalFile.name}
            className="w-full md:w-28 h-28 rounded-lg object-cover bg-accent shrink-0"
          />
          {file.converted && (
            <button
              onClick={() => onCompare(file)}
              className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 hover:opacity-100 transition-opacity rounded-lg"
            >
              <Eye className="w-6 h-6 text-foreground" />
            </button>
          )}
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <p className="text-sm text-muted-foreground truncate">
            Original: {file.originalFile.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatFileSize(file.originalFile.size)} • {file.originalFile.type}
          </p>
          
          {file.converting && (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 h-3 bg-accent rounded-full overflow-hidden">
                  {/* Animated progress background */}
                  <div className="absolute inset-0 animate-shimmer rounded-full" />
                  {/* Glowing wave effect */}
                  <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent animate-progress-wave" />
                </div>
                <div className="animate-compress">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-primary font-medium animate-pulse">
                Compressing & Optimizing...
              </p>
            </div>
          )}

          {file.aiAnalyzing && (
            <div className="flex items-center gap-2 text-primary">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-xs">AI analyzing image...</span>
            </div>
          )}

          {file.aiAnalyzed && file.aiContent && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary">AI Analysis</span>
                <Badge variant="secondary" className="text-xs">Detected</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{file.aiContent}</p>
              {file.aiDetectedText && (
                <p className="text-xs text-foreground">
                  <span className="font-medium">Text found:</span> {file.aiDetectedText}
                </p>
              )}
            </div>
          )}

          {file.converted && (
            <SEOMetadataEditor
              file={file}
              focusKeyword={focusKeyword}
              onUpdateSEO={onUpdateSEO}
            />
          )}
        </div>
      </div>
      
      {file.converted && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-card p-3 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">Original</p>
            <p className="text-sm font-semibold text-foreground">
              {formatFileSize(file.originalFile.size)}
            </p>
          </div>
          <div className={`bg-card p-3 rounded-lg border ${isUnder50KB ? 'border-success' : 'border-border'}`}>
            <p className="text-xs text-muted-foreground mb-1">Converted</p>
            <p className={`text-sm font-semibold ${isUnder50KB ? 'text-success' : 'text-foreground'}`}>
              {formatFileSize(file.convertedSize)}
              {isUnder50KB && <span className="ml-1">✓</span>}
            </p>
          </div>
          <div className="bg-card p-3 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">Reduction</p>
            <p className="text-sm font-semibold text-success">
              {file.reduction.toFixed(1)}%
            </p>
          </div>
          <div className="bg-card p-3 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">Dimensions</p>
            <p className="text-sm font-semibold text-foreground">
              {file.width} × {file.height}
            </p>
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {file.converted && (
          <Button
            variant="outline"
            onClick={() => onCompare(file)}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            Compare
          </Button>
        )}
        <Button
          onClick={() => onDownload(file.id)}
          disabled={!file.converted}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button
          variant="destructive"
          onClick={() => onRemove(file.id)}
          className="gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Remove
        </Button>
      </div>
    </div>
  );
}
