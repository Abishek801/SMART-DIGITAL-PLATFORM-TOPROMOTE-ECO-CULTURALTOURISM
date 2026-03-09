"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaLeaf,
  FaSuitcaseRolling,
  FaShoppingBag,
  FaHistory,
  FaSpinner,
  FaArrowRight,
  FaChartLine,
  FaHandsHelping,
  FaCheckCircle,
} from "react-icons/fa";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState({ itineraries: [], purchases: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, router]);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`/api/user/dashboard`);
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      }
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const ecoStats = {
    footprintSaved: userData.itineraries
      .reduce((acc, it) => acc + (it.carbonFootprint || 0), 0)
      .toFixed(1),
    tripsCompleted: userData.itineraries.length,
    itemsPurchased: userData.purchases.length,
    artisanImpact: (userData.purchases.length * 1.5).toFixed(0), // Mock metric
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col justify-center items-center py-48 text-emerald-400 space-y-4">
        <FaSpinner className="animate-spin text-5xl" />
        <p className="font-black uppercase tracking-[0.2em] text-[8px]">
          Accessing Eco-Substrate...
        </p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-16 animate-fade-in min-h-screen">
      {/* Header Area - Compacted */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-emerald-500 font-black uppercase tracking-[0.3em] text-[8px]">
            <span className="w-6 h-px bg-emerald-500"></span> Personal Impact
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter leading-tight">
            Namaste, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              {session?.user?.name?.split(" ")[0]}!
            </span>
          </h1>
        </div>
        <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
          <button
            className="btn btn-primary px-8 py-3 text-[9px]"
            onClick={() => router.push("/planner")}
          >
            New AI Journey
          </button>
          <button
            className="btn btn-glass px-8 py-3 text-[9px]"
            onClick={() => router.push("/shop")}
          >
            Artisan Shop
          </button>
        </div>
      </div>

      {/* Analytics Dashboard - Compacted Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 animate-slide-up">
        {[{
          label: "Carbon Neutralized",
          val: `${ecoStats.footprintSaved} kg`,
          icon: <FaLeaf />,
          bg: "bg-emerald-500",
          shadow: "shadow-emerald-500/10"
        }, {
          label: "Eco-Journeys",
          val: ecoStats.tripsCompleted,
          icon: <FaSuitcaseRolling />,
          bg: "bg-blue-500",
          shadow: "shadow-blue-500/10"
        }, {
          label: "Artisan Support",
          val: ecoStats.itemsPurchased,
          icon: <FaShoppingBag />,
          bg: "bg-amber-500",
          shadow: "shadow-amber-500/10"
        }, {
          label: "Artisans Impacted",
          val: `+${ecoStats.artisanImpact}`,
          icon: <FaHandsHelping />,
          bg: "bg-teal-500",
          shadow: "shadow-teal-500/10"
        }].map((item, idx) => (
          <div key={idx} className="glass-panel p-6 border-white/5 relative overflow-hidden group grid-card-container">
            <div className={`p-2 w-fit ${item.bg} rounded-xl text-white inline-block mb-4 shadow-lg ${item.shadow} relative z-10 text-xs shrink-0`}>
              {item.icon}
            </div>
            <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1 relative z-10">{item.label}</p>
            <p className="text-2xl font-black text-white tracking-tighter relative z-10 mt-auto">{item.val}</p>
          </div>
        ))}
      </div>

      {/* Activity Sections - Higher Density */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 animate-slide-up delay-1">
        <div className="xl:col-span-2">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-emerald-500"></span> Active Itineraries
          </h2>
          <div className="space-y-3">
            {userData.itineraries.length > 0 ? (
              userData.itineraries.map((trip) => (
                <div
                  key={trip.id}
                  className="glass-panel p-5 flex flex-col md:flex-row justify-between items-center group hover:bg-white/[0.02] transition-all border-white/5"
                >
                  <div className="space-y-2 text-center md:text-left mb-4 md:mb-0">
                    <div className="text-emerald-500 text-[8px] font-black uppercase tracking-widest">
                      {new Date(trip.createdAt).toDateString()}
                    </div>
                    <h3 className="font-black text-white text-xl group-hover:text-emerald-400 transition-colors tracking-tighter uppercase">
                      {trip.destination}
                    </h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      <div className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        {trip.duration} Days
                      </div>
                      <div className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        {trip.travelStyle}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
                    <div className="bg-emerald-500/5 text-emerald-400 px-3 py-1.5 rounded-lg text-[8px] font-black tracking-widest uppercase flex items-center border border-emerald-500/10">
                      <FaLeaf className="mr-1.5" /> {trip.carbonFootprint}KG Offsets
                    </div>
                    <button className="text-white hover:text-emerald-400 text-[8px] font-black transition-all flex items-center group/btn uppercase tracking-widest mt-auto">
                      View Details <FaArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-panel p-16 text-center border-dashed border-white/5 opacity-30">
                <p className="text-slate-500 font-black text-[9px] uppercase tracking-widest">
                  No journeys initiated.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-amber-500"></span> Recent Orders
          </h2>
          <div className="space-y-3">
            {userData.purchases.length > 0 ? (
              userData.purchases.map((p) => (
                <div
                  key={p.id}
                  className="glass-panel p-4 flex items-center gap-4 border-white/5 group bg-white/0 hover:bg-white/[0.02]"
                >
                  <div className="w-14 h-14 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-white/10 relative">
                    <Image
                      src={p.product.image}
                      fill
                      sizes="56px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-white text-sm uppercase tracking-tighter mb-0.5 truncate">
                      {p.product.name}
                    </h3>
                    <div className="flex items-center gap-1.5 opacity-60">
                      <FaCheckCircle className="text-emerald-500 text-[8px]" />
                      <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest">
                        Verified
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-black text-base text-white block">
                      ₹{p.product.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-panel p-16 text-center border-dashed border-white/5 opacity-30">
                <p className="text-slate-500 font-black text-[9px] uppercase tracking-widest">
                  Marketplace is empty.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
