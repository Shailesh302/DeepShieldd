import React, { useState } from 'react';
import { Shield, KeyRound, EyeOff, Eye, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function SignIn() {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') || 'user';
  const navigate = useNavigate();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!identifier || !password) {
      return setError('Please enter both identifier and access key.');
    }
    
    setLoading(true);
    
    const endpoint = isSignUp ? '/signup' : '/login';
    const payload = { username: identifier, password, role: defaultRole };
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('username', data.user.username);
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-h-screen relative">
      <div className="absolute -bottom-48 -right-48 text-[300px] font-black leading-none opacity-[0.03] pointer-events-none select-none">
        DS
      </div>

      <div className="flex flex-col items-center gap-2 mb-10">
        <div className="w-8 h-8 flex flex-col text-ds-accent">
          <Shield className="w-full h-full fill-ds-accent" />
        </div>
        <span className="text-ds-accent font-bold text-xl tracking-tighter">DEEPSHIELD</span>
        <span className="text-ds-muted text-[10px] tracking-widest font-mono uppercase">Precision Intelligence</span>
      </div>

      <div className="bg-[#111622] border border-ds-border rounded-xl w-full max-w-[440px] shadow-2xl overflow-hidden z-10">
        <div className="p-8">
          <div className="flex justify-between items-end mb-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">{isSignUp ? 'Initialize' : 'Sign In'}</h1>
            <button 
              type="button" 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-ds-accent text-xs font-bold uppercase tracking-widest hover:underline mb-2"
            >
              {isSignUp ? 'Switch to Sign In' : 'Create Node'}
            </button>
          </div>
          <p className="text-ds-muted text-sm mb-6">Secure terminal access. Please enter your credentials.</p>

          {error && (
            <div className="bg-[#3b1c20] border border-[#ef4444]/20 text-[#ef4444] text-xs p-3 rounded mb-6 font-medium">
              CRITICAL: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-ds-muted uppercase">Identifier (Username)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ds-muted">
                  <span className="text-[10px]">❄</span>
                </div>
                <input 
                  type="text" 
                  value={identifier}
                  placeholder="e.g. system_admin_01"
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-[#0a0d14] border border-transparent focus:border-ds-border rounded p-3 pl-10 text-white text-sm outline-none transition-colors max-w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold tracking-widest text-ds-muted uppercase">Access Key (Password)</label>
                {!isSignUp && (
                  <button type="button" className="text-[10px] text-ds-accent font-bold uppercase tracking-wider hover:underline">
                    Emergency Reset
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ds-muted">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="••••••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0d14] border border-transparent focus:border-ds-border rounded p-3 pl-10 pr-10 text-white text-sm outline-none transition-colors tracking-[0.2em]"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-ds-muted hover:text-white"
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input 
                id="maintain" 
                type="checkbox" 
                className="w-4 h-4 rounded border-ds-border bg-transparent text-ds-accent focus:ring-ds-accent appearance-none checked:bg-ds-accent checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTIgMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwIDNMMi41IDExTDEgOSIgLz48L3N2Zz4=')] bg-no-repeat bg-center cursor-pointer border custom-checkbox"
                style={{backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`}}
              />
              <label htmlFor="maintain" className="ml-2 text-xs text-ds-muted">
                Maintain session for 12 hours
              </label>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-ds-accent hover:bg-ds-accentHover text-ds-dark font-bold text-sm py-3.5 rounded transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isSignUp ? 'Initialize Node' : 'Sign In'} {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
            
            <Link to="/" className="w-full bg-[#1a2133] hover:bg-[#1f283d] text-ds-muted hover:text-white border border-transparent font-medium text-sm py-3.5 rounded transition-all flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Role Selection
            </Link>
          </form>
        </div>

        {/* Card Footer */}
        <div className="grid grid-cols-2 border-t border-ds-border bg-[#161c28]">
          <div className="p-4 flex items-center gap-3 border-r border-ds-border">
            <div className="w-2 h-2 rounded-full bg-ds-accent" />
            <div>
              <div className="text-[9px] text-ds-muted font-bold tracking-widest uppercase">Node Status</div>
              <div className="text-xs text-white">Operational</div>
            </div>
          </div>
          <div className="p-4 flex items-center gap-3">
            <Shield className="w-4 h-4 text-ds-accent" />
            <div>
              <div className="text-[9px] text-ds-muted font-bold tracking-widest uppercase">Encryption</div>
              <div className="text-xs text-white">AES-256 Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
