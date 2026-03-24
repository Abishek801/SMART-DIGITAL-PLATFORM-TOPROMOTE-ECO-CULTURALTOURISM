"use client";

import { motion } from "framer-motion";

export default function TickerSection() {
  const content = "🌱 4.2T CO₂ Offset   ·   240+ Destinations   ·   12,847 Travelers   ·   ₹2.4Cr to Local Communities   ·   6 UNESCO Sites   ·   98% Satisfaction   ·   ";
  
  return (
    <section className="w-full h-[80px] bg-ink-soft border-y border-white/5 flex items-center overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />
      
      <div className="flex whitespace-nowrap min-w-max">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap"
        >
          <p className="text-white/80 font-mono text-xs sm:text-sm tracking-widest uppercase flex items-center">
            {content.repeat(4)}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
