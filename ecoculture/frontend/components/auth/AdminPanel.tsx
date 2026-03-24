"use client";

import { motion } from "framer-motion";
import { Shield, Users, BarChart3, Zap, ArrowRight } from "lucide-react";
import GeometricParticles from "./GeometricParticles";
import ScanningLine from "./ScanningLine";

export default function AdminPanel() {
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
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="relative w-full h-full flex flex-col justify-between p-12 overflow-hidden bg-[#0A0806]"
    >
      {/* Geometric Background & Scanning Effects */}
      <GeometricParticles />
      <ScanningLine />
      
      {/* Background Gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] bg-a-deep/30 blur-[120px] rounded-full z-0" />
      <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-a-mid/10 blur-[100px] rounded-full z-0" />
      
      {/* Grid Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
           style={{ backgroundImage: "linear-gradient(var(--a-primary) 1px, transparent 1px), linear-gradient(90deg, var(--a-primary) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Top Branding */}
      <motion.div variants={item} className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-a-primary flex items-center justify-center shadow-lg shadow-a-primary/20">
          <Shield size={20} className="text-ink font-bold" />
        </div>
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl font-bold text-white tracking-tight">EcoCulture</span>
          <span className="px-2 py-0.5 rounded-md bg-a-primary/10 border border-a-primary/30 text-a-primary font-mono text-[9px] font-bold tracking-widest mt-1">ADMIN</span>
        </div>
      </motion.div>

      {/* Bottom Content */}
      <div className="relative z-10 space-y-8 max-w-xl">
        <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-a-glow border border-a-border text-a-light text-[10px] font-mono font-bold uppercase tracking-widest">
           🛡 ADMIN PORTAL · RESTRICTED ACCESS
        </motion.div>

        <div className="space-y-1">
          <motion.h2 variants={item} className="font-display text-6xl leading-[0.9] text-white font-light">
            Command <br />
            <span className="font-bold">Center.</span> <br />
            Full <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1.5px var(--a-primary)" }}>Control.</span>
          </motion.h2>
        </div>

        <motion.p variants={item} className="text-a-light font-body text-base max-w-md leading-relaxed opacity-80">
          Real-time oversight of destination conservation, traveler impact, and global artisan commerce.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-4 pt-4">
          <AdminStat icon={<Users size={14} />} label="1,284 Active Users" />
          <AdminStat icon={<BarChart3 size={14} />} label="₹4.8L Revenue" />
          <AdminStat icon={<Zap size={14} />} label="23 Pending Actions" hasAlert />
        </motion.div>

        <motion.div variants={item} className="pt-12 flex items-center gap-6 opacity-30 text-a-light">
           <span className="text-[9px] font-mono uppercase tracking-widest">Infrastructure secured by</span>
           <div className="flex gap-4 text-[11px] font-mono">
              <span>256-BIT SSL</span>
              <span>•</span>
              <span>JWT AUTH</span>
              <span>•</span>
              <span>OTP VERIFIED</span>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function AdminStat({ icon, label, hasAlert }: { icon: any; label: string; hasAlert?: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-white/90 text-sm font-medium relative overflow-hidden"
    >
      <span className="text-a-primary">{icon}</span>
      {label}
      {hasAlert && (
        <span className="absolute top-1 right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      )}
    </motion.div>
  );
}
