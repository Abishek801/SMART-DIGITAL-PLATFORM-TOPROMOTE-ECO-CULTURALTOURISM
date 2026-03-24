"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FEATURED_DESTINATIONS } from "@/lib/data/homepage";
import { Leaf, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { getDestinationImage } from "@/lib/images";

export default function FeaturedSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Move the cards horizontally based on scroll progress
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-ink">
      {/* Sticky container that locks during scroll */}
      <div className="sticky top-0 h-screen flex flex-col items-start justify-center overflow-hidden pt-20">
        
        <div className="w-full max-w-[1440px] px-4 md:px-xl mx-auto mb-12">
          <h2 className="font-display text-fluid-section font-light text-white tracking-tightest leading-tight">
            This Season's Most <br className="hidden md:block"/>
            <span className="italic text-mist">Conscious Journeys</span>
          </h2>
        </div>

        {/* Horizontal moving track */}
        <motion.div style={{ x }} className="flex gap-8 px-4 md:px-xl w-max">
          {FEATURED_DESTINATIONS.map((dest, i) => (
            <div key={dest.id} className="relative w-[320px] md:w-[480px] h-[480px] md:h-[600px] rounded-panel overflow-hidden group border border-white/5 shadow-surface flex flex-col">
              
              {/* Photo top 70% */}
              <div className="relative h-[70%] w-full overflow-hidden">
                <SmartImage 
                  src={getDestinationImage(dest.id)} 
                  alt={dest.name}
                  aspectRatio="portrait"
                  hoverZoom={true}
                  className="absolute inset-0 w-full h-full"
                />
                
                {/* Score badge top right */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full glass flex items-center justify-center backdrop-blur-md">
                  <svg viewBox="0 0 36 36" className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#7BAE8A" strokeWidth="2" strokeDasharray="100" strokeDashoffset="12" className="transition-all duration-1000 delay-300" />
                  </svg>
                  <span className="font-mono text-xs font-bold text-white">88</span>
                </div>
                
                {/* Best Season */}
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-ink/60 backdrop-blur-md rounded-pill border border-white/10 text-[10px] font-mono tracking-widest text-white uppercase">
                  Best in Oct-Mar
                </div>
              </div>

              {/* Info bottom 30% */}
              <div className="h-[30%] bg-ink-soft p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-surface pointer-events-none" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl text-white font-medium">{dest.name}</h3>
                    <p className="font-body text-sage text-xs md:text-sm mt-1 uppercase tracking-wide">{dest.region}, India</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-leaf group-hover:text-ink transition-colors">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div className="flex justify-between items-end relative z-10">
                  <div className="flex items-center gap-1.5 text-leaf font-body text-xs md:text-sm">
                    <Leaf size={14} /> <span>142 kg CO₂ saved</span>
                  </div>
                  <p className="font-heading text-gold font-medium text-sm md:text-base">
                    From ₹12,800 <span className="text-white/40 text-xs font-body font-normal">/night</span>
                  </p>
                </div>
              </div>

              {/* Link overlay */}
              <Link href={`/destinations/${dest.id}`} className="absolute inset-0 z-20" aria-label={`View ${dest.name}`} />
            </div>
          ))}

          {/* View All Card */}
          <div className="relative w-[320px] md:w-[480px] h-[480px] md:h-[600px] rounded-panel border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group cursor-pointer">
            <Link href="/destinations" className="absolute inset-0 z-10" />
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border border-white/20 mx-auto flex items-center justify-center mb-4 text-white group-hover:scale-110 group-hover:bg-white group-hover:text-ink transition-all duration-300">
                <ArrowUpRight size={24} />
              </div>
              <p className="font-display text-2xl text-white">View All Projects</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
