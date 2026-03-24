"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { AntigravityCard } from "@/components/ui/AntigravityCard";
import SmartImage from "@/components/ui/SmartImage";
import { getDestinationImage } from "@/lib/images";

export default function AiTeaserSection() {
  return (
    <section className="relative w-full min-h-[800px] flex items-center justify-center overflow-hidden py-32 px-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <SmartImage 
          src={getDestinationImage("dark-forest-teaser")} 
          alt="Dense dark forest" 
          aspectRatio="wide"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-ink/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center">
        
        {/* Floating Chat Interface */}
        <AntigravityCard mode="float" strength={0.5} className="w-full max-w-2xl mb-16">
          <div className="glass backdrop-blur-3xl rounded-panel border border-white/10 shadow-surface overflow-hidden p-6 md:p-10">
            
            <div className="space-y-6">
              {/* User Bubble */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                className="ml-auto w-[85%] bg-white/10 border border-white/5 rounded-2xl rounded-tr-none p-5 text-white font-body text-sm md:text-base shadow-lg"
              >
                "I want an eco trip to the mountains in June under ₹50k, prioritizing zero-carbon stays and local culture."
              </motion.div>

              {/* AI Bubble */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ delay: 0.8 }}
                className="mr-auto w-[90%] glass border border-leaf/30 rounded-2xl rounded-tl-none p-5 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-leaf text-ink font-bold font-mono text-xs">AI</div>
                  <p className="font-heading text-white">Eco-Concierge</p>
                </div>
                
                <p className="text-stone-300 font-body text-sm mb-4">
                  I've mapped the perfect 7-day sustainable itinerary to Spiti Valley, staying entirely in solar-powered homestays. Your total projected impact is -42kg CO₂.
                </p>

                {/* Simulated Itinerary Card */}
                <div className="bg-ink rounded-lg p-4 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/5 rounded pl-1">
                      <span className="block text-center text-[10px] uppercase font-mono text-stone-500 mt-1">JUN</span>
                      <span className="block text-center text-white font-bold">14</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Spiti Solar Village Tour</p>
                      <p className="text-leaf text-xs font-mono">₹48,500 Total</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white text-white hover:text-ink transition-colors">
                    <MoveRight size={14} />
                  </button>
                </div>

              </motion.div>
            </div>

          </div>
        </AntigravityCard>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px" }}
          className="text-center"
        >
          <Link href="/planner" className="h-[64px] px-10 rounded-pill bg-white text-ink font-heading font-semibold text-lg flex items-center justify-center gap-3 hover:scale-[0.98] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all">
            Plan Your Trip With AI
            <MoveRight size={20} />
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
