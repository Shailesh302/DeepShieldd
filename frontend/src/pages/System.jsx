import React from 'react';
import { Download, Cpu, Activity, Server, Lock, BarChart, Cloud, RotateCcw, Trash2, ChevronDown, Shield } from 'lucide-react';

const mockSystemLogs = [
  { time: '2023.10.27 14:22:01', source: 'Cloud-Sync-Module', status: 'SUCCESS', action: 'Database integrity verified', verification: 'DS-7742' },
  { time: '2023.10.27 14:18:45', source: 'Kernel-Auto-Patch', status: 'SUCCESS', action: 'Security patch v4.2.1 applied', verification: 'DS-9110' },
  { time: '2023.10.27 13:59:12', source: 'Detection-Engine', status: 'INFO', action: 'Model recalibration complete', verification: 'DS-2033' },
];

export default function System() {
  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Header */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <div className="flex gap-2 text-[10px] font-bold tracking-widest uppercase mb-2">
            <span className="text-ds-muted">CORE</span>
            <span className="text-ds-border">/</span>
            <span className="text-ds-accent">SYSTEM INFRASTRUCTURE</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight leading-none mb-2">System Settings & Status</h1>
        </div>
        <div>
          <button className="bg-ds-card border border-ds-border hover:border-ds-muted transition-colors px-4 py-2.5 rounded-md flex items-center gap-3 text-white text-sm font-medium">
            <Download className="w-4 h-4 text-ds-muted" /> Export Config
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Spans 2) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* System Vital Nodes */}
          <div className="bg-ds-card rounded-xl border border-ds-border p-6 lg:p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 text-ds-accent" />
                <h2 className="text-white font-bold text-lg">System Vital Nodes</h2>
              </div>
              <span className="bg-[#1f3014] text-ds-accent text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded">
                Standard Protocol
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border-l-2 border-ds-accent pl-4 flex flex-col justify-center">
                <div className="text-[10px] font-bold tracking-widest text-ds-muted uppercase mb-1">Node Status</div>
                <div className="text-2xl font-bold text-white mb-2">Operational</div>
                <div className="flex items-center gap-2 text-[10px] text-ds-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-ds-accent"></span> Uptime: 99.98%
                </div>
              </div>

              <div className="border-l-2 border-ds-accent pl-4 flex flex-col justify-center">
                <div className="text-[10px] font-bold tracking-widest text-ds-muted uppercase mb-1">API Status</div>
                <div className="text-2xl font-bold text-white mb-2">Connected</div>
                <div className="flex items-center gap-2 text-[10px] text-ds-muted">
                  <RotateCcw className="w-3 h-3 text-ds-accent" /> Latency: 14ms
                </div>
              </div>

              <div className="border-l-2 border-ds-accent pl-4 flex flex-col justify-center">
                <div className="text-[10px] font-bold tracking-widest text-ds-muted uppercase mb-1">Detection Engine</div>
                <div className="text-2xl font-bold text-white mb-2">Active <span className="text-[10px] text-ds-muted font-normal">v4.2</span></div>
                <div className="flex items-center gap-2 text-[10px] text-ds-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-ds-accent"></span> Signatures Updated
                </div>
              </div>
            </div>
          </div>

          {/* Sub Row: Throughput & Load Dist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-ds-card rounded-xl border border-ds-border p-6 h-[220px] flex flex-col justify-between">
              <h3 className="text-white font-bold text-sm">Traffic Throughput</h3>
              <div className="flex-1 flex items-end gap-2 mt-4">
                {[45, 30, 60, 40, 75, 80, 50].map((val, i) => (
                  <div key={i} className="flex-1 bg-[#3f6212] transition-all duration-300 hover:bg-ds-accent" style={{height: `${val}%`}}></div>
                ))}
              </div>
            </div>

            <div className="bg-ds-card rounded-xl border border-ds-border p-6 h-[220px] flex flex-col justify-center">
              <h3 className="text-white font-bold text-sm mb-6">Node Load Dist.</h3>
              
              <div className="mb-6 space-y-2">
                <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
                  <span className="text-ds-muted">Core Cluster A</span>
                  <span className="text-white">42%</span>
                </div>
                <div className="w-full bg-ds-dark h-1.5 rounded-full overflow-hidden">
                   <div className="bg-ds-accent h-full w-[42%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
                  <span className="text-ds-muted">Edge Cache</span>
                  <span className="text-white">18%</span>
                </div>
                <div className="w-full bg-ds-dark h-1.5 rounded-full overflow-hidden">
                   <div className="bg-blue-400 h-full w-[18%]"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          
          <div className="bg-ds-card rounded-xl border border-ds-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-ds-accent fill-ds-accent" />
              <h2 className="text-white font-bold text-lg">Security Info</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-[#121622] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-ds-muted" />
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">Encryption</div>
                    <div className="text-[10px] text-ds-muted">AES-256 Enabled</div>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-[#1f3014] flex items-center justify-center text-ds-accent">✓</div>
              </div>

              <div className="bg-[#121622] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-ds-muted" />
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">Monitoring</div>
                    <div className="text-[10px] text-ds-muted">Real-time Active</div>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-[#1f3014] flex items-center justify-center text-ds-accent">✓</div>
              </div>

              <div className="bg-[#121622] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Cloud className="w-4 h-4 text-ds-muted" />
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">Cloud Sync</div>
                    <div className="text-[10px] text-ds-muted">Synced 2m ago</div>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-[#1f3014] flex items-center justify-center text-ds-accent">✓</div>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[10px] font-bold tracking-widest text-ds-muted uppercase mb-4">Critical Controls</div>
              <button className="w-full bg-transparent border border-[#3b4737] hover:border-ds-accent text-ds-accent text-xs font-bold uppercase tracking-widest py-3.5 rounded flex items-center justify-center gap-2 mb-3 transition-colors">
                <RotateCcw className="w-4 h-4" /> Reset Detection Engine
              </button>
              <button className="w-full bg-transparent border border-[#473739] hover:border-[#ef4444] text-[#ef4444] text-xs font-bold uppercase tracking-widest py-3.5 rounded flex items-center justify-center gap-2 transition-colors">
                <Trash2 className="w-4 h-4" /> Clear Activity Logs
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* System Configuration Logs */}
      <div className="bg-ds-card rounded-xl border border-ds-border flex flex-col overflow-hidden">
        <div className="p-4 px-6 border-b border-ds-border flex justify-between items-center">
          <h2 className="text-sm font-bold text-white">System Configuration Logs</h2>
          <button className="w-6 h-6 rounded bg-[#121622] flex items-center justify-center text-ds-muted hover:text-white transition-colors">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[9px] uppercase tracking-widest text-ds-muted font-bold">
              <th className="p-4 pl-6">Timestamp</th>
              <th className="p-4">Event Source</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action Taken</th>
              <th className="p-4 pr-6 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ds-border text-xs">
            {mockSystemLogs.map((log, i) => (
              <tr key={i} className="hover:bg-ds-dark/40 transition-colors">
                <td className="p-4 pl-6 font-mono text-ds-muted text-[11px]">{log.time}</td>
                <td className="p-4 text-white font-bold text-[11px] tracking-wide">{log.source}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${log.status === 'SUCCESS' ? 'bg-ds-accent' : 'bg-blue-400'}`}></span>
                    <span className={`text-[10px] font-bold tracking-widest uppercase ${log.status === 'SUCCESS' ? 'text-ds-accent' : 'text-blue-400'}`}>{log.status}</span>
                  </div>
                </td>
                <td className="p-4 text-ds-muted text-[11px]">{log.action}</td>
                <td className="p-4 pr-6 text-right font-mono text-ds-accent text-[11px]">{log.verification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Meta */}
      <div className="flex justify-between items-center mt-6 pt-6 border-t border-ds-border/50 text-[9px] font-bold tracking-widest uppercase text-ds-muted">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ds-accent"></span> SYSTEM LATENCY: 4MS
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ds-accent"></span> NODE STABILITY: 100%
          </div>
        </div>
        <div className="opacity-50">
          DEEPSHIELD PROTOCOL V4.2 © 2023 ALL RIGHTS RESERVED
        </div>
      </div>

    </div>
  );
}
