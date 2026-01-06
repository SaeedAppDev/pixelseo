// Supported output formats
export type OutputFormat = 'webp' | 'avif' | 'png' | 'jpeg';

export const OUTPUT_FORMATS: { value: OutputFormat; label: string; mime: string; ext: string }[] = [
  { value: 'webp', label: 'WebP', mime: 'image/webp', ext: '.webp' },
  { value: 'avif', label: 'AVIF', mime: 'image/avif', ext: '.avif' },
  { value: 'png', label: 'PNG', mime: 'image/png', ext: '.png' },
  { value: 'jpeg', label: 'JPEG', mime: 'image/jpeg', ext: '.jpg' },
];

// SEO Filename Generation
export function generateSEOFilename(
  originalName: string,
  width: number,
  height: number,
  hasTransparency: boolean,
  format: OutputFormat = 'webp'
): string {
  const cleanName = originalName.replace(/\.[^.]+$/, '');
  
  // Extract meaningful words from filename
  let words = cleanName
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 1);
  
  // Remove common prefixes and patterns
  const prefixPatterns = /^(img|image|photo|pic|picture|file|screenshot|screen|capture|dsc|dcim)/i;
  words = words.filter((w, i) => {
    if (i === 0 && prefixPatterns.test(w)) return false;
    return true;
  });
  
  // Remove trailing numbers and dates
  words = words.map(w => w.replace(/-\d+$|_\d+$|\d+$/, '')).filter(w => w.length > 0);
  
  let focusKeyword = words.length > 0 ? words.slice(0, 4).join('-') : 'image';
  focusKeyword = focusKeyword.replace(/^[-_]+|[-_]+$/g, '').replace(/-+/g, '-');
  
  if (focusKeyword.length < 3) {
    focusKeyword = 'image';
  }
  
  const imageType = detectImageType(originalName, width, height);
  const shortDescription = generateShortDescription(width, height, hasTransparency, originalName);
  
  const parts = [focusKeyword, imageType, shortDescription].filter(p => p && p.length > 0);
  let finalName = parts.join('-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  
  if (!finalName || finalName.length < 3) {
    finalName = 'image-' + imageType + '-' + shortDescription;
  }
  
  const formatInfo = OUTPUT_FORMATS.find(f => f.value === format);
  return finalName + (formatInfo?.ext || '.webp');
}

function detectImageType(filename: string, width: number, height: number): string {
  const lowerName = filename.toLowerCase();
  
  if (lowerName.includes('logo') || lowerName.includes('brand') || lowerName.includes('icon')) {
    return 'logo';
  }
  
  if (lowerName.includes('screenshot') || lowerName.includes('screen') || 
      lowerName.includes('capture') || lowerName.includes('dashboard') ||
      lowerName.includes('interface') || lowerName.includes('ui')) {
    return 'screenshot';
  }
  
  if (lowerName.includes('product') || lowerName.includes('item')) {
    return 'product';
  }
  
  if (lowerName.includes('banner') || lowerName.includes('header') || lowerName.includes('hero')) {
    return 'banner';
  }
  
  if (lowerName.includes('thumb') || lowerName.includes('thumbnail')) {
    return 'thumbnail';
  }
  
  if (lowerName.includes('avatar') || lowerName.includes('profile')) {
    return 'avatar';
  }
  
  if (lowerName.includes('background') || lowerName.includes('bg') || lowerName.includes('wallpaper')) {
    return 'background';
  }
  
  if (width && height) {
    const aspectRatio = width / height;
    if (aspectRatio > 2.5) return 'banner';
    if (aspectRatio > 0.9 && aspectRatio < 1.1 && width * height < 500000) return 'thumbnail';
    if (width * height > 2000000) return 'photo';
  }
  
  return 'image';
}

