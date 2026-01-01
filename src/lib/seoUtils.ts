import { OutputFormat, OUTPUT_FORMATS } from './imageUtils';

export interface SEOAnalysis {
  imageType: string;
  aspectRatioLabel: string;
  isTransparent: boolean;
  filename: string;
  altText: string;
  titleText: string;
}

// Classify image type based purely on dimensions and aspect ratio
export function classifyImageType(
  width: number,
  height: number,
  hasTransparency: boolean
): string {
  const aspectRatio = width / height;
  const pixels = width * height;

  // Logo detection: small, often square or wide, typically transparent
  if (hasTransparency && pixels < 500000) {
    if (aspectRatio > 0.8 && aspectRatio < 1.25) return 'logo';
    if (aspectRatio > 2) return 'logo-wide';
    return 'logo';
  }

  // Banner: very wide aspect ratio
  if (aspectRatio > 2.5) return 'banner';
  if (aspectRatio > 1.8 && aspectRatio <= 2.5) return 'header';

  // Screenshot: typically 16:9 or similar with larger dimensions
  if (aspectRatio > 1.5 && aspectRatio <= 1.85 && pixels > 500000) return 'screenshot';

  // Portrait images
  if (aspectRatio < 0.67) return 'portrait';

  // Square-ish images
  if (aspectRatio > 0.9 && aspectRatio < 1.1) {
    if (pixels < 250000) return 'thumbnail';
    if (pixels < 1000000) return 'product';
    return 'photo';
  }

  // Large images are likely photos
  if (pixels > 2000000) return 'photo';

  // Default to image
  return 'image';
}

// Get human-readable aspect ratio label
export function getAspectRatioLabel(width: number, height: number): string {
  const ratio = width / height;
  
  if (ratio > 2.3) return 'Ultra-wide';
  if (ratio > 1.7 && ratio <= 2.3) return 'Wide (16:9)';
  if (ratio > 1.3 && ratio <= 1.7) return 'Landscape (4:3)';
  if (ratio > 0.9 && ratio <= 1.1) return 'Square (1:1)';
  if (ratio > 0.7 && ratio <= 0.9) return 'Portrait (3:4)';
  if (ratio > 0.5 && ratio <= 0.7) return 'Tall (9:16)';
  return 'Very Tall';
}

// Generate SEO-optimized filename
export function generateSEOFilename(
  focusKeyword: string,
  imageType: string,
  format: OutputFormat
): string {
  const formatInfo = OUTPUT_FORMATS.find(f => f.value === format);
  const ext = formatInfo?.ext || '.webp';
  
  // Clean and format the focus keyword
  const cleanKeyword = focusKeyword
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  if (!cleanKeyword) {
    return `optimized-${imageType}${ext}`;
  }
  
  return `${cleanKeyword}-${imageType}${ext}`;
}

// Generate ALT text
export function generateAltText(
  focusKeyword: string,
  imageType: string,
  width: number,
  height: number
): string {
  const keyword = focusKeyword.trim();
  
  if (!keyword) {
    return `Optimized ${imageType} image`;
  }

  const typeDescriptions: Record<string, string> = {
    'logo': 'logo',
    'logo-wide': 'wide logo',
    'banner': 'banner',
    'header': 'header image',
    'screenshot': 'screenshot',
    'portrait': 'portrait image',
    'thumbnail': 'thumbnail',
    'product': 'product image',
    'photo': 'photo',
    'image': 'image',
  };

  const typeDesc = typeDescriptions[imageType] || 'image';
  
  // Capitalize first letter of keyword
  const capitalizedKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);
  
  return `${capitalizedKeyword} ${typeDesc}`;
}

// Generate TITLE text
export function generateTitleText(
  focusKeyword: string,
  imageType: string,
  width: number,
  height: number
): string {
  const keyword = focusKeyword.trim();
  
  if (!keyword) {
    return `Optimized ${imageType} - ${width}x${height}`;
  }

  const capitalizedKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);
  
  const typeLabels: Record<string, string> = {
    'logo': 'Logo',
    'logo-wide': 'Wide Logo',
    'banner': 'Banner',
    'header': 'Header',
    'screenshot': 'Screenshot',
    'portrait': 'Portrait',
    'thumbnail': 'Thumbnail',
    'product': 'Product Image',
    'photo': 'Photo',
    'image': 'Image',
  };

  const typeLabel = typeLabels[imageType] || 'Image';
  
  return `${capitalizedKeyword} - ${typeLabel}`;
}

// Main function to generate all SEO metadata
export function generateSEOMetadata(
  focusKeyword: string,
  width: number,
  height: number,
  hasTransparency: boolean,
  format: OutputFormat
): SEOAnalysis {
  const imageType = classifyImageType(width, height, hasTransparency);
  const aspectRatioLabel = getAspectRatioLabel(width, height);
  
  return {
    imageType,
    aspectRatioLabel,
    isTransparent: hasTransparency,
    filename: generateSEOFilename(focusKeyword, imageType, format),
    altText: generateAltText(focusKeyword, imageType, width, height),
    titleText: generateTitleText(focusKeyword, imageType, width, height),
  };
}
