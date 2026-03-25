import React, { useState, useRef, useEffect } from 'react';
import { BarChart as BarChartIcon, AlertTriangle, ShieldCheck, FileUp, PhoneForwarded, PhoneMissed, Loader2, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState(false);
  const [scanStatus, setScanStatus] = useState(null);
  
  const [analytics, setAnalytics] = useState(null);
  const [recentLogs, setRecentLogs] = useState([]);
  
  const fileInputRef = useRef(null);

  const fetchDashboardData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const role = localStorage.getItem('userRole');
      
      const adminPrefix = role === 'admin' ? 'admin/' : '';
      const userSuffix = role === 'admin' ? '' : `/${userId}`;

      const [analyticsRes, historyRes] = await Promise.all([
        fetch(`http://localhost:5000/api/${adminPrefix}analytics${userSuffix}`),
        fetch(`http://localhost:5000/api/${adminPrefix}history${userSuffix}`)
      ]);

      const analyticsData = await analyticsRes.json();
      const historyData = await historyRes.json();

      setAnalytics(analyticsData);
      setRecentLogs(historyData.slice(0, 10)); // keep last 10
    } catch (e) {
      console.error('Failed to sync dashboard metrics', e);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadLoading(true);
    setUploadMessage('');
    setUploadError(false);
    setScanStatus(null);

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('User authentication missing.');

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('file', file);

      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to analyze payload');

      setScanStatus(data.status);
      setUploadMessage(`[${data.status}] Confidence: ${data.confidence}% | Risk Engine: ${data.risk}`);
      
      // Instantly refresh tracking UI
      fetchDashboardData();

    } catch (err) {
      setUploadError(true);
      setUploadMessage(err.message);
    } finally {
      setUploadLoading(false);
      e.target.value = null; 
    }
  };

  // Safe percentage calculation
  const detectionRateFloat = analytics?.detectionRate ? parseFloat(analytics.detectionRate) : 0;
  const safePercentage = (100 - detectionRateFloat).toFixed(1);
  
  // Threat Matrix Tracking Geometry
  const chartData = analytics?.chartData || { labels: [], highRisk: [], lowRisk: [] };
  const maxScanVolume = Math.max(1, ...chartData.labels.map((_, i) => (chartData.highRisk[i] || 0) + (chartData.lowRisk[i] || 0)));

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-2 border-b border-ds-border pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight leading-none mb-2 uppercase">Security Operations</h1>
          <p className="text-ds-muted text-sm space-x-2">
            <span>Node: Active Sync</span>
            <span className="text-ds-border">|</span>
            <span>Status: <span className="text-ds-accent">Operational</span></span>
          </p>
        </div>
        <div className="border-l-2 border-[#ef4444] pl-4">
          <div className="text-[10px] font-bold tracking-widest text-[#ef4444] uppercase mb-1">Critical Alerts</div>
          <div className="text-xl font-mono text-white tracking-widest"><span className="text-ds-muted">0{analytics?.highRiskCount > 9 ? '' : '0'}{analytics?.highRiskCount || 0}</span> Active</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top KPI Cards */}
        <div className="bg-ds-card rounded-xl p-6 border border-ds-border flex flex-col justify-between h-[140px]">
          <div className="flex justify-between items-start">
            <div className="text-[10px] font-bold tracking-widest text-ds-muted uppercase">Total Scans</div>
            <BarChartIcon className="w-4 h-4 text-ds-accent" />
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">{analytics?.totalScans || 0}</div>
            <div className="text-xs text-ds-accent font-medium">Live Connection Tracked</div>
          </div>
        </div>

        <div className={`rounded-xl p-6 border flex flex-col justify-between h-[140px] ${analytics?.highRiskCount > 0 ? 'bg-[#241315] border-ds-red/30' : 'bg-ds-dark border-ds-border'}`}>
          <div className="flex justify-between items-start">
            <div className="text-[10px] font-bold tracking-widest text-white/50 uppercase">High Risk Threats</div>
            {analytics?.highRiskCount > 0 && <AlertTriangle className="w-4 h-4 text-[#ef4444]" />}
          </div>
          <div>
            <div className={`text-3xl font-bold mb-2 ${analytics?.highRiskCount > 0 ? 'text-[#ef4444]' : 'text-ds-muted'}`}>{analytics?.highRiskCount || 0}</div>
            <div className="text-xs text-white/50">{analytics?.highRiskCount > 0 ? 'System Isolation Recommended' : 'Threats neutralized'}</div>
          </div>
        </div>

        <div className={`rounded-xl p-6 border flex flex-col justify-between h-[140px] ${safePercentage < 50 ? 'bg-[#241315] border-[#ef4444]' : 'bg-[#121c16] border-ds-accent/30'}`}>
          <div className="flex justify-between items-start">
            <div className="text-[10px] font-bold tracking-widest text-white/50 uppercase">Safe Communications</div>
            <ShieldCheck className="w-4 h-4 text-ds-accent" />
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">{safePercentage}%</div>
            <div className="text-xs text-white/50">Calculated Safety Ratio</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Analysis Lab Component */}
        <div className="bg-ds-card rounded-xl border border-ds-border p-6 flex flex-col h-[320px]">
          <h2 className="text-ds-accent font-bold text-lg mb-2">Threat Analysis Lab</h2>
          <p className="text-ds-muted text-xs mb-6">Drop suspicious payloads here for neural sandboxing and heuristic decomposition.</p>
          
          <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          
          <div 
            onClick={() => !uploadLoading && fileInputRef.current?.click()}
            className={`border-2 border-dashed ${uploadError || scanStatus === 'FAKE' || scanStatus === 'SUSPICIOUS' ? 'border-[#ef4444]' : 'border-ds-border'} bg-ds-dark/50 hover:bg-ds-dark transition-colors rounded flex flex-col items-center justify-center p-6 flex-1 mb-4 ${!uploadLoading ? 'cursor-pointer' : 'cursor-wait opacity-70'} group`}
          >
            {uploadLoading ? (
               <Loader2 className="w-6 h-6 text-ds-accent animate-spin mb-3" />
            ) : uploadMessage && !uploadError ? (
               scanStatus === 'FAKE' || scanStatus === 'SUSPICIOUS' ? 
                 <AlertTriangle className="w-6 h-6 text-[#ef4444] mb-3" /> :
                 <CheckCircle2 className="w-6 h-6 text-ds-accent mb-3" />
            ) : (
               <FileUp className="w-6 h-6 text-ds-muted mb-3 group-hover:text-white transition-colors" />
            )}
            
            <div className={`text-xs font-bold uppercase tracking-widest text-center ${uploadError || scanStatus === 'FAKE' || scanStatus === 'SUSPICIOUS' ? 'text-[#ef4444]' : uploadMessage ? 'text-ds-accent' : 'text-white'}`}>
              {uploadLoading ? 'Uploading payload...' : uploadMessage ? uploadMessage : 'Drag or click to upload'}
            </div>
          </div>

          <button disabled={uploadLoading} onClick={() => fileInputRef.current?.click()} className="w-full bg-[#1e293b] hover:bg-[#253248] disabled:opacity-50 text-white font-bold py-3 rounded text-sm transition-colors uppercase tracking-widest">
            Initiate Deep Scan
          </button>
        </div>

        {/* Threat Matrix */}
        <div className="lg:col-span-2 bg-ds-card rounded-xl border border-ds-border p-6 h-[320px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-bold text-lg">Threat Matrix [Last 6 Hours]</h2>
            <div className="flex gap-2">
              <span className="bg-[#1a2e15] border border-ds-accent/20 text-ds-accent text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded">Realtime</span>
            </div>
          </div>
          <div className="flex-1 flex items-end gap-6 w-full py-4 pb-0">
            {chartData.labels.map((label, i) => {
              const hRisk = chartData.highRisk[i] || 0;
              const lRisk = chartData.lowRisk[i] || 0;
              const total = hRisk + lRisk;
              
              const hHeight = total === 0 ? 0 : (hRisk / maxScanVolume) * 100;
              const lHeight = total === 0 ? 0 : (lRisk / maxScanVolume) * 100;

              return (
                <div key={i} className="flex-1 flex flex-col justify-end items-center h-full gap-1 group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 bg-ds-dark border border-ds-border px-3 py-1 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 flex gap-2">
                     <span className="text-[#ef4444]">{hRisk} High</span>
                     <span className="text-ds-accent">{lRisk} Low</span>
                  </div>

                  {/* Low Risk Bar */}
                  <div className="w-full bg-ds-accent/80 hover:bg-ds-accent transition-all duration-300 rounded-t-sm" style={{ height: `${lHeight}%`, minHeight: lHeight > 0 ? '4px' : '0' }}></div>
                  {/* High Risk Bar */}
                  <div className="w-full bg-[#ef4444]/80 hover:bg-[#ef4444] transition-all duration-300 rounded-sm" style={{ height: `${hHeight}%`, minHeight: hHeight > 0 ? '4px' : '0' }}></div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between px-6 pt-4 text-[10px] font-mono text-ds-muted w-full">
            {chartData.labels.map((label, i) => <span key={i}>{label}</span>)}
          </div>
        </div>
      </div>

      {/* Analysis Logs */}
      <div className="w-full bg-ds-card rounded-xl border border-ds-border p-6">
        <div className="flex justify-between items-center mb-6 border-b border-ds-border pb-4">
          <h2 className="text-white font-bold text-lg">Live Connection Logs</h2>
          <button className="text-ds-accent text-[10px] font-bold tracking-widest uppercase hover:underline">
            Export CSV
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-ds-muted font-bold">
                <th className="pb-4">Timestamp</th>
                <th className="pb-4">File Subject</th>
                <th className="pb-4">AI Reason</th>
                <th className="pb-4 text-right">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ds-border/50 text-xs">
              {recentLogs.map((log, i) => (
                <tr key={i} className="hover:bg-ds-dark/30 transition-colors">
                  <td className="py-4 font-mono text-ds-muted">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                       <span className={`w-1.5 h-1.5 rounded-full ${log.status === 'REAL' ? 'bg-ds-accent' : log.risk === 'HIGH' ? 'bg-[#ef4444]' : 'bg-blue-400'}`}></span>
                       <span className="text-white font-medium">{log.fileId?.fileName || 'Unidentified Payload'}</span>
                    </div>
                  </td>
                  <td className="py-4 text-ds-muted">{log.reason || 'Deep Scan'}</td>
                  <td className="py-4 text-right">
                    <span className={`inline-flex px-2 py-1 font-bold tracking-widest uppercase rounded text-[9px] ${
                      log.risk === 'HIGH' ? 'bg-[#3b1c20] text-[#ef4444]' : 
                      log.risk === 'MEDIUM' ? 'bg-[#1e1b4b] text-blue-400' :
                      'bg-[#172554] text-cyan-400'
                    }`}>
                      {log.risk}
                    </span>
                  </td>
                </tr>
              ))}
              {recentLogs.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-ds-muted text-sm italic">
                    No active scan logs currently retrieved.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
