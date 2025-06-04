import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { 
  Upload,
  X, 
  ArrowRight, 
  Loader2,
  FolderOpen
} from 'lucide-react';

import EffectSelector from '../components/EffectSelector';
import ProgressBar from '../components/ProgressBar';

interface FileWithPreview extends File {
  preview: string;
}

const effects = [
  { id: 'banner-unroll', name: 'Banner Unroll', description: 'Elegant unrolling animation' },
  { id: 'zoom-shine', name: 'Zoom & Shine', description: 'Zoom with light effects' },
  { id: '3d-rotate', name: '3D Rotate', description: '360° product rotation' },
  { id: 'color-splash', name: 'Color Splash', description: 'Dramatic color reveal' },
  { id: 'particle-burst', name: 'Particle Burst', description: 'Explosive particle animation' },
];

const Create: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<FileWithPreview | null>(null);
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file)
        });
        setUploadedFile(fileWithPreview);
        setActiveStep(2);
      }
    }
  });

  const handleSelectEffect = (effectId: string) => {
    setSelectedEffect(effectId);
    setActiveStep(3);
  };

  const handleRemoveImage = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.preview);
    }
    setUploadedFile(null);
    setSelectedEffect(null);
    setActiveStep(1);
  };

  const simulateVideoGeneration = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          toast.success("Video generated successfully!");
          navigate('/gallery');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleGenerateVideo = () => {
    if (!uploadedFile || !selectedEffect) return;
    
    // In a real implementation, we would upload the file to the backend
    // and initiate the video generation process
    simulateVideoGeneration();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Create Your CGI Advertisement</h1>
        
        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${activeStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <div className={`w-16 h-1 ${activeStep >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${activeStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <div className={`w-16 h-1 ${activeStep >= 3 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${activeStep >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm mt-2 max-w-xs mx-auto">
            <span className={activeStep >= 1 ? 'text-primary-600' : 'text-gray-600'}>Upload</span>
            <span className={activeStep >= 2 ? 'text-primary-600' : 'text-gray-600'}>Select Effect</span>
            <span className={activeStep >= 3 ? 'text-primary-600' : 'text-gray-600'}>Generate</span>
          </div>
        </div>
        
        {/* Step 1: Upload Image */}
        {activeStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card"
          >
            <h2 className="text-xl font-semibold mb-6">Upload Product Image</h2>
            
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center">
                <Upload 
                  className={`h-12 w-12 mb-4 ${isDragActive ? 'text-primary-600' : 'text-gray-400'}`} 
                />
                <p className="text-lg font-medium mb-2">
                  {isDragActive ? 'Drop your image here' : 'Drag & drop your product image'}
                </p>
                <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                <p className="text-xs text-gray-400">Supports JPG, PNG - Max 10MB</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3">Image requirements:</h3>
              <ul className="list-disc pl-5 text-gray-600">
                <li>High quality product image</li>
                <li>Neutral or transparent background preferred</li>
                <li>Clear focus on the product</li>
                <li>Minimum resolution: 1080x1080px</li>
              </ul>
            </div>
          </motion.div>
        )}
        
        {/* Step 2: Select Effect */}
        {activeStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Preview Section */}
              <div className="md:w-1/3">
                <div className="card">
                  <h2 className="text-xl font-semibold mb-4">Your Product</h2>
                  <div className="relative">
                    {uploadedFile && (
                      <>
                        <img 
                          src={uploadedFile.preview} 
                          alt="Uploaded product" 
                          className="w-full h-auto rounded-md"
                        />
                        <button 
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>{uploadedFile?.name}</p>
                    <p>{Math.round(uploadedFile?.size || 0 / 1024)} KB</p>
                  </div>
                </div>
              </div>
              
              {/* Effects Section */}
              <div className="md:w-2/3">
                <div className="card">
                  <h2 className="text-xl font-semibold mb-6">Select CGI Effect</h2>
                  <EffectSelector
                    effects={effects}
                    selectedEffect={selectedEffect}
                    onSelectEffect={handleSelectEffect}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Step 3: Generate Video */}
        {activeStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card"
          >
            <h2 className="text-xl font-semibold mb-6">Generate Your Video</h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                {uploadedFile && (
                  <div className="relative">
                    <img 
                      src={uploadedFile.preview} 
                      alt="Uploaded product" 
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                )}
              </div>
              
              <div className="md:w-2/3">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Selected Effect</h3>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="font-medium text-primary-600">
                      {effects.find(e => e.id === selectedEffect)?.name || "No effect selected"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {effects.find(e => e.id === selectedEffect)?.description}
                    </p>
                  </div>
                </div>
                
                {isGenerating ? (
                  <div className="mt-8">
                    <p className="text-center text-lg font-medium mb-4">Generating your video...</p>
                    <ProgressBar progress={generationProgress} />
                    <p className="text-center text-sm text-gray-500 mt-2">
                      This may take up to 30 seconds
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4 mt-6">
                    <button 
                      onClick={handleGenerateVideo} 
                      className="btn btn-primary"
                    >
                      Generate Video
                    </button>
                    <button 
                      onClick={() => setActiveStep(2)} 
                      className="btn btn-outline"
                    >
                      Change Effect
                    </button>
                    <button 
                      onClick={handleRemoveImage} 
                      className="btn btn-outline"
                    >
                      Upload New Image
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Create;