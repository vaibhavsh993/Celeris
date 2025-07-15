'use client';

import { useState } from 'react';
import { FiCopy, FiCheck, FiShare2 } from 'react-icons/fi';

interface InviteCodeProps {
  port: number | null;
}

export default function InviteCode({ port }: InviteCodeProps) {
  const [copied, setCopied] = useState(false);
  
  if (!port) return null;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(port.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="mt-8 card-accent p-6 relative overflow-hidden glow-effect">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-green-500/10"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative">
        <div className="flex items-center mb-3">
          <div className="p-2 bg-green-500/20 rounded-lg mr-3">
            <FiShare2 className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-green-400">File Ready to Share!</h3>
        </div>
        
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          Share this invite code with anyone you want to share the file with:
        </p>
        
        <div className="flex items-center group">
          <div className="flex-1 bg-slate-900/50 border border-slate-600 p-4 rounded-l-xl font-mono text-2xl text-center text-white relative overflow-hidden">
            {/* Code background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
            <span className="relative font-bold tracking-wider">{port}</span>
          </div>
          
          <button
            onClick={copyToClipboard}
            className={`p-4 rounded-r-xl transition-all duration-300 font-medium relative overflow-hidden ${
              copied 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
            } transform hover:scale-105 shadow-lg`}
            aria-label="Copy invite code"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <div className="relative flex items-center space-x-2">
              {copied ? (
                <>
                  <FiCheck className="w-5 h-5" />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <FiCopy className="w-5 h-5" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </div>
          </button>
        </div>
        
        <div className="mt-6 flex items-center space-x-2 text-xs text-slate-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <p>This code will be valid as long as your file sharing session is active</p>
        </div>
      </div>
    </div>
  );
}
