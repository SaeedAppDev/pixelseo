import JSZip from 'jszip';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { UploadArea } from '@/components/UploadArea';
import { SettingsPanel } from '@/components/SettingsPanel';
import { FileList } from '@/components/FileList';
import { SummarySection } from '@/components/SummarySection';
import { InfoSection } from '@/components/InfoSection';
import { useImageConverter } from '@/hooks/useImageConverter';

const Index = () => {
  const {
    files,
    settings,
    updateSettings,
    resetSettings,
    addFiles,
    updateFileName,
    removeFile,
    clearAll,
    downloadFile,
  } = useImageConverter();

  const handleFilesSelected = (fileList: FileList) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const validFiles = Array.from(fileList).filter(file => validTypes.includes(file.type));
    
    if (validFiles.length === 0) {
      toast.error('Please select valid image files (JPG, JPEG, PNG)');
      return;
    }

    addFiles(fileList);
    toast.success(`${validFiles.length} file(s) added for conversion`);
  };

  const handleDownloadAll = async () => {
    const convertedFiles = files.filter(f => f.converted && f.webpBlob);
    if (convertedFiles.length === 0) {
      toast.error('No converted files available');
      return;
    }

    try {
      const zip = new JSZip();
      convertedFiles.forEach((file) => {
        if (file.webpBlob) {
          zip.file(file.seoName || `image.webp`, file.webpBlob);
        }
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'webp-images.zip';
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

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Header />
        <UploadArea onFilesSelected={handleFilesSelected} />
        <SettingsPanel
          settings={settings}
          onUpdateSettings={updateSettings}
          onResetSettings={resetSettings}
        />
        <FileList
          files={files}
          onUpdateFileName={updateFileName}
          onDownload={downloadFile}
          onRemove={removeFile}
          onDownloadAll={handleDownloadAll}
          onClearAll={handleClearAll}
        />
        <SummarySection files={files} />
        <InfoSection />
      </div>
    </main>
  );
};

export default Index;
