"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ALL_DESTINATIONS } from "@/lib/data/destinations";
import { Search, MapPin, Leaf, ChevronRight, Compass, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { getDestinationImage } from "@/lib/images";

const InteractiveMap = dynamic(
  () => import("@/components/map/InteractiveMap"),
  { 
    ssr: false, 
    loading: () => <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900/50 animate-pulse text-stone-500 gap-3"><Compass className="animate-spin-slow" size={32} />Loading eco-map...</div> 
  }
);
import { motion, AnimatePresence } from "framer-motion";

const MAP_CATEGORIES = ["ALL", "ECO_VILLAGE", "CULTURE", "TREKKING", "NATURE", "WILDLIFE"];
const CAT_LABEL: Record<string, string> = {
  ALL: "All", ECO_VILLAGE: "Eco Village", CULTURE: "Culture",
  TREKKING: "Trekking", NATURE: "Nature", WILDLIFE: "Wildlife"
};

export default function MapPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [minScore, setMinScore] = useState(40);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = ALL_DESTINATIONS.filter(d =>
    (d.name.toLowerCase().includes(search.toLowerCase()) ||
     d.region.toLowerCase().includes(search.toLowerCase())) &&
    (category === "ALL" || d.category === category) &&
    d.sustainabilityScore >= minScore
  );

  return (
    <div className="h-screen w-full flex pt-16 bg-stone-950 overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-[400px] h-full flex flex-col glass-dark border-r border-forest-900/30 z-10 shrink-0 shadow-2xl relative">
        <div className="p-5 border-b border-forest-900/20 bg-stone-950/40 backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-xl font-bold text-stone-100">Explore Destinations</h1>
            <button onClick={() => setShowFilters(f => !f)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-colors ${showFilters ? "bg-forest-900/50 text-forest-400" : "text-stone-500 hover:text-white"}`}>
              <SlidersHorizontal size={12} /> Filters
            </button>
          </div>
          
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
            <input 
              type="text" 
              placeholder="Search destinations..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-stone-900/60 border border-forest-800/30 rounded-xl py-2.5 pl-10 pr-4 text-sm text-stone-200 focus:outline-none focus:border-forest-500/50 transition-colors placeholder:text-stone-600"
            />
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-4 pt-1">
                {/* Category Chips */}
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-stone-600 mb-2">Category</p>
                  <div className="flex flex-wrap gap-1.5">
                    {MAP_CATEGORIES.map(cat => (
                      <button key={cat} onClick={() => setCategory(cat)}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all ${category === cat ? "bg-forest-700 text-white" : "bg-white/5 text-stone-500 hover:text-white"}`}>
                        {CAT_LABEL[cat]}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Eco Score */}
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-stone-600">Min Eco Score</p>
                    <span className="font-mono text-xs font-bold text-forest-400">{minScore}</span>
                  </div>
                  <div className="relative h-1.5 bg-white/5 rounded-full">
                    <div className="absolute inset-y-0 left-0 bg-forest-500 rounded-full" style={{ width: `${((minScore - 40) / 60) * 100}%` }} />
                    <input type="range" min="40" max="100" value={minScore} onChange={e => setMinScore(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2 pb-24">
          {filtered.length > 0 ? filtered.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={`w-full text-left p-3 rounded-xl transition-all border ${selectedId === d.id ? "bg-forest-900/40 border-forest-500/50 shadow-[0_0_15px_rgba(45,133,48,0.1)]" : "glass border-transparent hover:border-forest-800/40"}`}
            >
              <div className="flex gap-3">
                <div className="w-16 h-16 shrink-0">
                  <SmartImage 
                    src={getDestinationImage(d.slug)} 
                    alt={d.name} 
                    aspectRatio="square"
                    className="rounded-lg" 
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="font-display font-bold text-stone-200 text-sm truncate">{d.name}</h3>
                  <p className="text-stone-400 text-xs font-body flex items-center gap-1 mt-0.5 truncate">
                    <MapPin size={10} className="shrink-0" /> {d.region}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 break-words flex-wrap">
                    <span className="text-forest-400 text-[9px] flex items-center gap-0.5 bg-forest-900/30 px-1.5 py-0.5 rounded-md border border-forest-700/30">
                      <Leaf size={8} /> {d.sustainabilityScore}
                    </span>
                    <span className="text-[9px] text-stone-500 font-body">{d.category.replace("_", " ")}</span>
                  </div>
                </div>
              </div>
            </button>
          )) : (
            <div className="text-center py-10 text-stone-500 text-sm font-body">
              No destinations found
            </div>
          )}
        </div>
        
        {/* Back Link */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-stone-950/80 backdrop-blur-md border-t border-forest-900/20">
             <Link href="/destinations" className="flex items-center justify-center gap-2 w-full btn-outline py-2.5 text-sm">
                <ChevronRight size={14} className="rotate-180" /> Back to Destinations List
             </Link>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative h-full">
        <InteractiveMap 
          selectedDestinationId={selectedId} 
          onMarkerClick={setSelectedId} 
        />
        
        {/* Floating instruction if needed */}
        <AnimatePresence>
          {!selectedId && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-dark px-6 py-3 rounded-full border border-forest-900/40 shadow-xl pointer-events-none z-10"
            >
              <p className="text-stone-300 text-sm font-body flex items-center gap-2">
                <MapPin size={14} className="text-forest-400" /> 
                Select a marker to explore
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
