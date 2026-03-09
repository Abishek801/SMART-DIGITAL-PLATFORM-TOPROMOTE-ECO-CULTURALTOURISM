"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  FaSearch,
  FaLeaf,
  FaArrowRight,
  FaRobot,
  FaChevronDown,
  FaUsers,
  FaMapMarkedAlt,
} from "react-icons/fa";
import LoginModal from "../components/LoginModal";

export default function Home() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setShowScroll(false);
      else setShowScroll(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredPackages = [
    {
      id: 1,
      title: "Himalayan Eco-Trek",
      location: "Himachal Pradesh",
      price: "₹12,499",
      days: "5 Days",
      img: "https://images.unsplash.com/photo-1522818641158-75e113aa07db?auto=format&fit=crop&q=80&w=1200",
      score: 94,
    },
    {
      id: 2,
      title: "Backwater Retreat",
      location: "Kerala",
      price: "₹15,999",
      days: "4 Days",
      img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200",
      score: 88,
    },
    {
      id: 3,
      title: "Desert Safari",
      location: "Rajasthan",
      price: "₹18,500",
      days: "6 Days",
      img: "https://images.unsplash.com/photo-1599386348126-1070e53a55e1?auto=format&fit=crop&q=80&w=1200",
      score: 91,
    },
  ];

  return (
    <main className="w-full">
      {/* Hero Section - Compacted */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center -mt-16 pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1506461883276-594a12b11ac6?auto=format&fit=crop&q=80&w=2000"
            alt="Eco Travel Hero"
            fill
            priority
            className="object-cover object-center scale-105 animate-float opacity-60"
          />
        </div>

        <div className="relative z-20 container flex flex-col items-center text-center px-4 max-w-4xl">
          <div className="inline-flex items-center py-1 px-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6 animate-slide-up">
            <FaLeaf className="mr-2" /> Sustainable Travel Reimagined
          </div>

          <h1 className="text-5xl md:text-7xl font-black font-heading text-white mb-6 animate-slide-up tracking-tighter leading-none drop-shadow-xl">
            Discover the <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400">
              EcoCulture
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl animate-slide-up delay-1 opacity-80 leading-relaxed font-medium">
            Experience India through a sustainable lens. Our AI crafts personalized journeys that empower local heartlands.
          </p>

          {/* Search Bar - Compacted */}
          <div className="w-full max-w-2xl glass-panel p-1.5 flex flex-col sm:flex-row gap-2 rounded-xl animate-slide-up delay-2 shadow-2xl border-white/5">
            <div className="flex-1 flex items-center px-5">
              <FaSearch className="text-emerald-500 mr-3 text-lg" />
              <input
                type="text"
                placeholder="Where to next?"
                className="w-full bg-transparent border-none outline-none text-white placeholder-slate-500 py-3 font-bold text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn btn-primary py-3 px-8 text-[10px]">
              Explore
            </button>
          </div>
        </div>

        {showScroll && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 animate-bounce flex flex-col items-center text-slate-400 opacity-40">
            <span className="text-[8px] font-black uppercase tracking-widest mb-1">
              Scroll
            </span>
            <FaChevronDown size={12} />
          </div>
        )}
      </section>

      {/* Eco Tourism Benefits - NEW */}
      <section className="py-20 relative overflow-hidden">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Eco-Friendly Travel",
                desc: "Low-impact routes and carbon-neutral stays curated by AI.",
                icon: <FaLeaf />,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10"
              },
              {
                title: "Support Local Communities",
                desc: "Direct-to-artisan marketplace ensuring fair trade and heritage.",
                icon: <FaUsers />,
                color: "text-blue-400",
                bg: "bg-blue-500/10"
              },
              {
                title: "Explore Hidden India",
                desc: "Discover offbeat villages and sacred nature reserves.",
                icon: <FaMapMarkedAlt />,
                color: "text-amber-400",
                bg: "bg-amber-500/10"
              }
            ].map((benefit, i) => (
              <div
                key={i}
                className="glass-panel p-8 border-white/5 flex flex-col items-center text-center group hover:bg-white/[0.03] animate-slide-up"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl ${benefit.bg} flex items-center justify-center ${benefit.color} text-2xl mb-6 shadow-xl`}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tighter">
                  {benefit.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours - Tightened */}
      <section className="py-24 relative">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-4 leading-tight">
                Eco-Ventures
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                Vetted for community impact and biodiversity preservation.
              </p>
            </div>
            <Link
              href="/destinations"
              className="text-emerald-400 hover:text-emerald-300 font-black text-xs uppercase tracking-widest flex items-center group mb-2"
            >
              View All{" "}
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, i) => (
              <Link
                href="/destinations"
                key={pkg.id}
                className="group animate-slide-up h-full"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="glass-panel p-0 overflow-hidden grid-card-container hover:border-emerald-500/30 transition-all duration-500">
                  <div className="h-56 overflow-hidden relative shrink-0">
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-2 py-0.5 rounded-md text-[8px] font-black z-20 shadow-lg">
                      {pkg.score} ECO SCORE
                    </div>
                    <Image
                      src={pkg.img}
                      alt={pkg.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-70"></div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-emerald-500 text-[8px] font-black uppercase tracking-widest mb-1.5">
                      {pkg.location}
                    </div>
                    <h3 className="text-lg font-black text-white mb-2 group-hover:text-emerald-400 transition-colors leading-tight font-heading tracking-tight">
                      {pkg.title}
                    </h3>
                    <p className="text-slate-400 text-[10px] leading-relaxed mb-6 line-clamp-2-eco font-medium opacity-80">
                      Vetted eco-conscious expedition focusing on local biodiversity and heritage.
                    </p>
                    <div className="grid-card-footer border-t border-white/5 flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-slate-500 text-[7px] font-black uppercase tracking-widest">
                          From
                        </span>
                        <span className="text-white font-black text-base">
                          {pkg.price}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all">
                        <FaArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI CTA - Compact */}
      <section className="py-24 relative bg-slate-900/50">
        <div className="container px-4">
          <div className="glass-panel p-12 md:p-16 border-emerald-500/10 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="max-w-xl relative z-10 text-center lg:text-left">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 text-3xl mb-8 shadow-xl shadow-emerald-500/5 mx-auto lg:mx-0">
                <FaRobot className="animate-float" />
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-6 leading-tight">
                Personalized Eco-Travel
              </h2>
              <p className="text-slate-400 text-base leading-relaxed font-medium">
                Craft a carbon-conscious itinerary in seconds. Our AI maps sustainable homestays and low-impact routes.
              </p>
            </div>
            <Link
              href="/planner"
              className="btn btn-primary px-12 py-4 text-[10px] font-black shadow-lg relative z-10"
            >
              Try AI Planner
            </Link>
          </div>
        </div>
      </section>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </main>
  );
}
