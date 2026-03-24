"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Leaf, TrendingDown, ArrowUpRight } from "lucide-react";
import { AntigravityCard } from "@/components/ui/AntigravityCard";
import SmartImage from "@/components/ui/SmartImage";
import { getDestinationImage } from "@/lib/images";

const CATEGORY_COLORS: Record<string, string> = {
  ECO_VILLAGE: "bg-leaf/20 text-leaf border-leaf/30",
  CULTURE: "bg-clay/20 text-clay border-clay/30",
  TREKKING: "bg-sage/20 text-sage border-sage/30",
  NATURE: "bg-canopy/20 text-canopy border-canopy/30",
  WILDLIFE: "bg-gold/20 text-gold border-gold/30",
  HERITAGE: "bg-stone-500/20 text-stone-300 border-stone-500/30",
};

const CATEGORY_LABELS: Record<string, string> = {
  ECO_VILLAGE: "Eco Village",
  CULTURE: "Culture",
  TREKKING: "Trekking",
  NATURE: "Nature",
  WILDLIFE: "Wildlife",
  HERITAGE: "Heritage",
};

interface Destination {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  category: string;
  country: string;
  region: string;
  sustainabilityScore: number;
  carbonSaved: number;
  imageUrl: string;
  avgCost: number;
  difficulty: string;
  bestSeason: string;
}

export default function DestinationCard({ 
  destination: d, 
  index,
  variant = "standard"
}: { 
  destination: Destination; 
  index: number;
  variant?: "hero" | "large" | "standard"
}) {
  
  const imageHeight = {
    hero: "h-[400px] md:h-[500px]",
    large: "h-[300px] md:h-[350px]",
    standard: "h-[220px]"
  }[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 6) * 0.1, duration: 0.7, ease: "easeOut" }}
      className="h-full w-full"
    >
      <AntigravityCard mode="tilt" maxRotation={4} perspective={1200} className="h-full block w-full">
        <Link href={`/destinations/${d.slug}`} className="card group block h-full relative overflow-hidden bg-ink-soft border border-white/5 rounded-card shadow-surface flex flex-col w-full">
          
          {/* Image Block */}
          <div className={`relative w-full overflow-hidden ${imageHeight}`}>
            <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <SmartImage
              src={getDestinationImage(d.slug)}
              fallbackSrc={`https://picsum.photos/seed/${d.slug}-fallback/800/600`}
              alt={d.name}
              category={CATEGORY_LABELS[d.category]}
              aspectRatio="wide"
              hoverZoom={true}
              className="absolute inset-0 w-full h-full"
            />
            {/* Gradient overlay for text legibility at bottom of hero images */}
            {variant === "hero" && <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent z-10 pointer-events-none" />}

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className={`px-2 py-1 rounded backdrop-blur-md border border-white/10 font-mono text-[10px] tracking-widest uppercase ${CATEGORY_COLORS[d.category] || "text-white"}`}>
                {CATEGORY_LABELS[d.category] || d.category}
              </div>
            </div>

            <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass flex items-center justify-center backdrop-blur-md border border-white/10">
              <svg viewBox="0 0 36 36" className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="#7BAE8A" strokeWidth="2" strokeDasharray="100" strokeDashoffset={100 - d.sustainabilityScore} className="transition-all duration-1000 delay-300" />
              </svg>
              <span className="font-mono text-[10px] font-bold text-white">{d.sustainabilityScore}</span>
            </div>
          </div>

          {/* Content Block */}
          <div className={`p-6 md:p-8 flex flex-col flex-1 ${variant === "hero" ? "md:absolute bottom-0 inset-x-0 z-20 bg-transparent" : ""}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className={`font-display font-medium text-white transition-colors group-hover:text-leaf ${variant === "hero" ? "text-3xl md:text-5xl drop-shadow-lg" : "text-xl md:text-2xl"}`}>
                {d.name}
              </h3>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 group-hover:bg-leaf group-hover:text-ink shrink-0 box-shadow-xl">
                <ArrowUpRight size={16} />
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-stone-400 text-xs md:text-sm font-body mb-4">
              <MapPin size={12} className={variant === "hero" ? "text-white/70" : "text-leaf"} />
              <span className={variant === "hero" ? "text-white/80 drop-shadow-md" : "text-stone-400"}>{d.region}, {d.country}</span>
            </div>

            {variant !== "hero" && (
              <p className="text-stone-400 font-body text-sm leading-relaxed mb-6 line-clamp-2">
                {d.shortDescription}
              </p>
            )}

            <div className={`mt-auto pt-4 border-t flex justify-between items-end ${variant === "hero" ? "border-white/20" : "border-white/10"}`}>
              <div className="flex items-center gap-3">
                 <span className={`font-mono text-[10px] tracking-widest uppercase ${d.difficulty === 'HARD' || d.difficulty === 'EXPERT' ? 'text-clay' : 'text-sage'} ${variant === "hero" ? "drop-shadow" : ""}`}>
                   {d.difficulty}
                 </span>
                 <span className="text-white/20">|</span>
                 <span className={`flex items-center gap-1 text-[10px] font-mono tracking-widest uppercase text-gold ${variant === "hero" ? "drop-shadow" : ""}`}>
                   <TrendingDown size={10} /> {d.carbonSaved}T CO₂
                 </span>
              </div>
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-widest mr-1 ${variant === "hero" ? "text-white/60 drop-shadow" : "text-stone-500"}`}>From</span>
                <span className={`font-heading font-semibold ${variant === "hero" ? "text-white text-xl drop-shadow-md" : "text-stone-200 text-lg"}`}>₹{(d.avgCost * 85).toLocaleString()}</span>
              </div>
            </div>
          </div>

        </Link>
      </AntigravityCard>
    </motion.div>
  );
}
