"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ALL_DESTINATIONS } from "@/lib/data/destinations";

// Dynamically import react-globe.gl to avoid SSR issues
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false, loading: () => <div className="w-[400px] h-[400px] rounded-full border border-forest-800/20 animate-pulse bg-stone-900/50" /> });

export function EcoGlobe() {
  const globeRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Basic responsive handling
    const handleResize = () => {
      const width = Math.min(window.innerWidth - 40, 800);
      setDimensions({ width, height: width });
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Format destinations for the globe
  const markers = ALL_DESTINATIONS.filter(d => d.lat && d.lng).map(d => ({
    lat: d.lat,
    lng: d.lng,
    size: 0.05,
    color: "#84cc16", // Lime-like green for glowing effect
    name: d.name,
    category: d.category
  }));

  if (!isClient) return null;

  return (
    <div className="flex items-center justify-center relative w-full rounded-full cursor-move" style={{ height: dimensions.height }}>
      {/* Decorative orbital rings behind the globe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-forest-500/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full border border-forest-500/5 border-dashed" />
      
      {/* Soft Glow Behind Globe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-forest-500/10 blur-[100px]" />
      
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        
        // Custom Points
        pointsData={markers}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude="size"
        pointRadius={0.4}
        pointsMerge={true}
        
        // Labels
        labelsData={markers}
        labelLat="lat"
        labelLng="lng"
        labelText="name"
        labelSize={1.5}
        labelDotRadius={0.5}
        labelColor={() => "rgba(255, 255, 255, 0.75)"}
        labelResolution={2}
        labelAltitude={0.06}
        
        // Arcs (visual lines connecting some nodes just for visual flair)
        arcsData={markers.slice(0, 4).map((m, i) => ({
            startLat: markers[0].lat,
            startLng: markers[0].lng,
            endLat: m.lat,
            endLng: m.lng,
            color: ["#4da350", "rgba(77, 163, 80, 0)"]
        }))}
        arcColor={(d: any) => d.color}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcAltitudeAutoScale={0.3}

        onGlobeReady={() => {
            if (globeRef.current) {
                // Set initial camera position viewing India roughly, and auto rotate
                globeRef.current.pointOfView({ lat: 20, lng: 80, altitude: 2.2 }, 0);
                globeRef.current.controls().autoRotate = true;
                globeRef.current.controls().autoRotateSpeed = 0.5;
                // prevent zooming out too far
                globeRef.current.controls().minDistance = 150;
                globeRef.current.controls().maxDistance = 400;
            }
        }}
      />
    </div>
  );
}
