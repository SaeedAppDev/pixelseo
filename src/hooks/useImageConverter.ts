import { useState, useCallback } from 'react';
import { convertToWebP, ConversionResult } from '@/lib/imageUtils';

export interface ImageFile {
  id: string;
  originalFile: File;
  webpBlob: Blob | null;
  converted: boolean;
  converting: boolean;
  webpSize: number;
  reduction: number;
  saved: number;
  seoName: string;
  width: number;
  height: number;
  preview: string;
}

export interface ConversionSettings {
  quality: number;
  isLossless: boolean;
  autoConvert: boolean;
  resizeWidth: number | undefined;
  resizeHeight: number | undefined;
  maintainAspectRatio: boolean;
}

const defaultSettings: ConversionSettings = {
  quality: 90,
  isLossless: false,
  autoConvert: true,
  resizeWidth: undefined,
  resizeHeight: undefined,
  maintainAspectRatio: true,
};

export function useImageConverter() {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<ConversionSettings>(() => {
    const saved = localStorage.getItem('webpSettings');
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
      localStorage.setItem('webpSettings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
    localStorage.removeItem('webpSettings');
  }, []);

  const addFiles = useCallback(async (newFiles: FileList | File[]) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const validFiles = Array.from(newFiles).filter(file => validTypes.includes(file.type));
    
    if (validFiles.length === 0) return;

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
          webpBlob: null,
          converted: false,
          converting: false,
          webpSize: 0,
          reduction: 0,
          saved: 0,
          seoName: '',
          width: 0,
          height: 0,
          preview,
        };
      })
    );

    setFiles(prev => [...prev, ...imageFiles]);

    // Auto-convert if enabled
    if (settings.autoConvert) {
      for (const imageFile of imageFiles) {
        convertFile(imageFile.id);
      }
    }
  }, [settings.autoConvert]);

  const convertFile = useCallback(async (id: string) => {
    setFiles(prev => prev.map(f => 
      f.id === id ? { ...f, converting: true } : f
    ));

    const file = files.find(f => f.id === id) || 
      await new Promise<ImageFile | undefined>(resolve => {
        setFiles(prev => {
          const found = prev.find(f => f.id === id);
          resolve(found);
          return prev;
        });
      });

    if (!file) return;

    try {
      const result = await convertToWebP(
        file.originalFile,
        settings.quality,
        settings.isLossless,
        settings.resizeWidth,
        settings.resizeHeight,
        settings.maintainAspectRatio
      );

      const originalSize = file.originalFile.size;
      const webpSize = result.blob.size;
      const reduction = ((originalSize - webpSize) / originalSize * 100);
      const saved = originalSize - webpSize;

      setFiles(prev => prev.map(f => 
        f.id === id ? {
          ...f,
          webpBlob: result.blob,
          converted: true,
          converting: false,
          webpSize,
          reduction,
          saved,
          seoName: result.seoName,
          width: result.width,
          height: result.height,
        } : f
      ));
    } catch (error) {
      console.error('Conversion failed:', error);
      setFiles(prev => prev.map(f => 
        f.id === id ? { ...f, converting: false } : f
      ));
    }
  }, [files, settings]);

  const updateFileName = useCallback((id: string, newName: string) => {
    setFiles(prev => prev.map(f => 
      f.id === id ? { 
        ...f, 
        seoName: newName.endsWith('.webp') ? newName : newName + '.webp' 
      } : f
    ));
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setFiles([]);
  }, []);

  const downloadFile = useCallback((id: string) => {
    const file = files.find(f => f.id === id);
    if (!file?.webpBlob) return;

    const url = URL.createObjectURL(file.webpBlob);
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
    updateFileName,
    removeFile,
    clearAll,
    downloadFile,
  };
}
