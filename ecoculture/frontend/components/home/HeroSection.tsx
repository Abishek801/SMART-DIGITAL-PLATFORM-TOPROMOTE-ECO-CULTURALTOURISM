"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { EcoGlobe } from "@/components/ui/EcoGlobe";
import { AntigravityCard } from "@/components/ui/AntigravityCard";
import { transitionStates } from "@/lib/motion";
import { FEATURED_DESTINATIONS } from "@/lib/data/homepage";
import SmartImage from "@/components/ui/SmartImage";
import { getDestinationImage } from "@/lib/images";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* 4K Drone Background Placeholder */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-[0.65] mix-blend-screen"
        >
          <source src="https://cdn.pixabay.com/video/2020/05/11/38600-418701047_medium.mp4" type="video/mp4" />
        </video>
        {/* Dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/60 via-[#1C3829]/30 to-[#0D0D0D]/90" />
      </div>

      <div className="w-full max-w-[1440px] px-4 md:px-xl mx-auto flex flex-col lg:flex-row h-full relative z-10 pt-20">
        
        {/* LEFT 55%: Typography + CTAs */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center h-full pr-0 lg:pr-10">
          <motion.div {...transitionStates.sectionEnter}>
            <h1 className="font-display text-[clamp(56px,8vw,120px)] font-light leading-tight tracking-tightest mb-6">
              Discover Earth's<br/>
              Last <span className="text-stroke-primary italic">Sacred</span><br/>
              <span className="text-leaf font-normal">Destinations</span>
            </h1>

            <div className="flex flex-wrap gap-2 mb-10 items-center">
              <span className="px-3 py-1 rounded-pill bg-white/5 border border-white/10 text-stone-300 font-mono text-xs font-semibold tracking-wider uppercase">
                240 eco-certified
              </span>
              <span className="w-1.5 h-1.5 bg-leaf rounded-full" />
              <span className="px-3 py-1 rounded-pill bg-white/5 border border-white/10 text-stone-300 font-mono text-xs font-semibold tracking-wider uppercase">
                12,000 travelers
              </span>
              <span className="w-1.5 h-1.5 bg-leaf rounded-full" />
              <span className="px-3 py-1 rounded-pill bg-white/5 border border-white/10 text-stone-300 font-mono text-xs font-semibold tracking-wider uppercase">
                4.2 tonnes CO₂ offset
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link href="/destinations" className="h-[56px] px-8 bg-gradient-to-br from-leaf to-canopy text-white font-heading font-semibold tracking-wide flex items-center justify-center group uppercase text-sm shadow-xl shadow-leaf/20 hover:scale-[0.98] transition-all">
                Begin Your Journey 
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/planner" className="relative group text-white font-body py-2">
                Conscious AI Planner
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/40 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* RIGHT 45%: EcoGlobe & Antigravity Cards */}
        <div className="w-full lg:w-[45%] h-[500px] lg:h-full relative flex items-center justify-center mt-12 lg:mt-0">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }} className="w-full h-full absolute inset-0">
            <EcoGlobe />
          </motion.div>

          {/* Floating Orbiting Antigravity Cards */}
          <AntigravityCard mode="magnetic" strength={0.4} className="absolute top-[15%] left-0 xl:-left-[10%] z-20 hidden md:block">
            <div className="glass p-3 rounded-cardSmall w-[200px] rotate-[-8deg] shadow-surface border border-white/10 backdrop-blur-[12px]">
              <div className="relative overflow-hidden rounded-lg mb-3 h-32">
                <SmartImage 
                  src={getDestinationImage("munnar-eco-village")} 
                  alt="Munnar Eco"
                  aspectRatio="landscape"
                />
              </div>
              <p className="text-white font-display text-lg leading-none font-bold truncate mb-1.5">{FEATURED_DESTINATIONS[0]?.name || "Munnar Eco"}</p>
              <div className="flex items-center justify-between">
                <p className="text-stone-400 text-[11px] flex items-center gap-1 font-body">
                  <MapPin size={10} className="text-leaf" /> Kerala
                </p>
                <span className="text-[10px] uppercase font-bold text-leaf font-mono tracking-wider">95 Eco</span>
              </div>
            </div>
          </AntigravityCard>

          <AntigravityCard mode="magnetic" strength={0.5} className="absolute bottom-[25%] -right-4 z-20 hidden md:block">
            <div className="glass p-3 rounded-cardSmall w-[220px] rotate-[5deg] shadow-surface border border-white/10 backdrop-blur-[12px]">
              <div className="relative overflow-hidden rounded-lg mb-3 h-36">
                <SmartImage 
                  src={getDestinationImage("spiti-valley-desert")} 
                  alt="Spiti Valley"
                  aspectRatio="landscape"
                />
              </div>
              <p className="text-white font-display text-lg leading-none font-bold truncate mb-1.5">{FEATURED_DESTINATIONS[1]?.name || "Spiti Valley"}</p>
              <div className="flex items-center justify-between">
                <p className="text-stone-400 text-[11px] flex items-center gap-1 font-body">
                  <MapPin size={10} className="text-leaf" /> Himachal
                </p>
                <span className="text-[10px] uppercase font-bold text-leaf font-mono tracking-wider">88 Eco</span>
              </div>
            </div>
          </AntigravityCard>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-white/40 text-[10px] tracking-[0.2em] font-mono">SCROLL TO EXPLORE</span>
        <div className="w-px h-12 bg-white/10 relative overflow-hidden">
          <motion.div animate={{ y: [-48, 48] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 w-full h-[50%] bg-gradient-to-b from-transparent via-leaf to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
