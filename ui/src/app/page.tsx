'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import FileDownload from '@/components/FileDownload';
import InviteCode from '@/components/InviteCode';
import axios from 'axios';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [port, setPort] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'download'>('upload');

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setPort(response.data.port);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleDownload = async (port: number) => {
    setIsDownloading(true);
    
    try {
      // Request download from Java backend
      const response = await axios.get(`/api/download/${port}`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Try to get filename from response headers
      // Axios normalizes headers to lowercase, but we need to handle different cases
      const headers = response.headers;
      let contentDisposition = '';
      
      // Look for content-disposition header regardless of case
      for (const key in headers) {
        if (key.toLowerCase() === 'content-disposition') {
          contentDisposition = headers[key];
          break;
        }
      }
      
      let filename = 'downloaded-file';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch.length === 2) {
          filename = filenameMatch[1];
        }
      }
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please check the invite code and try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl relative">
      <header className="text-center mb-12">
        <div className="relative inline-block">
          <h1 className="text-6xl font-bold text-accent mb-4 relative">
            Celeris
          </h1>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-20 animate-pulse"></div>
        </div>
        <p className="text-xl text-slate-300 font-light">Secure P2P File Sharing</p>
        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      </header>
      
      <div className="card-dark p-8 glow-effect">
        <div className="flex border-b border-slate-600 mb-8">
          <button
            className={`px-6 py-3 font-medium rounded-t-lg transition-all duration-300 ${
              activeTab === 'upload'
                ? 'text-purple-400 border-b-2 border-purple-400 bg-slate-700/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            Share a File
          </button>
          <button
            className={`px-6 py-3 font-medium rounded-t-lg transition-all duration-300 ${
              activeTab === 'download'
                ? 'text-purple-400 border-b-2 border-purple-400 bg-slate-700/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
            }`}
            onClick={() => setActiveTab('download')}
          >
            Receive a File
          </button>
        </div>
        
        {activeTab === 'upload' ? (
          <div>
            <FileUpload onFileUpload={handleFileUpload} isUploading={isUploading} />
            
            {uploadedFile && !isUploading && (
              <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-sm text-slate-300">
                  Selected file: <span className="font-medium text-purple-400">{uploadedFile.name}</span> 
                  <span className="text-slate-400"> ({Math.round(uploadedFile.size / 1024)} KB)</span>
                </p>
              </div>
            )}
            
            {isUploading && (
              <div className="mt-8 text-center">
                <div className="inline-block relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500/30 border-t-purple-500"></div>
                  <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-4 border-purple-500/20"></div>
                </div>
                <p className="mt-4 text-slate-300 font-medium">Uploading file...</p>
              </div>
            )}
            
            <InviteCode port={port} />
          </div>
        ) : (
          <div>
            <FileDownload onDownload={handleDownload} isDownloading={isDownloading} />
            
            {isDownloading && (
              <div className="mt-8 text-center">
                <div className="inline-block relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500/30 border-t-blue-500"></div>
                  <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-4 border-blue-500/20"></div>
                </div>
                <p className="mt-4 text-slate-300 font-medium">Downloading file...</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <footer className="mt-12 text-center">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-6"></div>
        <p className="text-slate-400 text-sm font-light">
          Celeris &copy; {new Date().getFullYear()} - Secure P2P File Sharing
        </p>
      </footer>
    </div>
  );
}
