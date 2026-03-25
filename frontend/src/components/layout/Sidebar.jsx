import React, { useState } from 'react';
import { LayoutDashboard, BarChart2, ListTodo, Settings, FileText, HelpCircle, Zap, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const sidebarItems = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  { name: 'Logs', path: '/logs', icon: ListTodo },
  { name: 'System', path: '/system', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDevelopers, setShowDevelopers] = useState(false);
  const userRole = localStorage.getItem('userRole') || 'user';

  const handleSignOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/');
  };
  
  const visibleItems = sidebarItems.filter(item => 
    userRole === 'admin' || item.name !== 'System'
  );

  return (
    <aside className="w-64 bg-ds-dark border-r border-ds-border h-screen sticky top-0 flex flex-col pt-6 z-40 shrink-0">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-ds-accent text-ds-dark flex items-center justify-center font-bold text-xs tracking-wider">
          DS
        </div>
        <div>
          <div className="text-ds-accent font-bold text-sm tracking-wide">
            DeepShield
          </div>
          <div className="text-ds-muted text-[10px] font-mono tracking-wider uppercase">
            Terminal Elite
          </div>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1 px-3">
          {visibleItems.map((item) => {
            const isActive = location.pathname === item.path || (item.name === 'Overview' && location.pathname === '/dashboard');
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-ds-card border-l-2 border-ds-accent text-ds-accent' 
                      : 'text-ds-text hover:bg-ds-card/50 hover:text-white border-l-2 border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-ds-accent' : 'text-ds-muted'}`} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 mt-auto">
        <div className="space-y-1">
          <button 
            onClick={() => setShowDevelopers(!showDevelopers)}
            className="flex items-center gap-3 w-full px-2 py-2 text-sm text-ds-muted hover:text-white transition-colors"
          >
            <HelpCircle className="w-4 h-4" /> Support
          </button>

          {showDevelopers && (
            <div className="bg-[#121622] border border-[#2e3b52] rounded-md p-3 my-2 shadow-2xl relative animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="text-[9px] uppercase font-bold tracking-widest text-ds-muted mb-2">Lead Developers</div>
              <div className="text-xs text-white font-medium mb-1 tracking-wide flex items-center gap-2">
                 <div className="w-1 h-1 rounded-full bg-ds-accent"></div> Shailesh Wagh
              </div>
              <div className="text-xs text-white font-medium tracking-wide flex items-center gap-2">
                 <div className="w-1 h-1 rounded-full bg-ds-accent"></div> Tanisk Surve
              </div>
            </div>
          )}
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-2 py-2 text-sm text-ds-muted hover:text-[#ef4444] transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
