"use client";

import { motion } from "framer-motion";
import { Package, ShoppingCart, Star, Clock, ArrowRight, Truck, CheckCircle2, AlertTriangle, Coins } from "lucide-react";
import { AntigravityCard } from "@/components/ui/AntigravityCard";

export default function ArtisanStudio() {
  return (
    <div className="space-y-12">
      {/* Production Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "New Orders", value: "4", sub: "Action Required", color: "#8B5E3C", icon: <ShoppingCart /> },
          { label: "In Production", value: "12", sub: "On Schedule", color: "#4A8B5C", icon: <Clock /> },
          { label: "Shipped", value: "84", sub: "This Month", color: "#22c55e", icon: <Truck /> },
          { label: "Balance", value: "₹42.8k", sub: "Available", color: "#f59e0b", icon: <Coins /> },
        ].map((stat, i) => (
          <AntigravityCard key={i} mode="tilt" maxRotation={5} perspective={1000}>
            <div className="p-6 rounded-card bg-[#1A1410] border border-white/5 hover:border-[#8B5E3C]/30 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-white/5 text-stone-400 group-hover:text-white transition-colors">
                  {stat.icon}
                </div>
                {i === 0 && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
              </div>
              <p className="text-stone-500 text-[10px] font-mono uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-display text-white">{stat.value}</h3>
              <p className="text-[10px] text-stone-700 font-body mt-1">{stat.sub}</p>
            </div>
          </AntigravityCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Pipeline */}
        <section className="lg:col-span-2 p-8 rounded-card bg-[#1A1410] border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-2xl text-white">Order Pipeline</h3>
            <div className="flex gap-2">
               {["Pending", "Active", "Complete"].map(tab => (
                 <button key={tab} className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all ${
                   tab === 'Pending' ? 'bg-[#8B5E3C] text-ink border-[#8B5E3C]' : 'border-white/5 text-stone-500 hover:border-white/20'
                 }`}>
                   {tab}
                 </button>
               ))}
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#8B5E3C]/20 transition-all flex items-center gap-6 group"
              >
                <div className="w-20 h-20 rounded-xl bg-stone-900 border border-white/5 overflow-hidden flex items-center justify-center text-[#8B5E3C]/40">
                   <Package size={32} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-medium">Handcrafted Teak Bowl</p>
                    <p className="text-white font-heading">₹1,240</p>
                  </div>
                  <p className="text-xs text-stone-500 font-body">Order #ECO-2841-A · To: Bangalore, KA</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="flex items-center gap-1.5 text-[9px] font-mono text-stone-600 uppercase border border-stone-800 px-2 py-0.5 rounded">
                       Reg: 2h ago
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] font-mono text-green-500 bg-green-500/10 px-2 py-0.5 rounded">
                       <CheckCircle2 size={10} /> Paid
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="h-10 px-4 bg-[#8B5E3C] text-ink font-bold text-[10px] uppercase rounded-lg hover:scale-105 transition-all">Accept</button>
                  <button className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-lg hover:bg-white/5 transition-all text-stone-500">
                    <AlertTriangle size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Studio Sidebar */}
        <div className="space-y-8">
           {/* Inventory Alert */}
           <section className="p-6 rounded-card bg-[#8B5E3C]/5 border border-[#8B5E3C]/10 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Package size={100} className="text-[#8B5E3C]" />
              </div>
              <h4 className="font-display text-xl text-white mb-2">Restock Warning</h4>
              <p className="text-xs text-stone-500 font-body mb-6">3 items are below critical stock levels.</p>
              <div className="space-y-2 mb-6 text-left">
                {["Earth Clay Teapot (2)", "Silk Throw (1)", "Bamboo Coasters (0)"].map(item => (
                   <div key={item} className="flex items-center justify-between text-[10px] font-mono text-stone-400 border-b border-white/5 pb-2">
                     <span>{item.split(' (')[0]}</span>
                     <span className="text-red-400">{item.split(' (')[1].replace(')', '')} left</span>
                   </div>
                ))}
              </div>
              <button className="w-full h-12 bg-white/5 border border-white/10 rounded-xl text-xs text-white hover:bg-white/10 transition-all font-heading">Manage Inventory</button>
           </section>

           {/* Artisan Story Card */}
           <section className="p-6 rounded-card bg-stone-900 border border-white/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full border border-stone-800 flex items-center justify-center text-[#8B5E3C]">
                  <Star size={24} />
                </div>
                <div>
                  <h4 className="text-white font-medium">Global Ranking</h4>
                  <p className="text-[10px] font-mono text-[#8B5E3C] uppercase tracking-[0.2em]">Top 5% Artisan</p>
                </div>
              </div>
              <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden mb-2">
                 <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} transition={{ duration: 1.5 }} className="h-full bg-[#8B5E3C]" />
              </div>
              <p className="text-[10px] text-stone-600 text-center font-body">Craftsmenship score: 98/100</p>
           </section>

           <button className="w-full h-14 bg-[#8B5E3C]/10 border border-[#8B5E3C]/20 text-[#8B5E3C] rounded-xl flex items-center justify-center gap-3 hover:bg-[#8B5E3C]/20 transition-all font-body text-sm font-medium">
              View Public Studio Profile <ArrowRight size={18} />
           </button>
        </div>
      </div>
    </div>
  );
}
