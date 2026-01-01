import { useCallback, useRef, useState } from 'react';
import { Upload } from 'lucide-react';

interface UploadAreaProps {
  onFilesSelected: (files: FileList) => void;
}

export function UploadArea({ onFilesSelected }: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  }, [onFilesSelected]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
      e.target.value = '';
    }
  };

  return (
    <section className="bg-card rounded-xl p-6 md:p-10 mb-6 shadow-card animate-fade-in">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-xl p-10 md:p-16 text-center cursor-pointer
          transition-all duration-300
          ${isDragOver 
            ? 'border-success bg-success-bg' 
            : 'border-border bg-secondary hover:border-primary hover:bg-accent'
          }
        `}
      >
        <Upload className={`w-16 h-16 mx-auto mb-4 ${isDragOver ? 'text-success' : 'text-muted-foreground'}`} />
        <p className="text-lg font-medium text-foreground mb-2">
          Drag & drop images here
        </p>
        <p className="text-sm text-muted-foreground">
          or click to select files (JPG, JPEG, PNG, WebP up to 50MB each)
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </section>
  );
}
