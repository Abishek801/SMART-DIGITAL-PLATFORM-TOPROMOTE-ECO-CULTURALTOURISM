"use client";

import { useEffect, useState } from "react";
import { ALL_DESTINATIONS } from "@/lib/data/destinations";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import SmartImage from "@/components/ui/SmartImage";
import { getDestinationImage } from "@/lib/images";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface InteractiveMapProps {
  selectedDestinationId: string | null;
  onMarkerClick: (id: string) => void;
}

// Custom map flyer
function MapUpdater({ selectedId }: { selectedId: string | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedId) {
      const dest = ALL_DESTINATIONS.find(d => d.id === selectedId);
      if (dest && dest.lat && dest.lng) {
        map.flyTo([dest.lat, dest.lng], 12, { duration: 1.5 });
      }
    }
  }, [selectedId, map]);
  return null;
}

export default function InteractiveMap({ selectedDestinationId, onMarkerClick }: InteractiveMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-full h-full bg-stone-900 animate-pulse flex items-center justify-center text-stone-500">Loading map...</div>;

  return (
    <div className="w-full h-full relative" style={{ zIndex: 0 }}>
      {/* Subtle overlay */}
      <div className="absolute inset-0 pointer-events-none z-[400] bg-stone-950/20 mix-blend-multiply" />
      
      <MapContainer
        center={[21.0, 78.0]}
        zoom={selectedDestinationId ? 12 : 5}
        scrollWheelZoom={true}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <MapUpdater selectedId={selectedDestinationId} />

        {ALL_DESTINATIONS.map((dest) => (
          dest.lat && dest.lng ? (
            <Marker 
              key={dest.id} 
              position={[dest.lat, dest.lng]}
              eventHandlers={{
                click: () => onMarkerClick(dest.id)
              }}
            >
              <Popup className="custom-popup">
                <div className="p-1 -m-1 custom-popup-content flex flex-col gap-1 w-[200px]">
                  <div className="h-28 w-full relative rounded-md overflow-hidden mb-1.5 border border-forest-900/30">
                    <SmartImage 
                      src={getDestinationImage(dest.slug)} 
                      alt={dest.name} 
                      aspectRatio="landscape"
                      className="w-full h-full" 
                    />
                  </div>
                  <h3 className="font-display font-bold text-[15px] text-stone-100 leading-tight">{dest.name}</h3>
                  <p className="text-stone-400 text-[11px] font-body">{dest.region}, {dest.country}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-forest-900/40 text-forest-300 border border-forest-800/30">
                      {dest.category.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>

      {/* Custom popup styles */}
      <style>{`
        .leaflet-container {
          background-color: #0c0a09 !important;
          font-family: inherit;
        }
        .leaflet-popup-content-wrapper {
          background: rgba(12, 10, 9, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(85, 107, 47, 0.5);
          border-radius: 12px;
          color: #f5f5f4;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6);
        }
        .leaflet-popup-tip {
          background: rgba(12, 10, 9, 0.95);
          border: 1px solid rgba(85, 107, 47, 0.5);
          border-top: none;
          border-left: none;
        }
        .custom-popup-content h3 {
          margin: 0;
        }
        .custom-popup-content p {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
