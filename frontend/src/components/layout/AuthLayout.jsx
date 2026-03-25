import React from 'react';
import { Shield, Lock } from 'lucide-react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-ds-dark">
      {/* Background radial gradient subtle effect can be added here if needed */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,28,43,0.5)_0%,rgba(15,20,30,1)_100%)] pointer-events-none" />
      
      <div className="z-10 w-full max-w-4xl flex flex-col items-center flex-1 justify-center">
        {children}
      </div>

      <div className="z-10 mt-auto w-full pt-8 flex flex-col gap-8">
        {/* Pre-footer status */}
        <div className="flex justify-center gap-12 text-[10px] tracking-widest text-ds-muted font-mono uppercase">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-ds-muted" />
            TLS 1.3 ACTIVE
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-ds-muted" />
            AES-256 AUTH
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-ds-muted" />
            NODE: US-EAST-1
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center w-full pb-4 text-xs text-ds-muted">
          <div className="flex gap-4">
            <div className="px-3 py-1.5 rounded-md bg-ds-card border border-ds-border flex items-center gap-2 shadow-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-ds-accent" />
              System Online
            </div>
            <div className="px-3 py-1.5 rounded-md bg-ds-card border border-ds-border flex items-center gap-2 shadow-sm">
              <Lock className="w-3.5 h-3.5" />
              Encrypted Connection
            </div>
          </div>
          <div className="font-mono text-[10px] uppercase opacity-50">
            © 2024 DEEPSHIELD INTEL CORP. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </div>
  );
}
