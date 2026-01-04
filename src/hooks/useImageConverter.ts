import { useState, useCallback } from 'react';
import { convertImage, ConversionResult, OutputFormat } from '@/lib/imageUtils';
import { generateSEOMetadata, SEOAnalysis } from '@/lib/seoUtils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export interface SEOMetadata {
  imageType: string;
  aspectRatioLabel: string;
  isTransparent: boolean;
  filename: string;
  altText: string;
  titleText: string;
}

export interface ImageFile {
  id: string;
  originalFile: File;
  convertedBlob: Blob | null;
  converted: boolean;
  converting: boolean;
  convertedSize: number;
  reduction: number;
  saved: number;
  seoName: string;
  width: number;
  height: number;
  preview: string;
  convertedPreview: string;
  seoMetadata: SEOMetadata | null;
  aiAnalyzing: boolean;
  aiAnalyzed: boolean;
  aiContent?: string;
  aiDetectedText?: string;
}

export interface ConversionSettings {
  quality: number;
  isLossless: boolean;
  autoConvert: boolean;
  resizeWidth: number | undefined;
  resizeHeight: number | undefined;
  maintainAspectRatio: boolean;
  outputFormat: OutputFormat;
  maxCompress: boolean;
  enableAIAnalysis: boolean;
  targetSize: number;
  focusKeyword: string;
}

const defaultSettings: ConversionSettings = {
  quality: 80,
  isLossless: false,
  autoConvert: true,
  resizeWidth: undefined,
  resizeHeight: undefined,
  maintainAspectRatio: true,
  outputFormat: 'webp',
  maxCompress: true,
  targetSize: 50,
  focusKeyword: '',
  enableAIAnalysis: true,
};

