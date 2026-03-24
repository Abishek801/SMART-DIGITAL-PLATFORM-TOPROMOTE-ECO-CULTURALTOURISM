"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X, Sliders } from "lucide-react";
import { ALL_DESTINATIONS } from "@/lib/data/destinations";
import DestinationCard from "@/components/ui/DestinationCard";

const CATEGORIES = ["ALL", "ECO_VILLAGE", "CULTURE", "TREKKING", "NATURE", "WILDLIFE"];

export default function DestinationsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [difficulty, setDifficulty] = useState("ALL");
  const [minScore, setMinScore] = useState(60);

  const filtered = useMemo(() => {
    return ALL_DESTINATIONS.filter((d) => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.region.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "ALL" || d.category === category;
      const matchDiff = difficulty === "ALL" || d.difficulty === difficulty;
      const matchScore = d.sustainabilityScore >= minScore;
      return matchSearch && matchCat && matchDiff && matchScore;
    });
  }, [search, category, difficulty, minScore]);

  // Magazine layout logic: 
  // Loop cycle of 6 items: [Hero (row 1)], [Large, Small (row 2)], [Standard, Standard, Standard (row 3)]
  const getColSpan = (index: number) => {
    const pos = index % 6;
    if (pos === 0) return "col-span-12"; // Hero
    if (pos === 1) return "col-span-12 md:col-span-7"; // Large
    if (pos === 2) return "col-span-12 md:col-span-5"; // Small
    return "col-span-12 md:col-span-4"; // 3 equal Standard
  };

  const getVariant = (index: number) => {
    const pos = index % 6;
    if (pos === 0) return "hero";
    if (pos === 1) return "large";
    return "standard";
  };

  return (
    <div className="min-h-screen bg-ink pt-24 pb-32">
      
      {/* Editorial Header */}
      <div className="w-full max-w-[1440px] px-4 md:px-xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-leaf" />
          <span className="font-mono text-xs tracking-widest uppercase text-stone-400">Curated Collection</span>
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-fluid-hero font-light leading-none tracking-tightest text-white">
          The World's <span className="italic text-sage">Finest</span> <br/>
          Eco-Sanctuaries
        </motion.h1>
      </div>

      <div className="w-full max-w-[1440px] px-4 md:px-xl mx-auto flex flex-col lg:flex-row gap-12 relative items-start">
        
        {/* Sticky Filters Sidebar */}
        <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-32 space-y-10">
          
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
            <input 
              type="text" 
              placeholder="Search destinations..." 
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-ink-soft border border-white/10 rounded-pill py-3 pl-12 pr-4 text-sm font-body text-white focus:outline-none focus:border-leaf transition-colors placeholder-stone-600"
            />
          </div>

          {/* Custom Category List */}
          <div>
            <h3 className="font-mono text-[10px] tracking-widest uppercase text-stone-500 mb-4 flex items-center gap-2">
              <Sliders size={12} /> Environments
            </h3>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-left px-4 py-2.5 rounded-lg font-body text-sm transition-all focus:outline-none ${category === cat ? "bg-white/10 text-white font-medium pl-6" : "text-stone-400 hover:text-white hover:bg-white/5"}`}
                >
                  {cat.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Vertical Notch Difficulty */}
          <div>
            <h3 className="font-mono text-[10px] tracking-widest uppercase text-stone-500 mb-6">Pace & Rigor</h3>
            <div className="relative pl-6">
              {/* Vertical line connecting nodes */}
              <div className="absolute left-[11px] top-3 bottom-4 w-px bg-white/10" />
              
              <div className="flex flex-col gap-6 relative z-10">
                {["ALL", "EASY", "MODERATE", "HARD", "EXPERT"].map((diff, i) => (
                  <button 
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`flex items-center gap-4 group focus:outline-none relative`}
                  >
                    <div className="absolute -left-6 flex items-center justify-center w-[11px] h-[11px]">
                       <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${difficulty === diff ? "bg-clay shadow-[0_0_10px_rgba(196,132,90,0.8)] scale-125 box-border border-2 border-ink" : "bg-white/20 group-hover:bg-white/40"}`} />
                    </div>
                    <span className={`font-mono text-xs tracking-wider uppercase transition-colors ${difficulty === diff ? "text-white font-bold" : "text-stone-500 group-hover:text-stone-300"}`}>
                      {diff}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom SVG Arc Slider Substitute - Linear Range */}
          <div>
            <div className="flex items-end justify-between mb-4">
              <h3 className="font-mono text-[10px] tracking-widest uppercase text-stone-500">Min Eco Score</h3>
              <span className="font-mono font-bold text-leaf">{minScore}</span>
            </div>
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-2">
               <div className="absolute inset-y-0 left-0 bg-leaf" style={{ width: `${((minScore - 40) / 60) * 100}%` }} />
               <input 
                 type="range" min="40" max="100" 
                 value={minScore} onChange={e => setMinScore(Number(e.target.value))}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-stone-600">
               <span>40</span>
               <span>100</span>
            </div>
          </div>

        </aside>

        {/* Asymmetrical Magazine Grid */}
        <div className="flex-1 w-full">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-12 gap-4 md:gap-6"
              >
                {filtered.map((dest, i) => (
                  <div key={dest.id} className={`${getColSpan(i)} h-full flex`}>
                    <DestinationCard destination={dest} index={i} variant={getVariant(i)} />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full flex flex-col items-center justify-center p-20 glass rounded-panel border border-white/5 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <MapPin size={30} className="text-stone-600" />
                </div>
                <h3 className="font-display text-3xl font-light text-white mb-3">No Sanctuaries Found</h3>
                <p className="font-body text-stone-400 mb-8 max-w-sm text-sm">We couldn't locate any destinations matching these exact ecological parameters.</p>
                <button onClick={() => { setSearch(""); setCategory("ALL"); setDifficulty("ALL"); setMinScore(60); }} className="h-12 px-6 rounded-pill bg-white text-ink font-heading font-medium hover:bg-stone-200 transition-colors">
                  Reset Explorer
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
