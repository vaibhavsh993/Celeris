'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isUploading: boolean;
}

export default function FileUpload({ onFileUpload, isUploading }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);
  
  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop,
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false),
  });

  return (
    <div 
      {...getRootProps()} 
      className={`
        w-full p-12 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 relative overflow-hidden
        ${dragActive 
          ? 'border-purple-400 bg-purple-500/10 shadow-[0_0_30px_rgba(139,92,246,0.3)]' 
          : 'border-slate-600 hover:border-purple-500 hover:bg-slate-700/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]'
        }
        ${isUploading ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      <input {...getInputProps()} />
      
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative flex flex-col items-center justify-center space-y-4">
        <div className={`p-4 rounded-full transition-all duration-300 ${
          dragActive 
            ? 'bg-purple-500/20 scale-110' 
            : 'bg-slate-700/50 hover:bg-purple-500/20 hover:scale-105'
        }`}>
          <FiUpload className={`w-8 h-8 transition-colors duration-300 ${
            dragActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-purple-400'
          }`} />
        </div>
        
        <div className="space-y-2">
          <p className="text-lg font-medium text-slate-200">
            {dragActive ? 'Drop your file here' : 'Drag & drop a file here, or click to select'}
          </p>
          <p className="text-sm text-slate-400">
            Share any file with your peers securely
          </p>
        </div>
        
        {/* Subtle animation dots */}
        <div className="flex space-x-1 mt-4">
          <div className="w-2 h-2 bg-purple-500/30 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-2 h-2 bg-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </div>
  );
}
