"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Leaf, Plane, Train, Bus, Bike } from "lucide-react";

export default function CarbonSection() {
  const [transport, setTransport] = useState<"FLIGHT" | "TRAIN" | "BUS" | "CYCLE">("TRAIN");

  const EMISSION_RATES = {
    FLIGHT: { val: 245, color: "#C4845A", height: "100%", offset: "20", text: "High Impact" },
    BUS: { val: 68, color: "#8B5E3C", height: "45%", offset: "50", text: "Medium Impact" },
    TRAIN: { val: 24, color: "#7BAE8A", height: "25%", offset: "80", text: "Low Impact" },
    CYCLE: { val: 0, color: "#4A8B5C", height: "5%", offset: "100", text: "Zero Impact" },
  };

  const current = EMISSION_RATES[transport];

  return (
    <section className="w-full py-2xl px-4 md:px-xl mx-auto max-w-[1440px] border-t border-white/5">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left: Explanation */}
        <div className="w-full lg:w-1/2">
          <h2 className="font-display text-fluid-section font-light text-white tracking-tightest leading-tight mb-6">
            Your Journey, <br/>
            <span className="italic text-leaf">Measured</span>
          </h2>
          <p className="text-stone-400 font-body text-lg max-w-lg mb-10 leading-relaxed">
            Every millimeter of your trip is calculated for its ecological cost. 
            We provide transparent carbon tracking and heavily subsidize local 
            community reforestation to ensure your travel remains drastically net-positive.
          </p>

          <div className="space-y-4 mb-10 border-l border-white/10 pl-6">
            <h3 className="font-mono text-xs tracking-widest uppercase text-stone-500 mb-6">Change your transport</h3>
            {/* Custom Radios */}
            <div className="flex flex-col gap-3">
              {[
                { id: "FLIGHT", icon: <Plane size={16}/>, label: "Domestic Flight" },
                { id: "BUS", icon: <Bus size={16}/>, label: "AC Sleeper Bus" },
                { id: "TRAIN", icon: <Train size={16}/>, label: "Electric Train (Vande Bharat)" },
                { id: "CYCLE", icon: <Bike size={16}/>, label: "Walking / Cycling" },
              ].map(opt => (
                <button 
                  key={opt.id}
                  onClick={() => setTransport(opt.id as any)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-colors font-body text-sm ${transport === opt.id ? "bg-white/5 border border-white/10 text-white" : "text-stone-400 hover:bg-white/5 hover:text-white border border-transparent"}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transport === opt.id ? "bg-leaf text-ink" : "bg-ink-soft"}`}>
                    {opt.icon}
                  </div>
                  {opt.label}
                  {transport === opt.id && <div className="ml-auto w-2 h-2 rounded-full bg-leaf" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: SVG Viz */}
        <div className="w-full lg:w-1/2 flex justify-end">
          <div className="w-full max-w-md aspect-square glass rounded-full flex items-center justify-center p-12 relative overflow-hidden">
            {/* Animated SVG Ring */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full -rotate-90 opacity-40">
              <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
              <motion.circle 
                cx="100" cy="100" r="96" fill="none" 
                stroke={current.color} strokeWidth="4" strokeLinecap="round"
                strokeDasharray="600"
                initial={{ strokeDashoffset: 600 }}
                animate={{ strokeDashoffset: 600 * (1 - (current.val / 300)) }}
                transition={{ duration: 1, type: "spring", bounce: 0.2 }}
              />
            </svg>

            {/* Center Data */}
            <div className="text-center relative z-10 w-full">
              <p className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-2">Footprint</p>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <motion.span 
                  key={current.val}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-8xl font-light text-white"
                >
                  {current.val}
                </motion.span>
                <span className="font-mono text-sm text-stone-500">kg</span>
              </div>
              <motion.div 
                key={current.text}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-body mx-auto w-fit"
                style={{ color: current.color, backgroundColor: `${current.color}15` }}
              >
                {current.text}
              </motion.div>
            </div>
            
            {/* Visual Bar chart below in the circle */}
            <div className="absolute bottom-12 w-32 h-24 flex items-end justify-between gap-2 overflow-hidden">
              <motion.div className="w-full rounded-t-sm" animate={{ height: "80%", backgroundColor: "#C4845A" }} />
              <motion.div className="w-full rounded-t-sm" animate={{ height: "45%", backgroundColor: "#8B5E3C" }} />
              <motion.div className="w-full rounded-t-sm bg-leaf relative" animate={{ height: current.height, backgroundColor: current.color }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white">YOU</div>
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
