import { ImageFile } from '@/hooks/useImageConverter';
import { formatFileSize } from '@/lib/imageUtils';

interface BatchProgressBarProps {
  files: ImageFile[];
}

export function BatchProgressBar({ files }: BatchProgressBarProps) {
  if (files.length === 0) return null;

  const converting = files.filter(f => f.converting).length;
  const converted = files.filter(f => f.converted).length;
  const pending = files.filter(f => !f.converted && !f.converting).length;
  const total = files.length;
  const progress = (converted / total) * 100;
  
  const totalOriginalSize = files.reduce((acc, f) => acc + f.originalFile.size, 0);
  const totalConvertedSize = files.filter(f => f.converted).reduce((acc, f) => acc + f.convertedSize, 0);
  const under50KB = files.filter(f => f.converted && f.convertedSize < 50 * 1024).length;

  const isProcessing = converting > 0;
  const isComplete = converted === total && total > 0;

  return (
    <div className="bg-card rounded-xl p-4 mb-6 shadow-card animate-fade-in border border-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {isComplete ? 'Conversion Complete' : isProcessing ? 'Converting...' : 'Ready to Convert'}
            </span>
            <span className="text-sm text-muted-foreground">
              {converted}/{total} files
            </span>
          </div>
          
          <div className="w-full h-3 bg-accent rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ease-out ${
                isComplete ? 'bg-success' : 'bg-primary'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            {converting > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {converting} processing
              </span>
            )}
            {pending > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                {pending} pending
              </span>
            )}
            {converted > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success" />
                {converted} done
              </span>
            )}
          </div>
        </div>
        
        {converted > 0 && (
          <div className="flex gap-4 text-center">
            <div className="px-3 py-1 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground">Original</p>
              <p className="text-sm font-semibold text-foreground">{formatFileSize(totalOriginalSize)}</p>
            </div>
            <div className="px-3 py-1 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground">Converted</p>
              <p className="text-sm font-semibold text-success">{formatFileSize(totalConvertedSize)}</p>
            </div>
            <div className="px-3 py-1 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground">&lt;50KB</p>
              <p className="text-sm font-semibold text-success">{under50KB}/{converted}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
