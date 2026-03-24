"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin, Target, Layers, Plus, Save, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Admin Dark Tile URL
const TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

const MOCK_LOCATIONS = [
  { id: 1, name: "Munnar Eco Village", region: "Kerala", lat: 10.0889, lng: 77.0595, status: "Active" },
  { id: 2, name: "Ziro Valley", region: "Arunachal", lat: 27.5348, lng: 93.8340, status: "Active" },
  { id: 3, name: "Sundarbans Stay", region: "West Bengal", lat: 21.9497, lng: 89.1833, status: "Active" },
  { id: 4, name: "Coorg Estate", region: "Karnataka", lat: 12.3375, lng: 75.8069, status: "Pending" },
  { id: 5, name: "Spiti Valley", region: "Himachal", lat: 32.2461, lng: 78.0349, status: "Active" },
];

export default function LocationsMapManager() {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newLoc, setNewLoc] = useState<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer(TILE_URL).addTo(map);
    mapRef.current = map;

    // Add markers
    MOCK_LOCATIONS.forEach(loc => {
      const marker = L.marker([loc.lat, loc.lng], {
        icon: L.divIcon({
          className: 'admin-loc-marker',
          html: `<div style="width: 14px; height: 14px; background: #D4A843; border: 2px solid #09090B; border-radius: 50%; box-shadow: 0 0 10px #D4A843;"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
      }).addTo(map);

      marker.on('click', () => setSelectedId(loc.id));
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const handleCenter = (lat: number, lng: number, id: number) => {
    setSelectedId(id);
    mapRef.current?.flyTo([lat, lng], 12);
  };

  return (
    <div className="flex bg-[#111113] border border-[#27272A] rounded-2xl overflow-hidden h-[calc(100vh-160px)]">
      
      {/* Sidebar List */}
      <div className="w-[320px] bg-[#0D0D0F] border-r border-[#27272A] flex flex-col">
        <div className="p-4 border-b border-[#27272A]">
           <div className="relative group mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-[#D4A843] transition-colors" />
              <input type="text" placeholder="Filter locations..." className="admin-input pl-9 h-9 text-xs" />
           </div>
           <button 
              onClick={() => setIsAdding(true)}
              className="w-full h-10 bg-[#D4A843] text-[#09090B] rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#E4B853] transition-all"
           >
              <Plus size={16} /> Add New Location
           </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2 custom-scrollbar">
           {MOCK_LOCATIONS.map(loc => (
             <button 
                key={loc.id}
                onClick={() => handleCenter(loc.lat, loc.lng, loc.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  selectedId === loc.id 
                    ? 'bg-[#D4A843]/10 border-[#D4A843]/30 ring-1 ring-[#D4A843]/20' 
                    : 'bg-[#18181B]/50 border-transparent hover:border-[#27272A] hover:bg-[#18181B]'
                }`}
             >
                <div className="flex justify-between items-start mb-1">
                   <p className={`text-xs font-bold transition-colors ${selectedId === loc.id ? 'text-[#D4A843]' : 'text-stone-300'}`}>{loc.name}</p>
                   <span className={`text-[9px] font-bold px-1 rounded uppercase tracking-widest ${loc.status === 'Active' ? 'text-green-500' : 'text-yellow-500'}`}>{loc.status}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-stone-600 font-medium">
                   <MapPin size={10} /> {loc.region}
                </div>
             </button>
           ))}
        </div>

        <div className="p-4 bg-[#09090B] border-t border-[#27272A]">
           <p className="text-[10px] font-bold text-stone-600 uppercase tracking-widest leading-none">Status</p>
           <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" /><span className="text-[10px] text-stone-500">Live</span></div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500" /><span className="text-[10px] text-stone-500">Pending</span></div>
           </div>
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 relative bg-[#09090B]">
        <div ref={mapContainerRef} className="w-full h-full z-0" />
        
        {/* Map Toolbar Overlay */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
           <div className="flex flex-col bg-[#111113]/90 backdrop-blur-md border border-[#27272A] rounded-lg p-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#27272A] text-stone-400 hover:text-white transition-all"><Target size={16} /></button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#27272A] text-stone-400 hover:text-white transition-all"><Layers size={16} /></button>
           </div>
        </div>

        {/* Selected Instance Overlay */}
        <AnimatePresence>
          {selectedId && !isAdding && (
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 20 }}
               className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-[400px] z-10"
            >
               <div className="bg-[#111113]/95 backdrop-blur-xl border border-[#D4A843]/20 rounded-2xl p-6 shadow-2xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A843]/5 blur-3xl pointer-events-none" />
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="text-lg font-bold text-white font-display uppercase tracking-tight">
                           {MOCK_LOCATIONS.find(l => l.id === selectedId)?.name}
                        </h3>
                        <p className="text-xs text-stone-500 font-mono mt-1">COORD: {MOCK_LOCATIONS.find(l => l.id === selectedId)?.lat.toFixed(4)}, {MOCK_LOCATIONS.find(l => l.id === selectedId)?.lng.toFixed(4)}</p>
                     </div>
                     <button onClick={() => setSelectedId(null)} className="text-stone-600 hover:text-white transition-colors">
                        <X size={20} />
                     </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                     <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                        <p className="text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">Bookings</p>
                        <p className="text-xl font-bold font-mono text-[#D4A843]">348</p>
                     </div>
                     <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                        <p className="text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">Reach</p>
                        <p className="text-xl font-bold font-mono text-white">84%</p>
                     </div>
                  </div>

                  <div className="flex gap-3">
                     <button className="flex-1 h-11 admin-btn-primary">
                        <Save size={16} /> Save Changes
                     </button>
                     <button className="h-11 px-4 border border-[#27272A] rounded-lg text-stone-400 hover:text-white hover:bg-[#18181B] transition-all">
                        Edit Pins
                     </button>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Mode Overlay */}
        <AnimatePresence>
          {isAdding && (
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               className="absolute inset-y-0 right-0 w-80 bg-[#111113] border-l border-[#27272A] z-20 p-6 flex flex-col pt-10"
            >
               <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Add Location</h3>
               <div className="p-4 rounded-xl bg-[#D4A843]/5 border border-[#D4A843]/20 mb-8">
                  <p className="text-[11px] text-stone-400 leading-relaxed italic">Click anywhere on the map to drop a primary destination pin.</p>
               </div>
               
               <div className="space-y-4">
                  <div className="space-y-1.5 text-xs">
                     <label className="text-stone-500 font-bold uppercase tracking-widest">Name</label>
                     <input type="text" className="admin-input" placeholder="Majuli Island" />
                  </div>
                  <div className="space-y-1.5 text-xs">
                     <label className="text-stone-500 font-bold uppercase tracking-widest">Region</label>
                     <input type="text" className="admin-input" placeholder="Assam" />
                  </div>
               </div>

               <div className="mt-auto flex flex-col gap-2">
                  <button className="h-11 admin-btn-primary">Publish Location</button>
                  <button onClick={() => setIsAdding(false)} className="h-11 text-stone-500 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">Cancel</button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .leaflet-container { background: #09090B !important; }
        .admin-loc-marker { outline: none !important; }
      `}</style>
    </div>
  );
}
