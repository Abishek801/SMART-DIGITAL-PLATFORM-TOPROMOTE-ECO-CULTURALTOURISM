"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import {
  FaWind,
  FaMapMarkerAlt,
  FaLocationArrow,
  FaSearch,
  FaCloudSun,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "16px",
};

const center = {
  lat: 20.5937,
  lng: 78.9629, // Center of India
};

const categoryColors = {
  "eco village": "#10B981", // Emerald
  culture: "#F59E0B", // Amber
  nature: "#3B82F6", // Blue
  trekking: "#EC4899", // Pink
};

export default function MapExplorer() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/destinations")
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.error("Error fetching destinations:", err));
  }, []);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(loc);
          map?.panTo(loc);
          map?.setZoom(10);
        },
        () => alert("Error: The Geolocation service failed."),
      );
    }
  };

  const finalFilteredDestinations = useMemo(() => {
    return destinations.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "All" || d.category.toLowerCase() === filter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [destinations, searchTerm, filter]);

  if (loadError) {
    return (
      <div className="glass-panel p-12 text-center h-[80vh] flex flex-col justify-center items-center max-w-4xl mx-auto border-emerald-500/20">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
          <FaMapMarkerAlt className="text-4xl text-red-500" />
        </div>
        <h2 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase italic">
          Maps Configuration Required
        </h2>
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 text-left mb-8 max-w-2xl">
          <p className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-4 flex items-center">
            <span className="w-4 h-px bg-emerald-500 mr-2"></span> Potential Issue: ApiProjectMapError
          </p>
          <p className="text-slate-300 mb-6 leading-relaxed font-medium">
            It looks like the <strong>Maps JavaScript API</strong> is not enabled for your project or the API key is restricted. To fix this:
          </p>
          <ul className="space-y-4 text-sm text-slate-400 font-medium">
            <li className="flex items-start gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5">1</span>
              Go to the <a href="https://console.cloud.google.com/google/maps-apis/api-list" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Google Cloud Console</a>.
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5">2</span>
              Enable the "Maps JavaScript API" for your current project.
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5">3</span>
              Check "API Restrictions" in your credentials if you have limited the key to specific APIs.
            </li>
          </ul>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary px-8 py-3 text-[10px] font-black tracking-widest uppercase"
          >
            Retry Connection
          </button>
          <Link
            href="https://developers.google.com/maps/documentation/javascript/get-api-key"
            target="_blank"
            className="btn btn-glass px-8 py-3 text-[10px] font-black tracking-widest uppercase"
          >
            Get New API Key
          </Link>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-[80vh] w-full bg-slate-800/10 animate-pulse rounded-2xl flex items-center justify-center">
        <div className="text-emerald-500 font-bold">Loading Map...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative group">
      {/* Category Filters - NEW */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 w-auto max-w-[95%] pointer-events-none">
        <div className="glass-panel p-1.5 rounded-2xl flex gap-1 pointer-events-auto shadow-2xl border-white/5 backdrop-blur-2xl">
          {["All", "eco village", "culture", "trekking", "nature"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === cat
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                : "bg-white/5 text-slate-400 hover:text-white"
                }`}
            >
              {cat === "eco village" ? "Villages" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Actions Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap gap-4 px-2">
        <div className="relative flex-1 min-w-[280px]">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500" />
          <input
            type="text"
            placeholder="Explore by destination or state..."
            className="w-full bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-full py-3.5 px-14 text-white text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all shadow-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={handleLocateUser}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
        >
          <FaLocationArrow className="mr-2" /> Near Me
        </button>
      </div>

      <div className="relative border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            styles: darkMapStyles,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControlOptions: {
              position: 3, // BOTTOM_RIGHT
            }
          }}
        >
          <MarkerClusterer>
            {(clusterer) =>
              finalFilteredDestinations.map((dest) => (
                <Marker
                  key={dest.id}
                  position={{ lat: dest.latitude, lng: dest.longitude }}
                  clusterer={clusterer}
                  icon={{
                    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                    fillColor: categoryColors[dest.category] || "#10B981",
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: "#ffffff",
                    scale: 1.5,
                  }}
                  onClick={() => setSelected(dest)}
                />
              ))
            }
          </MarkerClusterer>

          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          )}

          {selected && (
            <InfoWindow
              position={{ lat: selected.latitude, lng: selected.longitude }}
              onCloseClick={() => setSelected(null)}
            >
              <div className="max-w-[280px] p-0 bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <div className="h-32 relative">
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded shadow-lg">
                    {selected.sustainabilityScore}% ECO
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-black text-sm uppercase tracking-tight">{selected.name}</h3>
                    <div className="text-amber-400 text-[9px] font-black flex items-center">
                      <FaCloudSun className="mr-1" /> 24°C
                    </div>
                  </div>
                  <p className="text-slate-400 text-[10px] leading-relaxed mb-4 line-clamp-2">
                    {selected.description}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        router.push(`/planner?dest=${selected.name}`)
                      }
                      className="flex-1 bg-emerald-500 text-white text-[8px] font-black py-2.5 rounded-lg hover:bg-emerald-600 transition-colors uppercase tracking-widest shadow-lg shadow-emerald-500/10"
                    >
                      AI Plan
                    </button>
                    <Link
                      href={`/destinations/${selected.id}`}
                      className="flex-1 bg-white/5 border border-white/10 text-white text-[8px] font-black py-2.5 rounded-lg text-center hover:bg-white/10 transition-colors uppercase tracking-widest"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      {/* Legend - Compacted */}
      <div className="flex flex-wrap gap-6 justify-center p-6 glass-panel border-white/5">
        {Object.entries(categoryColors).map(([cat, color]) => (
          <div key={cat} className="flex items-center space-x-3">
            <span
              className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              style={{ backgroundColor: color }}
            ></span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {cat}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  // ... more styles for dark mode
];
