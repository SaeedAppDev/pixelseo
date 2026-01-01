import { Download, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageFile } from '@/hooks/useImageConverter';
import { formatFileSize } from '@/lib/imageUtils';

interface FileItemProps {
  file: ImageFile;
  onUpdateFileName: (id: string, name: string) => void;
  onDownload: (id: string) => void;
  onRemove: (id: string) => void;
}

export function FileItem({ file, onUpdateFileName, onDownload, onRemove }: FileItemProps) {
  const showWarning = file.originalFile.size > 10 * 1024 * 1024;

  return (
    <div className="bg-secondary border border-border rounded-lg p-5 animate-fade-in">
      {showWarning && (
        <div className="flex items-center gap-2 bg-warning-bg border border-warning rounded-lg p-3 mb-4 text-sm text-warning-foreground">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          Large file detected. Conversion may take longer.
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <img
          src={file.preview}
          alt={file.originalFile.name}
          className="w-full md:w-28 h-28 rounded-lg object-cover bg-accent shrink-0"
        />
        <div className="flex-1 min-w-0 space-y-2">
          <Input
            value={file.seoName || file.originalFile.name.replace(/\.[^.]+$/, '.webp')}
            onChange={(e) => onUpdateFileName(file.id, e.target.value)}
            className="font-mono text-sm"
          />
          <p className="text-sm text-muted-foreground">
            {formatFileSize(file.originalFile.size)} • {file.originalFile.type}
          </p>
          
          {file.converting && (
            <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
              <div className="h-full bg-primary animate-pulse w-1/2" />
            </div>
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
          <div className="bg-card p-3 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">Converted</p>
            <p className="text-sm font-semibold text-foreground">
              {formatFileSize(file.webpSize)}
            </p>
          </div>
          <div className="bg-card p-3 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">Reduction</p>
            <p className="text-sm font-semibold text-success">
              {file.reduction.toFixed(1)}%
            </p>
          </div>
          <div className="bg-card p-3 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">Saved</p>
            <p className="text-sm font-semibold text-success">
              {formatFileSize(file.saved)}
            </p>
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => onDownload(file.id)}
          disabled={!file.converted}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download WebP
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
