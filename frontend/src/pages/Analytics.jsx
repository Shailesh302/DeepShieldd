import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Lightbulb } from 'lucide-react';

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const role = localStorage.getItem('userRole');
        const adminPrefix = role === 'admin' ? 'admin/' : '';
        const userSuffix = role === 'admin' ? '' : `/${userId}`;
        const res = await fetch(`http://localhost:5000/api/${adminPrefix}analytics${userSuffix}`);
        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalytics();
  }, []);

  const detectionRateFloat = analytics?.detectionRate ? parseFloat(analytics.detectionRate) : 0;
  const safePercentage = (100 - detectionRateFloat).toFixed(1);

  // Dynamic Chart Modeling
  const chartData = analytics?.chartData || { labels: [], highRisk: [], lowRisk: [] };
  const maxScanVolume = Math.max(1, ...chartData.labels.map((_, i) => (chartData.highRisk[i] || 0) + (chartData.lowRisk[i] || 0)));
  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight leading-none mb-2">Threat Analytics</h1>
          <p className="text-ds-muted text-sm max-w-2xl leading-relaxed">
            Comprehensive intelligence processing from edge node detection systems. Visualizing real-time deepfake signatures and forensic patterns.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex bg-ds-dark border border-ds-border rounded-md overflow-hidden p-1">
            <button className="px-3 py-1 text-xs font-bold text-ds-accent bg-ds-card rounded">Last 24h</button>
            <button className="px-3 py-1 text-xs font-medium text-ds-muted hover:text-white">7 days</button>
            <button className="px-3 py-1 text-xs font-medium text-ds-muted hover:text-white">30 days</button>
          </div>
          <button className="bg-ds-card border border-ds-border px-4 py-1.5 rounded-md flex items-center gap-2 text-white text-xs font-bold">
            <span className="text-ds-muted">≡</span> Risk Type: All <span className="text-ds-muted pl-2">⌄</span>
          </button>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-ds-card rounded-xl p-6 border-l-4 border-l-ds-accent border-y border-r border-ds-border flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="text-[10px] font-bold tracking-widest text-ds-muted uppercase">Detection Rate</div>
            <ShieldCheck className="w-4 h-4 text-ds-accent" />
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2 tracking-tighter">{analytics?.detectionRate || '0.00%'} <span className="text-sm font-medium text-ds-accent tracking-normal ml-1">Detected</span></div>
            <div className="w-full bg-ds-dark h-1 mt-4 rounded-full overflow-hidden">
               <div className="bg-ds-accent h-full transition-all duration-1000" style={{ width: `${detectionRateFloat}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-ds-card rounded-xl p-6 border-l-4 border-l-blue-400 border-y border-r border-ds-border flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="text-[10px] font-bold tracking-widest text-ds-muted uppercase">Avg. Confidence</div>
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-4xl font-bold text-white flex items-baseline gap-2 mb-2 tracking-tighter">94% <span className="text-xs font-normal text-ds-muted tracking-normal">Standard baseline</span></div>
            <div className="w-full bg-ds-dark h-1 mt-4 rounded-full overflow-hidden">
               <div className="bg-blue-400 h-full w-[94%]"></div>
            </div>
          </div>
        </div>

        <div className="bg-ds-card rounded-xl p-6 border-l-4 border-l-[#ef4444] border-y border-r border-ds-border flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ef4444]/5 blur-3xl rounded-full"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="text-[10px] font-bold tracking-widest text-ds-muted uppercase">Most Frequent Threat</div>
            <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
          </div>
          <div className="relative z-10">
            <div className="text-2xl font-bold text-white mb-1 truncate">{analytics?.mostFrequentThreat || 'Sufficient Data Pending'}</div>
            <div className="text-xs text-ds-muted mb-4">Primary recorded risk vector</div>
            <div className="flex gap-1 w-full h-1 mt-2">
               <div className="bg-[#ef4444] h-full w-[42%] rounded-l-full"></div>
               <div className="bg-[#ef4444]/40 h-full w-[30%]"></div>
               <div className="bg-[#ef4444]/20 h-full w-[28%] rounded-r-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detection Velocity */}
        <div className="lg:col-span-2 bg-ds-card rounded-xl border border-ds-border p-6 h-[400px] flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-white font-bold text-lg">Detection Velocity</h2>
              <p className="text-ds-muted text-xs">High vs Low risk detections (Last 24h)</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-ds-muted">
                <span className="w-2 h-2 rounded-full bg-ds-accent"></span> High Risk
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-ds-muted">
                <span className="w-2 h-2 rounded-full bg-[#334155]"></span> Low Risk
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex items-end gap-2 sm:gap-4 w-full pt-4">
            {chartData.labels.map((label, i) => {
              const hRisk = chartData.highRisk[i] || 0;
              const lRisk = chartData.lowRisk[i] || 0;
              const total = hRisk + lRisk;
              
              const hHeight = total === 0 ? 0 : (hRisk / maxScanVolume) * 100;
              const lHeight = total === 0 ? 0 : (lRisk / maxScanVolume) * 100;

              return (
              <div key={i} className="flex-1 flex flex-col justify-end items-center h-full gap-1 group relative">
                {/* Tooltip */}
                <div className="absolute -top-8 bg-ds-dark border border-ds-border px-3 py-1 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 flex gap-2">
                   <span className="text-[#ef4444]">{hRisk} High</span>
                   <span className="text-ds-accent">{lRisk} Low</span>
                </div>
                {/* Low Risk Block */}
                <div className="w-full bg-[#334155] rounded-t-sm transition-all duration-300 hover:opacity-80" style={{ height: `${lHeight}%`, minHeight: lHeight > 0 ? '4px' : '0' }}></div>
                {/* High Risk Block */}
                <div className="w-full bg-[#ef4444] rounded-sm transition-all duration-300 hover:opacity-80" style={{ height: `${hHeight}%`, minHeight: hHeight > 0 ? '4px' : '0' }}></div>
              </div>
              );
            })}
          </div>
          <div className="flex justify-between pt-4 text-[10px] font-mono text-ds-muted w-full px-2">
            {chartData.labels.map((label, i) => <span key={i}>{label}</span>)}
          </div>
        </div>

        {/* Threat Distribution */}
        <div className="bg-ds-card rounded-xl border border-ds-border p-6 h-[400px] flex flex-col">
          <h2 className="text-white font-bold text-lg">Threat Distribution</h2>
          <p className="text-ds-muted text-xs mb-8">Vector analysis by media type</p>
          
          {/* Custom SVG visualization representing the diamond chart */}
          <div className="flex-1 flex items-center justify-center relative my-4">
            <div className="w-32 h-32 relative flex items-center justify-center">
              <div className="absolute inset-0 border-[12px] border-[#1e293b] rotate-45 rounded-xl"></div>
              
              {/* Fake segments using absolute positioning and svg for the futuristic look */}
              <svg className="absolute inset-0 rotate-45 w-full h-full transform scale-125" viewBox="0 0 200 200">
                <path d="M 0 100 L 100 0 L 200 100" fill="none" stroke="#84cc16" strokeWidth="12" strokeLinecap="square" />
                <path d="M 200 100 L 100 200" fill="none" stroke="#ef4444" strokeWidth="12" strokeLinecap="square" />
                <path d="M 100 200 L 0 100" fill="none" stroke="#93c5fd" strokeWidth="12" strokeLinecap="square" className="opacity-50" />
              </svg>

              <div className="text-center z-10 bg-ds-card/90 p-3 rounded-full backdrop-blur-sm shadow-xl">
                <div className="text-2xl font-bold text-white tracking-tighter leading-none">{analytics?.totalScans || 0}</div>
                <div className="text-[9px] uppercase tracking-widest text-ds-muted font-bold mt-1">Total Scans</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-ds-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ds-accent"></span>
              <div>
                <div className="text-xs text-white font-medium">Audio</div>
                <div className="text-[10px] text-ds-muted">42.5%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-300"></span>
              <div>
                <div className="text-xs text-white font-medium">Video</div>
                <div className="text-[10px] text-ds-muted">28.1%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
              <div>
                <div className="text-xs text-white font-medium">Image</div>
                <div className="text-[10px] text-ds-muted">19.4%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ds-muted"></span>
              <div>
                <div className="text-xs text-white font-medium">Text</div>
                <div className="text-[10px] text-ds-muted">10.0%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
