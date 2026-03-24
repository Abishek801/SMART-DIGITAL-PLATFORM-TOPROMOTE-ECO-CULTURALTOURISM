"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { AntigravityCard } from "@/components/ui/AntigravityCard";
import SmartImage from "@/components/ui/SmartImage";
import { getProductImage } from "@/lib/images";

const PREVIEW_PRODUCTS = [
  { id: 1, name: "Handwoven Naga Shawl", artisan: "Acho Weavers", origin: "Nagaland", price: "4,200", image: "https://images.unsplash.com/photo-1605814589254-05e8eb46824a?w=400", rot: "-4deg" },
  { id: 2, name: "Terracotta Planter", artisan: "Earth & Fire", origin: "Rajasthan", price: "1,850", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400", rot: "2deg" },
  { id: 3, name: "Bamboo Matcha Set", artisan: "Zenith Woods", origin: "Kyoto", price: "5,400", image: "https://images.unsplash.com/photo-1596484552834-6a58f85f3de7?w=400", rot: "-1deg" },
];

export default function ShopPreviewSection() {
  return (
    <section className="w-full py-32 px-4 border-t border-white/5 bg-ink">
      <div className="max-w-[1440px] px-4 md:px-xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left Side: Cards scattered on table */}
        <div className="w-full md:w-1/2 relative h-[500px]">
          {PREVIEW_PRODUCTS.map((prod, i) => (
            <div 
              key={prod.id} 
              className="absolute w-[240px] md:w-[280px]"
              style={{
                top: `${i * 15}%`,
                left: `${i * 20}%`,
                zIndex: i,
              }}
            >
              <AntigravityCard mode="tilt">
                <div 
                  className="glass p-4 rounded-xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:z-50"
                  style={{ transform: `rotate(${prod.rot})` }}
                >
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <SmartImage 
                    src={getProductImage(prod.name.toLowerCase().replace(/\s+/g, '-'))} 
                    alt={prod.name}
                    aspectRatio="square"
                    hoverZoom={true}
                  />
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-ink/50 backdrop-blur flex items-center justify-center text-white z-20">
                    <ShoppingBag size={14} />
                  </div>
                </div>
                <h4 className="font-display font-bold text-white text-lg mb-1">{prod.name}</h4>
                <div className="flex items-center justify-between">
                  <p className="font-body text-xs text-stone-400">By {prod.artisan}</p>
                  <p className="font-mono text-leaf font-bold tracking-wider">₹{prod.price}</p>
                </div>
              </div>
              </AntigravityCard>
            </div>
          ))}
        </div>

        {/* Right Side: Text */}
        <div className="w-full md:w-1/2 pl-0 md:pl-20">
          <h2 className="font-display text-fluid-section font-light text-white tracking-tightest leading-tight mb-8">
            Carry the <br/>
            <span className="italic text-clay">Culture Home</span>
          </h2>
          <p className="font-body text-stone-400 text-lg leading-relaxed mb-10">
            Every destination holds a story told through the hands of its people. 
            Our Eco Shop grants you direct access to authentic, sustainably sourced 
            artisan goods. 100% of profits go directly to the creators.
          </p>
          <Link href="/shop" className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full text-white font-body font-medium hover:bg-white hover:text-ink transition-colors">
            Enter the Bazaar <ArrowUpRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
