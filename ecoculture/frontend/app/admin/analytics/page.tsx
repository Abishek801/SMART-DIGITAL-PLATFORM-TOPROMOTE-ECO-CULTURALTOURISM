"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Grid3X3, Map as MapIcon, Calendar, Filter } from "lucide-react";

// Components
import OrdersHeatmap from "@/components/admin/heatmap/OrdersHeatmap";

// Dynamic Import for Leaflet (SSR: false)
const DestinationMap = dynamic(
  () => import("@/components/admin/map/DestinationMap"),
  { 
    ssr: false,
    loading: () => <div className="w-full h-[500px] bg-[#111113] animate-pulse rounded-xl flex items-center justify-center text-stone-600 font-mono text-sm">Initializing Satellite Data...</div>
  }
);

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<"heatmap" | "map">("heatmap");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-display">Deep Analytics</h1>
          <p className="text-stone-500 text-sm font-medium mt-1">Advanced data intelligence for platform optimization</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-[#111113] border border-[#27272A] p-1 rounded-xl">
             <button 
                onClick={() => setActiveTab("heatmap")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "heatmap" ? "bg-[#D4A843] text-[#09090B]" : "text-stone-500 hover:text-white"}`}
             >
                <Grid3X3 size={14} /> Heatmap
             </button>
             <button 
                onClick={() => setActiveTab("map")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "map" ? "bg-[#D4A843] text-[#09090B]" : "text-stone-500 hover:text-white"}`}
             >
                <MapIcon size={14} /> Destination Map
             </button>
          </div>
        </div>
      </div>

      {/* Filter / Control Bar */}
      <div className="flex items-center justify-between py-3 px-4 bg-[#111113] border border-[#27272A] rounded-xl">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[11px] font-bold text-stone-300">
               <span className="text-stone-600 uppercase tracking-widest px-2 py-0.5 border border-[#27272A] rounded">Period</span>
               Last 12 Months
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-stone-300">
               <span className="text-stone-600 uppercase tracking-widest px-2 py-0.5 border border-[#27272A] rounded">Region</span>
               All India
            </div>
         </div>
         <button className="flex items-center gap-2 text-[11px] font-bold text-[#D4A843] hover:text-[#E4B853] transition-colors">
            <Filter size={14} /> Advanced Filters
         </button>
      </div>

      {/* Content */}
      <div className="relative min-h-[600px] mb-12">
        <AnimatePresence mode="wait">
          {activeTab === "heatmap" ? (
            <motion.div
              key="heatmap"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <OrdersHeatmap />
            </motion.div>
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="h-[650px]"
            >
              <DestinationMap />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
