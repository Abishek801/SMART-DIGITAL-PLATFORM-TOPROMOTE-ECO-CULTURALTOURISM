"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Clock, Search, Filter, ArrowUpRight, MessageSquare, Image as ImageIcon, MapPin } from "lucide-react";
import { AntigravityCard } from "@/components/ui/AntigravityCard";

const METRICS = [
  { label: "Pending Reviews", value: "24", sub: "8 critical", icon: <AlertCircle className="text-clay" />, color: "#C4845A" },
  { label: "Active Disputes", value: "3", sub: "Escalated", icon: <Clock className="text-amber-500" />, color: "#f59e0b" },
  { label: "Payout Volume", value: "₹842k", sub: "This week", icon: <CheckCircle className="text-green-500" />, color: "#22c55e" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {METRICS.map((m, i) => (
          <AntigravityCard key={i} mode="tilt" maxRotation={5} perspective={1000}>
            <div className="p-6 rounded-card bg-[#151515] border border-white/5 flex items-center justify-between group">
              <div>
                <p className="text-stone-500 text-xs font-mono uppercase tracking-widest mb-1">{m.label}</p>
                <h3 className="text-3xl font-display text-white mb-1">{m.value}</h3>
                <p className="text-[10px] text-stone-600">{m.sub}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-transform group-hover:scale-110">
                {m.icon}
              </div>
            </div>
          </AntigravityCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Moderation Queue Preview */}
        <section className="p-8 rounded-card bg-[#151515] border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-2xl text-white">Decision Queue</h3>
            <button className="text-xs text-clay hover:underline underline-offset-4">View All Items</button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-6 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-lg bg-stone-800 overflow-hidden shrink-0">
                  <div className="w-full h-full bg-clay/20 flex items-center justify-center text-clay">
                    <ImageIcon size={24} />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-clay uppercase bg-clay/10 px-1.5 py-0.5 rounded">Destination</span>
                    <p className="text-sm font-medium text-white">Kasol Riverside Camp</p>
                  </div>
                  <p className="text-xs text-stone-500 font-body line-clamp-1">New submission from Guide #8241. Check for carbon impact accuracy...</p>
                  <p className="text-[10px] font-mono text-stone-700 mt-2 uppercase tracking-tighter">Submitted 2h ago · Priority: High</p>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="px-3 py-1.5 bg-green-500/10 text-green-500 text-[10px] font-bold rounded hover:bg-green-500 hover:text-white transition-all">Approve</button>
                  <button className="px-3 py-1.5 bg-red-500/10 text-red-500 text-[10px] font-bold rounded hover:bg-red-500 hover:text-white transition-all">Reject</button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent Financials */}
        <section className="p-8 rounded-card bg-[#151515] border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-2xl text-white">Payout Pulse</h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs text-stone-500">
               Weekly <Filter size={12} />
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-end justify-between h-32 gap-3">
              {[40, 60, 45, 90, 70, 50, 80].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full relative">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className="w-full bg-clay/20 rounded-t-lg group-hover:bg-clay/40 transition-colors"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-stone-700 uppercase">{['M','T','W','T','F','S','S'][i]}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8">
              <div>
                <p className="text-[10px] font-mono text-stone-600 uppercase tracking-widest mb-1">Total Dispensed</p>
                <p className="text-2xl font-heading text-white">₹12.4M</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-stone-600 uppercase tracking-widest mb-1">Fee Capture</p>
                <p className="text-2xl font-heading text-clay">₹1.8M</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-clay/5 border border-clay/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-clay/10">
                  <MessageSquare size={16} className="text-clay" />
                </div>
                <div>
                  <p className="text-xs text-white">Payout batch ready</p>
                  <p className="text-[10px] text-stone-500 font-body">14 Artisan Payouts need approval.</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-clay text-ink font-bold text-[10px] rounded hover:scale-95 transition-all">Execute</button>
            </div>
          </div>
        </section>
      </div>

      {/* Global Task Manager */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Destination Verification", task: "8 Pending", sub: "Munnar, Kasol, Hampi", icon: <MapPin size={18} /> },
          { label: "Support Tickets", task: "12 Open", sub: "Avg response 2.4h", icon: <MessageSquare size={18} /> },
          { label: "Content Optimization", task: "Running", sub: "SEO Refreshing...", icon: <Zap size={18} /> },
        ].map((task, i) => (
          <div key={i} className="p-6 rounded-card bg-black/40 border border-white/5 hover:border-clay/20 transition-all cursor-pointer group">
            <div className="mb-4 text-stone-600 group-hover:text-clay transition-colors">{task.icon}</div>
            <h4 className="text-white font-medium mb-1 font-body">{task.label}</h4>
            <p className="text-stone-400 text-sm font-heading">{task.task}</p>
            <p className="text-[10px] text-stone-600 mt-2">{task.sub}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function Zap({ size, className }: { size: number, className?: string }) {
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
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}
