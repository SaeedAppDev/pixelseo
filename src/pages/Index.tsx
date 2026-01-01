import JSZip from 'jszip';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FeaturesSection } from '@/components/FeaturesSection';
import { UploadArea } from '@/components/UploadArea';
import { SettingsPanel } from '@/components/SettingsPanel';
import { FileList } from '@/components/FileList';
import { SummarySection } from '@/components/SummarySection';
import { InfoSection } from '@/components/InfoSection';
import { SocialShareButtons } from '@/components/SocialShareButtons';
import { StructuredData } from '@/components/StructuredData';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { useImageConverter } from '@/hooks/useImageConverter';
import { OUTPUT_FORMATS } from '@/lib/imageUtils';

const Index = () => {
  const {
    files,
    settings,
    updateSettings,
    resetSettings,
    addFiles,
    reconvertAllFiles,
    updateSEOMetadata,
    removeFile,
    clearAll,
    downloadFile,
  } = useImageConverter();

  const handleFilesSelected = (fileList: FileList) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff'];
    const validFiles = Array.from(fileList).filter(file => validTypes.includes(file.type));
    
    if (validFiles.length === 0) {
      toast.error('Please select valid image files (JPG, PNG, GIF, BMP, TIFF)');
      return;
    }

    addFiles(fileList);
    toast.success(`${validFiles.length} file(s) added for conversion`);
  };

  const handleDownloadAll = async () => {
    const convertedFiles = files.filter(f => f.converted && f.convertedBlob);
    if (convertedFiles.length === 0) {
      toast.error('No converted files available');
      return;
    }

    try {
      const zip = new JSZip();
      convertedFiles.forEach((file) => {
        if (file.convertedBlob) {
          zip.file(file.seoName || `image.${settings.outputFormat}`, file.convertedBlob);
        }
      });

      const formatInfo = OUTPUT_FORMATS.find(f => f.value === settings.outputFormat);
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formatInfo?.label.toLowerCase() || 'images'}-converted.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('ZIP file downloaded successfully');
    } catch (error) {
      toast.error('Failed to create ZIP file');
    }
  };

  const handleClearAll = () => {
    if (files.length === 0) return;
    clearAll();
    toast.success('All files cleared');
  };

  const handleReconvert = () => {
    if (files.length === 0) return;
    reconvertAllFiles();
    toast.success('Re-converting all files with new settings');
  };

  return (
    <main className="min-h-screen bg-background">
      <StructuredData />
      <ScrollProgressBar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Header />
        <UploadArea onFilesSelected={handleFilesSelected} />
        <SettingsPanel
          settings={settings}
          onUpdateSettings={updateSettings}
          onResetSettings={resetSettings}
          onReconvert={handleReconvert}
          hasFiles={files.length > 0}
        />
        <FileList
          files={files}
          focusKeyword={settings.focusKeyword}
          onUpdateSEO={updateSEOMetadata}
          onDownload={downloadFile}
          onRemove={removeFile}
          onDownloadAll={handleDownloadAll}
          onClearAll={handleClearAll}
        />
        <SummarySection files={files} />
        <FeaturesSection />
        <InfoSection />
        <div className="my-6">
          <SocialShareButtons title="PixelSEO - AI Image Optimizer for SEO" />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Index;
