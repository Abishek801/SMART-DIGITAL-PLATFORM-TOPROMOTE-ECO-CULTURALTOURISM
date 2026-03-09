"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaLeaf,
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";

function DestSkeleton() {
  return (
    <div className="glass-panel p-0 overflow-hidden flex flex-col h-full border-white/5">
      <div className="h-56 skeleton w-full"></div>
      <div className="p-6 space-y-3">
        <div className="h-2 skeleton w-16"></div>
        <div className="h-6 skeleton w-full"></div>
        <div className="h-10 skeleton w-full"></div>
      </div>
    </div>
  );
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterState, setFilterState] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await fetch("/api/destinations");
        if (res.ok) {
          const data = await res.json();
          setDestinations(data);
        }
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  const states = ["All", ...new Set(destinations.map((d) => d.state))];
  const categories = ["All", "eco village", "culture", "nature", "trekking"];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesState = filterState === "All" || dest.state === filterState;
    const matchesCategory =
      filterCategory === "All" || dest.category === filterCategory;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.state.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesCategory && matchesSearch;
  });

  return (
    <main className="container mx-auto px-4 py-12 animate-fade-in">
      {/* Header - Compacted */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-black font-heading bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 leading-tight tracking-tighter">
          Eco Hotspots
        </h1>
        <p className="text-base text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Destinations prioritizing community conservation and authentic cultural preservation.
        </p>
      </div>

      {/* Filters Bar - Compacted */}
      <div className="glass-panel p-1.5 mb-12 flex flex-col lg:flex-row items-center gap-1.5 shadow-xl border-white/5 rounded-2xl">
        <div className="relative w-full lg:w-96 group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 text-sm" />
          <input
            type="text"
            placeholder="Find a destination..."
            className="input-glass pl-10 py-3 bg-transparent border-none focus:ring-0 text-sm font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="h-px lg:h-8 w-full lg:w-px bg-white/10"></div>

        <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto px-4 py-2">
          <div className="flex items-center gap-3">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest shrink-0">
              State:
            </span>
            <select
              className="bg-slate-900 border border-white/10 rounded-lg py-1.5 px-4 text-[9px] font-black uppercase text-white tracking-widest focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest shrink-0">
              Category:
            </span>
            <select
              className="bg-slate-900 border border-white/10 rounded-lg py-1.5 px-4 text-[9px] font-black uppercase text-white tracking-widest focus:outline-none focus:border-emerald-500 transition-all cursor-pointer capitalize"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid - Compacted */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, i) => <DestSkeleton key={i} />)
        ) : filteredDestinations.length > 0 ? (
          filteredDestinations.map((dest, i) => (
            <Link
              href={`/destinations/${dest.id}`}
              key={dest.id}
              className="block group animate-slide-up h-full"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="glass-panel p-0 overflow-hidden grid-card-container hover:border-emerald-500/40 transition-all duration-500 shadow-lg hover:shadow-emerald-500/10">
                <div className="h-56 relative overflow-hidden bg-slate-800 shrink-0">
                  <div className="absolute top-4 left-4 z-20 bg-emerald-500 text-white px-2 py-0.5 rounded-md text-[7px] font-black shadow-lg flex items-center">
                    <FaLeaf className="mr-1.5" /> {dest.sustainabilityScore} ECO
                  </div>
                  <div className="absolute top-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[7px] font-black text-white uppercase tracking-widest border border-white/10">
                    {dest.category}
                  </div>
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center text-emerald-500 text-[7px] font-black uppercase tracking-widest mb-1.5">
                    <FaMapMarkerAlt className="mr-1.5" /> {dest.state}
                  </div>
                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-emerald-400 transition-colors font-heading tracking-tight leading-tight">
                    {dest.name}
                  </h3>
                  <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-2-eco mb-8 font-medium opacity-80">
                    {dest.description}
                  </p>
                  <div className="grid-card-footer border-t border-white/5 flex justify-between items-center group-hover:border-emerald-500/10 transition-colors">
                    <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">
                      Explore
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:rotate-45 transition-all">
                      <FaArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-40 glass-panel border-dashed border-white/10 opacity-30">
            <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">
              No results found.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
