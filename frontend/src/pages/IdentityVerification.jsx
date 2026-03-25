import React from 'react';
import { Shield, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IdentityVerification() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl max-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-ds-accent flex items-center justify-center">
          <Shield className="w-6 h-6 text-ds-dark fill-ds-dark" />
        </div>
        <span className="text-ds-accent font-bold text-2xl tracking-tighter">DEEPSHIELD</span>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Identity Verification</h1>
        <p className="text-ds-muted text-lg">Select your access level to enter the secure environment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* User Card */}
        <Link 
          to="/login?role=user"
          className="bg-[#1a2133] border border-transparent hover:border-ds-border rounded-xl p-8 flex flex-col transition-all duration-300 hover:bg-[#1f283d] group h-full relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-lg bg-[#252f44] text-ds-accent flex items-center justify-center mb-6">
            <User className="w-6 h-6" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3">Login as User</h2>
          <p className="text-ds-muted text-sm leading-relaxed mb-10 flex-1">
            Standard operational access for threat monitoring, personal logs, and security dashboard interaction.
          </p>
          
          <div className="flex items-center gap-2 text-ds-accent font-bold tracking-widest text-xs uppercase group-hover:translate-x-2 transition-transform">
            ACCESS TERMINAL <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Admin Card */}
        <Link 
          to="/login?role=admin"
          className="bg-[#1a2133] border border-transparent hover:border-ds-border rounded-xl p-8 flex flex-col transition-all duration-300 hover:bg-[#1f283d] group h-full relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-lg bg-[#252f44] text-ds-accent flex items-center justify-center mb-6">
            <Shield className="w-6 h-6" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3">Login as Admin</h2>
          <p className="text-ds-muted text-sm leading-relaxed mb-10 flex-1">
            Root-level clearance for system configuration, user management, and advanced network deployment.
          </p>
          
          <div className="flex items-center gap-2 text-ds-accent font-bold tracking-widest text-xs uppercase group-hover:translate-x-2 transition-transform">
            CONSOLE ENTRY <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </div>
  );
}
