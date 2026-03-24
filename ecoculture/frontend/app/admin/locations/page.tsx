"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamic Import for Leaflet (SSR: false)
const LocationsMapManager = dynamic(
  () => import("@/components/admin/map/LocationsMapManager"),
  { 
    ssr: false,
    loading: () => <div className="w-full h-[600px] bg-[#111113] animate-pulse rounded-2xl flex items-center justify-center text-stone-600 font-mono text-sm">Loading Global Coordinates...</div>
  }
);

export default function LocationsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-display">Geospatial Management</h1>
          <p className="text-stone-500 text-sm font-medium mt-1">Manage destination pins and geographic boundaries</p>
        </div>
      </div>

      <div className="h-[calc(100vh-200px)]">
         <LocationsMapManager />
      </div>
    </div>
  );
}
