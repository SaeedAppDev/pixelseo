import { ImageFile } from '@/hooks/useImageConverter';
import { formatFileSize } from '@/lib/imageUtils';

interface SummarySectionProps {
  files: ImageFile[];
}

export function SummarySection({ files }: SummarySectionProps) {
  const convertedFiles = files.filter(f => f.converted);
  
  if (convertedFiles.length === 0) return null;

  const totalFiles = convertedFiles.length;
  const avgCompression = convertedFiles.reduce((sum, f) => sum + f.reduction, 0) / totalFiles;
  const totalReduction = convertedFiles.reduce((sum, f) => sum + f.saved, 0);

  return (
    <section className="bg-card rounded-xl p-6 mb-6 shadow-card animate-fade-in">
      <h2 className="text-xl font-bold text-foreground mb-6">Conversion Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-5 bg-secondary rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-2">Total Files</p>
          <p className="text-3xl font-bold text-foreground">{totalFiles}</p>
        </div>
        <div className="text-center p-5 bg-secondary rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-2">Average Compression</p>
          <p className="text-3xl font-bold text-success">{avgCompression.toFixed(1)}%</p>
        </div>
        <div className="text-center p-5 bg-secondary rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-2">Total Size Reduction</p>
          <p className="text-3xl font-bold text-success">{formatFileSize(totalReduction)}</p>
        </div>
      </div>
    </section>
  );
}
