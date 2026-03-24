"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, ShieldCheck, Globe, ArrowUpRight, ArrowDownRight, Zap, Target, Search } from "lucide-react";
import { AntigravityCard } from "@/components/ui/AntigravityCard";

const STATS = [
  { label: "Total Pilgrims", value: "142,842", change: "+12.4%", trend: "up", icon: <Users /> },
  { label: "Revenue Delta", value: "₹4.2M", change: "+8.1%", trend: "up", icon: <TrendingUp /> },
  { label: "Verified Nodes", value: "842", change: "-2", trend: "down", icon: <ShieldCheck /> },
  { label: "Global Impact", value: "98.2", change: "+0.4%", trend: "up", icon: <Globe /> },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-12">
      {/* Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <AntigravityCard key={i} mode="tilt" maxRotation={5} perspective={1000}>
            <div className="p-6 rounded-card bg-[#141414] border border-white/5 hover:border-gold/20 transition-all shadow-surface group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-white/5 text-stone-400 group-hover:text-gold transition-colors">
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                  {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </div>
              </div>
              <p className="text-stone-500 text-xs font-mono uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-display text-white">{stat.value}</h3>
            </div>
          </AntigravityCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Health Monitor */}
        <div className="lg:col-span-2 space-y-8">
          <section className="p-8 rounded-card bg-[#141414] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={140} className="text-gold" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-display text-2xl text-white mb-1">Global Traffic Monitor</h3>
                  <p className="text-stone-500 text-xs font-body">Real-time occupancy and interaction density across all regions.</p>
                </div>
                <button className="text-[10px] font-mono uppercase tracking-widest text-gold border border-gold/20 px-3 py-1 rounded hover:bg-gold/10 transition-colors">
                  Export Audit
                </button>
              </div>

              {/* Placeholder for Data Viz */}
              <div className="h-64 flex items-end justify-between gap-1 mb-6">
                {Array.from({ length: 48 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.random() * 80 + 20}%` }}
                    transition={{ delay: i * 0.01, duration: 1 }}
                    className={`flex-1 rounded-full transition-colors duration-500 ${
                      i % 7 === 0 ? 'bg-gold' : 'bg-white/10 group-hover:bg-gold/20'
                    }`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-8 border-t border-white/5 pt-8">
                <div>
                  <p className="text-[10px] font-mono text-stone-600 uppercase tracking-widest mb-2">P-Network Health</p>
                  <p className="text-xl font-heading text-white">99.98%</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-stone-600 uppercase tracking-widest mb-2">Sync Latency</p>
                  <p className="text-xl font-heading text-white">42ms</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-stone-600 uppercase tracking-widest mb-2">Node Encryption</p>
                  <p className="text-xl font-heading text-gold flex items-center gap-2">
                    <ShieldCheck size={18} /> Military
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* User Management Quick Access */}
          <section className="p-8 rounded-card bg-[#141414] border border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-2xl text-white">Direct Intervention</h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600" />
                <input 
                  type="text" 
                  placeholder="Search Users, Nodes, Products..." 
                  className="bg-black/40 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-gold/30 w-64 font-body"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="pb-4 text-[10px] font-mono text-stone-600 uppercase tracking-widest">Entity</th>
                    <th className="pb-4 text-[10px] font-mono text-stone-600 uppercase tracking-widest">Clearance</th>
                    <th className="pb-4 text-[10px] font-mono text-stone-600 uppercase tracking-widest">Activity</th>
                    <th className="pb-4 text-[10px] font-mono text-stone-600 uppercase tracking-widest text-right">Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { name: "Rahul Varma", role: "GUIDE", status: "Active (Munnar)", time: "Just now" },
                    { name: "Artisan Studio X", role: "ARTISAN", status: "New Order #482", time: "3m ago" },
                    { name: "Global Admin #2", role: "ADMIN", status: "Reviewing Content", time: "12m ago" },
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-4">
                        <p className="text-sm font-medium text-white">{row.name}</p>
                        <p className="text-[10px] text-stone-600 font-mono">ID: 842-841-{i}</p>
                      </td>
                      <td className="py-4">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                          row.role === 'GUIDE' ? 'bg-green-500/10 text-green-500' : 
                          row.role === 'ARTISAN' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {row.role}
                        </span>
                      </td>
                      <td className="py-4">
                        <p className="text-xs text-stone-400">{row.status}</p>
                        <p className="text-[10px] text-stone-700">{row.time}</p>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button className="h-8 px-3 bg-red-500/10 text-red-500 text-[10px] uppercase font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all">Freeze</button>
                          <button className="h-8 px-3 bg-gold text-ink text-[10px] uppercase font-bold rounded-lg hover:scale-105 transition-all">Impersonate</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <section className="p-6 rounded-card bg-gold/5 border border-gold/10">
            <h4 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
              <Target size={20} /> War Room Actions
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Global Maintenance Toggle",
                "Freeze All Artisan Payouts",
                "Force Route Re-Sync",
                "Broadcast System Message"
              ].map((action, i) => (
                <button key={i} className="w-full text-left p-4 bg-black/40 border border-white/5 rounded-xl text-xs text-stone-400 hover:text-white hover:border-gold/30 transition-all flex items-center justify-between group">
                  {action}
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-gold" />
                </button>
              ))}
            </div>
          </section>

          {/* Audit Log Brief */}
          <section className="p-6 rounded-card bg-[#141414] border border-white/5">
            <h4 className="text-xs font-mono text-stone-500 uppercase tracking-widest mb-6">Security Pulse</h4>
            <div className="space-y-6">
              {[
                { type: "LOGIN", msg: "Login attempt from new IP: Hyderabad", status: "warn" },
                { type: "ROLE", msg: "Clearance escalated for User #2491", status: "info" },
                { type: "SYSTEM", msg: "API Rate limit hit: Artisan Studio", status: "error" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                    log.status === 'warn' ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' :
                    log.status === 'error' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-blue-500 shadow-[0_0_8px_#3b82f6]'
                  }`} />
                  <div>
                    <p className="text-[11px] leading-relaxed text-stone-300 font-body">{log.msg}</p>
                    <p className="text-[9px] font-mono text-stone-600 mt-1 uppercase">{log.type} · 12:42:01</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ArrowRight({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
