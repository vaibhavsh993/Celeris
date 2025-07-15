'use client';

import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

interface FileDownloadProps {
  onDownload: (port: number) => Promise<void>;
  isDownloading: boolean;
}

export default function FileDownload({ onDownload, isDownloading }: FileDownloadProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const port = parseInt(inviteCode.trim(), 10);
    if (isNaN(port) || port <= 0 || port > 65535) {
      setError('Please enter a valid port number (1-65535)');
      return;
    }
    
    try {
      await onDownload(port);
    } catch (err) {
      setError('Failed to download the file. Please check the invite code and try again.');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="card-accent p-6 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
        
        <div className="relative">
          <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center">
            <FiDownload className="mr-2" />
            Receive a File
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Enter the invite code shared with you to securely download the file.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-blue-500/5 rounded-full"></div>
        <div className="absolute bottom-2 right-8 w-8 h-8 bg-purple-500/5 rounded-full"></div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="inviteCode" className="block text-sm font-medium text-slate-300 mb-2">
            Invite Code
          </label>
          <div className="relative">
            <input
              type="text"
              id="inviteCode"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="Enter the invite code (port number)"
              className="input-field pr-4"
              disabled={isDownloading}
              required
            />
            {/* Input focus effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          {error && (
            <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center space-x-2 relative overflow-hidden"
          disabled={isDownloading}
        >
          {/* Button background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 animate-pulse opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative flex items-center space-x-2">
            {isDownloading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <FiDownload className="w-5 h-5" />
                <span>Download File</span>
              </>
            )}
          </div>
        </button>
      </form>
    </div>
  );
}