export function useImageConverter() {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<ConversionSettings>(() => {
    const saved = localStorage.getItem('imageConverterSettings');
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  const updateSettings = useCallback((newSettings: Partial<ConversionSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('imageConverterSettings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
    localStorage.removeItem('imageConverterSettings');
  }, []);

  const addFiles = useCallback(async (newFiles: FileList | File[]) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff', 'image/webp'];
    const validFiles = Array.from(newFiles).filter(file => validTypes.includes(file.type));
    
    if (validFiles.length === 0) {
      toast.error('Please select valid image files (JPG, PNG, GIF, BMP, TIFF, WebP)');
      return;
    }

    const imageFiles: ImageFile[] = await Promise.all(
      validFiles.map(async (file) => {
        const preview = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });

        return {
          id: crypto.randomUUID(),
          originalFile: file,
          convertedBlob: null,
          converted: false,
          converting: false,
          convertedSize: 0,
          reduction: 0,
          saved: 0,
          seoName: '',
          width: 0,
          height: 0,
          preview,
          convertedPreview: '',
          seoMetadata: null,
          aiAnalyzing: false,
          aiAnalyzed: false,
        };
      })
    );

    setFiles(prev => [...prev, ...imageFiles]);

    // Auto-convert if enabled
    if (settings.autoConvert) {
      for (const imageFile of imageFiles) {
        convertFileWithSettings(imageFile.id, settings);
      }
    }
  }, [settings]);

  const analyzeImageWithAI = useCallback(async (id: string, imageBase64: string, focusKeyword: string): Promise<{
    filename: string;
    altText: string;
    titleText: string;
    imageType: string;
    detectedContent?: string;
    detectedText?: string;
  } | null> => {
    try {
      setFiles(prev => prev.map(f => 
        f.id === id ? { ...f, aiAnalyzing: true } : f
      ));

      const { data, error } = await supabase.functions.invoke('analyze-image', {
        body: { imageBase64, focusKeyword }
      });

      if (error || data?.error) {
        console.error('AI analysis error:', error || data?.error);
        const errorMessage = data?.code === 'CREDITS_EXHAUSTED' 
          ? 'AI credits exhausted. Using basic SEO generation.'
          : 'AI analysis failed. Using fallback SEO generation.';
        toast.error(errorMessage);
        return null;
      }

      setFiles(prev => prev.map(f => 
        f.id === id ? { 
          ...f, 
          aiAnalyzing: false, 
          aiAnalyzed: true,
          aiContent: data.detectedContent,
          aiDetectedText: data.detectedText,
        } : f
      ));

      return {
        filename: data.filename,
        altText: data.altText,
        titleText: data.titleText,
        imageType: data.detectedType,
        detectedContent: data.detectedContent,
        detectedText: data.detectedText,
      };
    } catch (error) {
      console.error('AI analysis failed:', error);
      setFiles(prev => prev.map(f => 
        f.id === id ? { ...f, aiAnalyzing: false } : f
      ));
      return null;
    }
  }, []);

  const convertFileWithSettings = useCallback(async (id: string, currentSettings: ConversionSettings) => {
    setFiles(prev => prev.map(f => 
      f.id === id ? { ...f, converting: true } : f
    ));

    const file = await new Promise<ImageFile | undefined>(resolve => {
      setFiles(prev => {
        const found = prev.find(f => f.id === id);
        resolve(found);
        return prev;
      });
    });

    if (!file) return;

    try {
      const result = await convertImage(
        file.originalFile,
        currentSettings.quality,
        currentSettings.isLossless,
        currentSettings.outputFormat,
        currentSettings.resizeWidth,
        currentSettings.resizeHeight,
        currentSettings.maintainAspectRatio,
        currentSettings.maxCompress,
        currentSettings.targetSize * 1024
      );

      const originalSize = file.originalFile.size;
      const convertedSize = result.blob.size;
      const reduction = ((originalSize - convertedSize) / originalSize * 100);
      const saved = originalSize - convertedSize;
      
      // Create preview URL for converted image
      const convertedPreview = URL.createObjectURL(result.blob);

      // Try AI analysis if enabled
      let seoMetadata;
      if (currentSettings.enableAIAnalysis) {
        const aiResult = await analyzeImageWithAI(id, file.preview, currentSettings.focusKeyword);
        if (aiResult) {
          seoMetadata = {
            imageType: aiResult.imageType,
            aspectRatioLabel: '', // Will be filled from basic analysis
            isTransparent: result.hasTransparency,
            filename: aiResult.filename.endsWith(`.${currentSettings.outputFormat}`) 
              ? aiResult.filename 
              : aiResult.filename.replace(/\.[^.]+$/, '') + `.${currentSettings.outputFormat}`,
            altText: aiResult.altText,
            titleText: aiResult.titleText,
          };
        }
      }

      // Fallback to basic SEO generation if AI is disabled or failed
      if (!seoMetadata) {
        seoMetadata = generateSEOMetadata(
          currentSettings.focusKeyword,
          result.width,
          result.height,
          result.hasTransparency,
          currentSettings.outputFormat
        );
      }

      setFiles(prev => prev.map(f => 
        f.id === id ? {
          ...f,
          convertedBlob: result.blob,
          converted: true,
          converting: false,
          convertedSize,
          reduction,
          saved,
          seoName: seoMetadata.filename,
          width: result.width,
          height: result.height,
          convertedPreview,
          seoMetadata,
        } : f
      ));
    } catch (error) {
      console.error('Conversion failed:', error);
      setFiles(prev => prev.map(f => 
        f.id === id ? { ...f, converting: false, aiAnalyzing: false } : f
      ));
    }
  }, [analyzeImageWithAI]);

  const convertFile = useCallback((id: string) => {
    convertFileWithSettings(id, settings);
  }, [settings, convertFileWithSettings]);

  const reconvertAllFiles = useCallback(() => {
    files.forEach(file => {
      convertFileWithSettings(file.id, settings);
    });
  }, [files, settings, convertFileWithSettings]);

  const updateFileName = useCallback((id: string, newName: string) => {
    setFiles(prev => prev.map(f => {
      if (f.id !== id) return f;
      const formatExt = settings.outputFormat === 'jpeg' ? '.jpg' : `.${settings.outputFormat}`;
      const cleanName = newName.replace(/\.[^.]+$/, '');
      return { 
        ...f, 
        seoName: cleanName + formatExt,
        seoMetadata: f.seoMetadata ? { ...f.seoMetadata, filename: cleanName + formatExt } : null,
      };
    }));
  }, [settings.outputFormat]);

  const updateSEOMetadata = useCallback((id: string, seo: Partial<SEOMetadata>) => {
    setFiles(prev => prev.map(f => {
      if (f.id !== id || !f.seoMetadata) return f;
      const updated = { ...f.seoMetadata, ...seo };
      return {
        ...f,
        seoMetadata: updated,
        seoName: updated.filename,
      };
    }));
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.convertedPreview) {
        URL.revokeObjectURL(file.convertedPreview);
      }
      return prev.filter(f => f.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    files.forEach(file => {
      if (file.convertedPreview) {
        URL.revokeObjectURL(file.convertedPreview);
      }
    });
    setFiles([]);
  }, [files]);

  const downloadFile = useCallback((id: string) => {
    const file = files.find(f => f.id === id);
    if (!file?.convertedBlob) return;

    const url = URL.createObjectURL(file.convertedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.seoName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [files]);

  return {
    files,
    settings,
    updateSettings,
    resetSettings,
    addFiles,
    convertFile,
    reconvertAllFiles,
    updateFileName,
    updateSEOMetadata,
    removeFile,
    clearAll,
    downloadFile,
  };
}
