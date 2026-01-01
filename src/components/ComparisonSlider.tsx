import { useState, useRef, useCallback } from 'react';
import { ImageFile } from '@/hooks/useImageConverter';
import { formatFileSize } from '@/lib/imageUtils';

interface ComparisonSliderProps {
  file: ImageFile;
  onClose: () => void;
}

export function ComparisonSlider({ file, onClose }: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  }, [handleMove]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    handleMove(e.clientX);
  }, [handleMove]);

  if (!file.convertedPreview) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-card rounded-xl shadow-xl border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-foreground">Image Comparison</h3>
            <span className="text-sm text-muted-foreground">{file.originalFile.name}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Labels */}
        <div className="flex justify-between px-4 py-2 bg-accent/50">
          <div className="text-sm">
            <span className="font-medium text-foreground">Original</span>
            <span className="text-muted-foreground ml-2">{formatFileSize(file.originalFile.size)}</span>
          </div>
          <div className="text-sm text-right">
            <span className="font-medium text-foreground">Converted</span>
            <span className="text-success ml-2">{formatFileSize(file.convertedSize)}</span>
            <span className="text-success ml-1">(-{file.reduction.toFixed(1)}%)</span>
          </div>
        </div>

        {/* Comparison Slider */}
        <div
          ref={containerRef}
          className="relative w-full aspect-video cursor-col-resize select-none overflow-hidden bg-accent"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onClick={handleClick}
        >
          {/* Original Image (Full) */}
          <img
            src={file.preview}
            alt="Original"
            className="absolute inset-0 w-full h-full object-contain"
            draggable={false}
          />

          {/* Converted Image (Clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={file.convertedPreview}
              alt="Converted"
              className="absolute inset-0 w-full h-full object-contain"
              style={{ width: `${100 / (sliderPosition / 100)}%`, maxWidth: 'none' }}
              draggable={false}
            />
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-primary cursor-col-resize"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            {/* Handle Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>

          {/* Labels on slider */}
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-foreground">
            Original
          </div>
          <div className="absolute bottom-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-primary-foreground">
            Converted
          </div>
        </div>

        {/* Dimensions */}
        <div className="flex justify-center gap-8 p-4 border-t border-border text-sm text-muted-foreground">
          <span>Original dimensions: Loading...</span>
          <span>Converted: {file.width} × {file.height}px</span>
        </div>
      </div>
    </div>
  );
}
