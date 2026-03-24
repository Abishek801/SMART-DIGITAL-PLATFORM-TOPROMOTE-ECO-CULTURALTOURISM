"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Info, Download, ChevronRight } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DESTINATIONS = [
  "Munnar Eco Village",
  "Ziro Valley Trek",
  "Sundarbans Stay",
  "Coorg Estate",
  "Spiti Homestay",
  "Majuli Island",
  "Wayanad Heritage",
  "Rann of Kutch"
];

// Mock intensity data (0-100)
const generateData = () => {
  return DESTINATIONS.map(d => ({
    name: d,
    months: MONTHS.map(() => Math.floor(Math.random() * 100))
  }));
};

export default function OrdersHeatmap() {
  const [data] = useState(generateData());
  const [hoveredCell, setHoveredCell] = useState<any>(null);

  const getColor = (value: number) => {
    if (value === 0) return "#18181B";
    if (value < 20) return "rgba(212,168,67,0.1)";
    if (value < 40) return "rgba(212,168,67,0.25)";
    if (value < 60) return "rgba(212,168,67,0.45)";
    if (value < 80) return "rgba(212,168,67,0.7)";
    return "#D4A843";
  };

  return (
    <div className="bg-[#111113] border border-[#27272A] rounded-xl p-6 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-white">Orders Heatmap</h3>
          <p className="text-[11px] text-stone-500 mt-1">Visualize seasonal booking volume and revenue density</p>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="flex bg-[#18181B] rounded-lg p-1">
             {["2024", "2025", "2026"].map(y => (
               <button key={y} className={`px-3 py-1 text-[10px] font-bold rounded-md ${y === "2026" ? "bg-[#D4A843] text-[#09090B]" : "text-stone-500"}`}>
                 {y}
               </button>
             ))}
           </div>
           <button className="h-8 px-3 rounded-lg border border-[#3F3F46] text-[10px] font-bold text-stone-400 flex items-center gap-2 hover:bg-[#18181B]">
             <Download size={12} /> Export CSV
           </button>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar pb-4">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="flex mb-4">
            <div className="w-[180px] shrink-0" />
            <div className="flex-1 grid grid-cols-12 gap-1.5">
              {MONTHS.map(m => (
                <div key={m} className="text-[10px] font-bold text-stone-600 uppercase tracking-widest text-center">
                  {m}
                </div>
              ))}
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-1.5">
            {data.map((row, rIdx) => (
              <div key={row.name} className="flex items-center group">
                <div className="w-[180px] shrink-0 pr-4">
                  <span className="text-xs font-medium text-stone-400 group-hover:text-white transition-colors truncate block">
                    {row.name}
                  </span>
                </div>
                <div className="flex-1 grid grid-cols-12 gap-1.5">
                  {row.months.map((val, cIdx) => (
                    <motion.div
                      key={cIdx}
                      className="h-10 rounded-[4px] relative cursor-pointer"
                      style={{ backgroundColor: getColor(val) }}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      onHoverStart={() => setHoveredCell({ val, month: MONTHS[cIdx], name: row.name })}
                      onHoverEnd={() => setHoveredCell(null)}
                    >
                      {val > 70 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                           <span className={`text-[10px] font-mono font-bold ${val > 80 ? 'text-[#09090B]' : 'text-white'}`}>{val}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend & Info */}
      <div className="mt-8 pt-6 border-t border-[#27272A] flex items-center justify-between">
         <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">Intensity</span>
            <div className="flex items-center gap-1">
               <span className="text-[9px] text-stone-500">Low</span>
               <div className="flex gap-1">
                  {[0, 25, 50, 75, 100].map(v => (
                    <div key={v} className="w-5 h-2 rounded-sm" style={{ backgroundColor: getColor(v) }} />
                  ))}
               </div>
               <span className="text-[9px] text-stone-500">High</span>
            </div>
         </div>

         <div className="flex items-center gap-2 text-[10px] text-stone-500 font-medium">
            <Info size={12} className="text-[#3B82F6]" />
            Values represent booking targets achieved percentage
         </div>
      </div>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredCell && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-12 right-12 bg-[#18181B] border border-[#3F3F46] rounded-xl p-4 shadow-2xl z-50 pointer-events-none w-64"
          >
             <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">{hoveredCell.month} · 2026</p>
             <p className="text-sm font-bold text-white mb-3">{hoveredCell.name}</p>
             <div className="space-y-2">
                <div className="flex justify-between items-center">
                   <span className="text-[11px] text-stone-400">Order Volume</span>
                   <span className="text-xs font-mono font-bold text-[#D4A843]">{hoveredCell.val}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[11px] text-stone-400">Revenue Est.</span>
                   <span className="text-xs font-mono font-bold text-white">₹{(hoveredCell.val * 2450).toLocaleString()}</span>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