function generateShortDescription(
  width: number,
  height: number,
  hasTransparency: boolean,
  filename: string
): string {
  const descriptors: string[] = [];
  
  const colors = ['black', 'white', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink'];
  const lowerName = filename.toLowerCase();
  const foundColor = colors.find(color => lowerName.includes(color));
  if (foundColor) descriptors.push(foundColor);
  
  if (width && height) {
    const area = width * height;
    if (area > 5000000) descriptors.push('large');
    else if (area < 500000) descriptors.push('small');
    
    const aspectRatio = width / height;
    if (aspectRatio > 1.5) descriptors.push('wide');
    else if (aspectRatio < 0.67) descriptors.push('tall');
    else if (aspectRatio > 0.9 && aspectRatio < 1.1) descriptors.push('square');
  }
  
  if (hasTransparency) descriptors.push('transparent');
  if (descriptors.length === 0) descriptors.push('optimized');
  
  return descriptors.join('-');
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export interface ConversionResult {
  blob: Blob;
  seoName: string;
  width: number;
  height: number;
  hasTransparency: boolean;
}

// Smart compression to target under 50KB while maintaining quality
function calculateOptimalQuality(
  originalSize: number,
  targetSize: number = 50 * 1024
): number {
  // Keep quality higher to maintain visual quality
  const ratio = targetSize / originalSize;
  
  if (ratio >= 1) return 90; // Already small enough
  if (ratio >= 0.5) return 85;
  if (ratio >= 0.3) return 80;
  if (ratio >= 0.2) return 75;
  if (ratio >= 0.1) return 70;
  return 65; // Minimum quality to maintain visual appearance
}

// Calculate optimal resize dimensions for target size
// Prioritize dimension reduction over quality loss
function calculateOptimalDimensions(
  width: number,
  height: number,
  originalSize: number,
  targetSize: number = 50 * 1024
): { width: number; height: number } {
  // Don't resize if already small
  if (originalSize <= targetSize) {
    return { width, height };
  }
  
  // Calculate how much we need to reduce
  const currentPixels = width * height;
  const reductionRatio = targetSize / originalSize;
  
  // Apply a more conservative scale - reduce dimensions instead of quality
  // sqrt because pixels = width * height
  const scale = Math.sqrt(reductionRatio * 1.5); // 1.5 factor to be less aggressive
  
  // Don't go below 50% of original dimensions (quality preservation)
  const minScale = 0.5;
  const finalScale = Math.max(scale, minScale);
  
  // Don't upscale
  if (finalScale >= 1) {
    return { width, height };
  }
  
  return {
    width: Math.round(width * finalScale),
    height: Math.round(height * finalScale),
  };
}

export function convertImage(
  file: File,
  quality: number,
  isLossless: boolean,
  format: OutputFormat = 'webp',
  resizeWidth?: number,
  resizeHeight?: number,
  maintainAspectRatio?: boolean,
  maxCompress?: boolean,
  targetSize: number = 50 * 1024
): Promise<ConversionResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to create canvas context'));
          return;
        }
        
        let targetWidth = img.width;
        let targetHeight = img.height;
        
        // If max compress mode, calculate optimal dimensions first
        if (maxCompress && !resizeWidth && !resizeHeight) {
          const optimal = calculateOptimalDimensions(
            img.width,
            img.height,
            file.size,
            targetSize
          );
          targetWidth = optimal.width;
          targetHeight = optimal.height;
        } else if (resizeWidth || resizeHeight) {
          const aspectRatio = img.width / img.height;
          if (resizeWidth && resizeHeight) {
            targetWidth = resizeWidth;
            targetHeight = resizeHeight;
            if (maintainAspectRatio) {
              if (targetWidth / targetHeight > aspectRatio) {
                targetWidth = Math.round(targetHeight * aspectRatio);
              } else {
                targetHeight = Math.round(targetWidth / aspectRatio);
              }
            }
          } else if (resizeWidth) {
            targetWidth = resizeWidth;
            if (maintainAspectRatio) {
              targetHeight = Math.round(targetWidth / aspectRatio);
            }
          } else if (resizeHeight) {
            targetHeight = resizeHeight;
            if (maintainAspectRatio) {
              targetWidth = Math.round(targetHeight * aspectRatio);
            }
          }
        }
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        // Use better quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        // Check for transparency
        let hasTransparency = false;
        if (file.type === 'image/png') {
          try {
            const imageData = ctx.getImageData(0, 0, Math.min(100, targetWidth), Math.min(100, targetHeight));
            const data = imageData.data;
            for (let i = 3; i < data.length; i += 4) {
              if (data[i] < 255) {
                hasTransparency = true;
                break;
              }
            }
          } catch {
            hasTransparency = true;
          }
        }
        
        // Calculate quality based on compression mode
        // Use maximum quality (1.0) by default to preserve image quality
        let conversionQuality: number;
        if (isLossless) {
          conversionQuality = 1.0;
        } else if (maxCompress) {
          conversionQuality = calculateOptimalQuality(file.size, targetSize) / 100;
        } else {
          // Use user's quality setting but ensure it's always high enough
          // Minimum 0.92 to prevent visible quality loss
          conversionQuality = Math.max(quality / 100, 0.92);
        }
        
        const formatInfo = OUTPUT_FORMATS.find(f => f.value === format);
        const mimeType = formatInfo?.mime || 'image/webp';
        
        // For PNG format, quality doesn't apply the same way
        const qualityArg = format === 'png' ? undefined : conversionQuality;
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const seoName = generateSEOFilename(file.name, targetWidth, targetHeight, hasTransparency, format);
              resolve({ blob, seoName, width: targetWidth, height: targetHeight, hasTransparency });
            } else {
              reject(new Error(`${format.toUpperCase()} conversion failed`));
            }
          },
          mimeType,
          qualityArg
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// Legacy function for backwards compatibility
export function convertToWebP(
  file: File,
  quality: number,
  isLossless: boolean,
  resizeWidth?: number,
  resizeHeight?: number,
  maintainAspectRatio?: boolean
): Promise<ConversionResult> {
  return convertImage(file, quality, isLossless, 'webp', resizeWidth, resizeHeight, maintainAspectRatio);
}
