"use client";

import dynamic from "next/dynamic";
import { FaLeaf } from "react-icons/fa";

// Lazy load the Map component to optimize page load performance
const MapExplorer = dynamic(() => import("../../components/MapExplorer"), {
  ssr: false,
  loading: () => (
    <div className="h-[70vh] w-full bg-slate-800/10 animate-pulse rounded-2xl"></div>
  ),
});

export default function MapPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-emerald-400 flex items-center">
            <FaLeaf className="mr-4 text-3xl" /> Eco Explorer
          </h1>
          <p className="text-slate-400 mt-2 max-w-xl">
            Interactive map of sustainable destinations across India. Find
            eco-villages, cultural hubs, and nature treks near you.
          </p>
        </div>
      </div>

      <div className="glass-panel overflow-hidden p-0 rounded-2xl shadow-2xl">
        <MapExplorer />
      </div>
    </main>
  );
}
