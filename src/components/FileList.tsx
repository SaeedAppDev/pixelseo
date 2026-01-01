import { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileItem } from './FileItem';
import { ComparisonSlider } from './ComparisonSlider';
import { BatchProgressBar } from './BatchProgressBar';
import { ImageFile, SEOMetadata } from '@/hooks/useImageConverter';

interface FileListProps {
  files: ImageFile[];
  focusKeyword: string;
  onUpdateSEO: (id: string, seo: Partial<SEOMetadata>) => void;
  onDownload: (id: string) => void;
  onRemove: (id: string) => void;
  onDownloadAll: () => void;
  onClearAll: () => void;
}

export function FileList({
  files,
  focusKeyword,
  onUpdateSEO,
  onDownload,
  onRemove,
  onDownloadAll,
  onClearAll,
}: FileListProps) {
  const [compareFile, setCompareFile] = useState<ImageFile | null>(null);
  const convertedCount = files.filter(f => f.converted).length;

  if (files.length === 0) return null;

  return (
    <>
      <BatchProgressBar files={files} />
      
      <section className="bg-card rounded-xl p-6 mb-6 shadow-card animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">Uploaded Files</h2>
            <Badge className="bg-primary text-primary-foreground">{files.length}</Badge>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onDownloadAll}
              disabled={convertedCount === 0}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download All as ZIP
            </Button>
            <Button variant="destructive" onClick={onClearAll} className="gap-2">
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              focusKeyword={focusKeyword}
              onUpdateSEO={onUpdateSEO}
              onDownload={onDownload}
              onRemove={onRemove}
              onCompare={setCompareFile}
            />
          ))}
        </div>
      </section>

      {compareFile && (
        <ComparisonSlider
          file={compareFile}
          onClose={() => setCompareFile(null)}
        />
      )}
    </>
  );
}
