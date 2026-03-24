"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Admin Dark Tile URL (CartoDB Dark Matter)
const TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

const DESTINATIONS = [
  { name: "Munnar Eco Village", coords: [10.0889, 77.0595], bookings: 348, revenue: "₹8.4L", color: "#D4A843" },
  { name: "Ziro Valley", coords: [27.5348, 93.8340], bookings: 215, revenue: "4.2L", color: "#4A8B5C" },
  { name: "Sundarbans", coords: [21.9497, 89.1833], bookings: 184, revenue: "3.1L", color: "#3B82F6" },
  { name: "Coorg Estate", coords: [12.3375, 75.8069], bookings: 276, revenue: "6.8L", color: "#C4845A" },
  { name: "Spiti Valley", coords: [32.2461, 78.0349], bookings: 98, revenue: "2.1L", color: "#8B5E3C" },
];

export default function DestinationMap() {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer(TILE_URL).addTo(map);

    // Add custom markers
    DESTINATIONS.forEach(dest => {
      const size = Math.min(60, Math.max(30, dest.bookings / 6));
      
      const icon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            width: ${size}px;
            height: ${size}px;
            background: ${dest.color}11;
            border: 1px solid ${dest.color}44;
            border-radius: 50%;
            display: flex;
            items-center: center;
            justify-content: center;
            animation: marker-pulse 2s infinite;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background: ${dest.color};
              border-radius: 50%;
              box-shadow: 0 0 10px ${dest.color};
            "></div>
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });

      const marker = L.marker(dest.coords as any, { icon }).addTo(map);
      
      marker.bindPopup(`
        <div style="background: #111113; color: white; padding: 12px; border-radius: 8px; border: 1px solid #27272A; min-width: 180px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; color: ${dest.color}; font-weight: bold;">${dest.name}</h4>
          <div style="display: grid; grid-template-cols: 1fr 1fr; gap: 8px;">
            <div>
              <p style="margin: 0; font-size: 10px; color: #71717A; text-transform: uppercase;">Bookings</p>
              <p style="margin: 0; font-size: 14px; font-weight: bold; font-family: monospace;">${dest.bookings}</p>
            </div>
            <div>
              <p style="margin: 0; font-size: 10px; color: #71717A; text-transform: uppercase;">Revenue</p>
              <p style="margin: 0; font-size: 14px; font-weight: bold; font-family: monospace;">${dest.revenue}</p>
            </div>
          </div>
          <button style="width: 100%; margin-top: 12px; height: 32px; background: #18181B; border: 1px solid #3F3F46; border-radius: 6px; color: white; font-size: 11px; cursor: pointer;">View Details</button>
        </div>
      `, {
        className: 'admin-map-popup',
        closeButton: false
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] bg-[#09090B] border border-[#27272A] rounded-xl overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      {/* Map UI Overlay */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
         <div className="bg-[#111113]/90 backdrop-blur-md border border-[#27272A] p-4 rounded-xl w-64 shadow-2xl">
            <h3 className="text-sm font-semibold text-white mb-1">Destination Reach</h3>
            <p className="text-[10px] text-stone-500 mb-4 uppercase tracking-[0.1em] font-bold">Live Monitoring Page</p>
            
            <div className="space-y-3">
               <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Total Destinations</span>
                  <span className="text-white font-mono">24</span>
               </div>
               <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Avg. Sustainability</span>
                  <span className="text-green-500 font-mono">92.4%</span>
               </div>
               <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Outreach Coverage</span>
                  <span className="text-[#D4A843] font-mono">78%</span>
               </div>
            </div>
         </div>
      </div>

      <style jsx global>{`
        .admin-map-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          padding: 0 !important;
          border-radius: 12px !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5) !important;
        }
        .admin-map-popup .leaflet-popup-tip {
          background: #111113 !important;
        }
        .admin-map-popup .leaflet-popup-content {
          margin: 0 !important;
        }
        @keyframes marker-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
