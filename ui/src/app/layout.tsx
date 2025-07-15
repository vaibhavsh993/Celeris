import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Celeris - P2P File Sharing',
  description: 'Securely share files peer-to-peer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-slate-900 relative overflow-hidden">
          {/* Animated background with subtle patterns */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.08),transparent_50%)]"></div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-ping"></div>
            <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-purple-300/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/6 left-5/6 w-1 h-1 bg-blue-300/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
