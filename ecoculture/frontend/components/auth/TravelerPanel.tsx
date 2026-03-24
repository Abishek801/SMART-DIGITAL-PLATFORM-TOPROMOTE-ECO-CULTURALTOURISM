"use client";

import { motion } from "framer-motion";
import { Leaf, MapPin, Wind, ArrowRight } from "lucide-react";
import LeafParticles from "./LeafParticles";
import { AntigravityCard } from "../ui/AntigravityCard";

export default function TravelerPanel() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="relative w-full h-full flex flex-col justify-between p-12 overflow-hidden"
    >
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[10s] scale-110 hover:scale-100"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A140C]/90 via-[#1C3829]/75 to-[#0A140C]/90 z-[1]" />
      
      {/* Particles & Orbs */}
      <LeafParticles />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-t-deep/40 blur-[100px] rounded-full animate-pulse z-[2]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-t-primary/20 blur-[80px] rounded-full z-[2]" />

      {/* Top Branding */}
      <motion.div variants={item} className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-t-primary flex items-center justify-center shadow-lg shadow-t-primary/20">
          <Leaf size={20} className="text-white" />
        </div>
        <span className="font-display text-2xl font-bold text-white tracking-tight">EcoCulture</span>
      </motion.div>

      {/* Bottom Content */}
      <div className="relative z-10 space-y-8 max-w-xl">
        <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-t-glow border border-t-border text-t-light text-[10px] font-mono font-bold uppercase tracking-widest">
           🌿 Eco-Certified Platform
        </motion.div>

        <div className="space-y-1">
          <motion.h2 variants={item} className="font-display text-6xl leading-[0.9] text-white font-light">
            Travel <br />
            <span className="font-bold">Conscious.</span> <br />
            Leave a <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1.5px var(--t-primary)" }}>Legacy.</span>
          </motion.h2>
        </div>

        <motion.p variants={item} className="text-t-light font-body text-base max-w-md leading-relaxed opacity-80">
          Join 12,000+ travelers in preserving heritage while exploring the world's most fragile ecosystems.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-4 pt-4">
          <StatPill icon={<MapPin size={14} />} label="240+ Destinations" delay={0} />
          <StatPill icon={<Leaf size={14} />} label="98% Eco-Rated" delay={0.2} />
          <StatPill icon={<Wind size={14} />} label="Carbon Tracked" delay={0.4} />
        </motion.div>

        <motion.div variants={item} className="pt-12 flex items-center gap-6 opacity-40">
           <span className="text-[9px] font-mono uppercase tracking-widest">Featured in</span>
           <div className="flex gap-4 grayscale brightness-200 text-[11px] font-display">
              <span>National Geographic</span>
              <span>•</span>
              <span>Down To Earth</span>
              <span>•</span>
              <span>Outlook Traveller</span>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function StatPill({ icon, label, delay }: { icon: any; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8 + delay, type: "spring", stiffness: 200 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-white/90 text-sm font-medium shadow-xl"
    >
      <span className="text-t-primary">{icon}</span>
      {label}
    </motion.div>
  );
}
