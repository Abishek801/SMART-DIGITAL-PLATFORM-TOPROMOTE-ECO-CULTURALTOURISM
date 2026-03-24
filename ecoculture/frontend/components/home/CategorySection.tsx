"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AntigravityCard } from "@/components/ui/AntigravityCard";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { getDestinationImage } from "@/lib/images";

const CATEGORIES = [
  { id: "eco-village", label: "ECO VILLAGE", count: 42, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800", col: "lg:col-span-2", row: "lg:row-span-2", height: "h-[400px]" },
  { id: "trekking", label: "TREKKING", count: 86, image: "https://images.unsplash.com/photo-1585136917228-81abf21d3ad5?w=600", col: "lg:col-span-1", row: "lg:row-span-1", height: "h-[280px]" },
  { id: "culture", label: "CULTURE", count: 124, image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=600", col: "lg:col-span-1", row: "lg:row-span-1", height: "h-[280px]" },
  { id: "wildlife", label: "WILDLIFE", count: 53, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800", col: "lg:col-span-2", row: "lg:row-span-1", height: "h-[200px]" },
  { id: "nature", label: "NATURE", count: 91, image: "https://images.unsplash.com/photo-1606761012351-d9a5b3a884bf?w=600", col: "lg:col-span-1", row: "lg:row-span-1", height: "h-[200px]" },
];

export default function CategorySection() {
  return (
    <section className="w-full py-2xl px-4 md:px-xl mx-auto max-w-[1440px]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <h2 className="font-display text-fluid-section font-light text-white tracking-tightest leading-tight">
            Where Will You <br className="hidden md:block"/>
            <span className="italic text-clay">Disappear?</span>
          </h2>
        </div>
        <p className="text-stone-400 font-body max-w-sm text-sm lg:text-base mt-4 md:mt-0">
          Curated explorations designed to separate you from the noise and reconnect you with the wild.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-sm">
        {CATEGORIES.map((cat, i) => (
          <div key={cat.id} className={`${cat.col} ${cat.row} w-full`}>
            <AntigravityCard mode="tilt" maxRotation={8} perspective={800} className="w-full h-full">
              <Link href={`/destinations?category=${cat.id}`} className={`block relative w-full rounded-card overflow-hidden group border border-white/5 shadow-surface ${cat.height} w-full`}>
                
                {/* Background Image Ken Burns */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/25 transition-colors duration-700 z-10" />
                  <SmartImage 
                    src={getDestinationImage(cat.id)} 
                    alt={cat.label}
                    aspectRatio="square"
                    hoverZoom={true}
                    className="w-full h-full"
                  />
                </div>

                {/* Top Metas */}
                <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-start z-20">
                  <span className="px-3 py-1 bg-ink-soft/40 backdrop-blur-md rounded-pill border border-white/10 font-mono text-[10px] tracking-widest text-white">
                    {cat.label}
                  </span>
                  <span className="px-2 py-1 bg-white/10 backdrop-blur-md rounded border border-white/10 font-mono text-[10px] text-white/70">
                    {cat.count}
                  </span>
                </div>

                {/* Bottom Detail reveal */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-20 bg-gradient-to-t from-ink/90 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <p className="font-heading text-white text-lg font-medium">Explore {cat.label.toLowerCase()}</p>
                    <div className="w-8 h-8 rounded-full bg-leaf/20 text-leaf flex items-center justify-center">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>

              </Link>
            </AntigravityCard>
          </div>
        ))}
      </div>
    </section>
  );
}
