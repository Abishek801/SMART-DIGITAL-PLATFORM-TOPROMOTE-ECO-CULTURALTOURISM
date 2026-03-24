"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Leaf, Star, ShoppingCart, Search, Award } from "lucide-react";
import toast from "react-hot-toast";
import { PRODUCTS, Product } from "@/lib/data/products";
import { useCartStore } from "@/lib/store/useCartStore";
import { AntigravityCard } from "@/components/ui/AntigravityCard";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { getProductImage } from "@/lib/images";

const CATEGORIES = ["All", "HOME_DECOR", "FOOD", "CLOTHING", "WELLNESS", "ACCESSORIES"];
const CAT_LABELS: Record<string, string> = {
  All: "All Products",
  HOME_DECOR: "Home & Decor",
  FOOD: "Food & Drink",
  CLOTHING: "Clothing",
  WELLNESS: "Wellness",
  ACCESSORIES: "Accessories",
};

export default function ShopPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { items, addItem, setCartOpen } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.origin.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddToCart = (product: Product) => {
    addItem(product);
    setCartOpen(true);
    toast.success(`${product.name} added to cart!`);
  };

  const getRandomHeight = (index: number) => {
    // Generate heights that look masonry
    const heights = ["h-64", "h-80", "h-96", "h-[22rem]"];
    return heights[index % heights.length];
  };

  return (
    <div className="min-h-screen bg-ink pt-24 pb-32">
      
      {/* Editorial Header */}
      <div className="w-full max-w-[1440px] px-4 md:px-xl mx-auto mb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-clay/30 bg-clay/5 text-clay text-xs tracking-widest font-mono uppercase">
          <ShoppingBag size={14} /> Artisan Marketplace
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-fluid-hero font-light leading-none tracking-tightest text-white mb-6">
          Carry the <span className="italic text-clay">Culture</span> Home
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-stone-400 font-body text-lg max-w-2xl mx-auto">
          Every purchase directly supports local artisans, funds regenerative agriculture, and preserves indigenous crafting techniques.
        </motion.p>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-40 bg-ink/80 backdrop-blur-xl border-y border-white/5 mb-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-xl py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-pill text-xs font-mono tracking-widest uppercase transition-all ${category === cat ? "bg-white text-ink font-bold shadow-md" : "text-stone-400 border border-white/5 hover:bg-white/5 hover:text-white"}`}>
                {CAT_LABELS[cat]}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search artisans..." className="w-full bg-ink-soft border border-white/10 rounded-pill py-2.5 pl-10 pr-4 text-sm font-body text-white focus:outline-none focus:border-clay transition-colors" />
            </div>
            
            <Link href="/checkout" className="flex items-center gap-2 bg-clay text-ink rounded-pill px-5 py-2.5 cursor-pointer hover:bg-clay/90 transition-colors shrink-0 font-heading font-semibold shadow-[0_0_20px_rgba(196,132,90,0.2)]">
              <ShoppingCart size={16} />
              <span className="text-sm">{mounted ? items.reduce((acc, i) => acc + i.qty, 0) : 0} items</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-xl">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          <AnimatePresence>
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: (i % 8) * 0.05 }}
                className="break-inside-avoid"
              >
                <div className="mb-6 block h-full">
                  <AntigravityCard mode="tilt" maxRotation={6} perspective={1000} className="h-full block">
                    <div className="card group relative flex flex-col bg-ink-soft border border-white/5 rounded-card overflow-hidden shadow-surface cursor-pointer">
                      
                      {/* Image Frame with Masonry Heights */}
                      <div className={`relative overflow-hidden w-full ${getRandomHeight(i)}`}>
                        <SmartImage
                          src={getProductImage(product.id.toString())}
                          alt={product.name}
                          aspectRatio="square"
                          hoverZoom={true}
                          className="w-full h-full"
                        />
                        <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md rounded px-2.5 py-1 text-leaf border border-white/10">
                            <Leaf size={10} />
                            <span className="text-[10px] font-mono tracking-wider font-bold">{product.ecoScore}</span>
                          </div>
                          {product.featured && (
                            <div className="flex items-center gap-1 bg-clay/20 backdrop-blur-md rounded px-2.5 py-1 text-clay border border-clay/20">
                              <Award size={10} />
                              <span className="text-[10px] font-mono tracking-wider font-bold uppercase">Featured</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 md:p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-display text-xl font-medium text-white group-hover:text-clay transition-colors leading-tight">
                            {product.name}
                          </h3>
                        </div>

                        <p className="text-stone-400 text-xs font-mono uppercase tracking-widest mb-4">
                          {product.artisan} · {product.origin}
                        </p>

                        {/* Certifications Map */}
                        <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                          {product.certifications.slice(0, 2).map((cert) => (
                            <span key={cert} className="text-[9px] px-2 py-0.5 rounded border border-white/10 text-stone-300 font-mono uppercase tracking-wider">
                              {cert}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-end justify-between border-t border-white/5 pt-4">
                          <div className="flex flex-col">
                            <span className="text-stone-500 text-[10px] font-mono tracking-widest uppercase mb-1">Exchange</span>
                            <span className="font-heading text-xl font-semibold text-white">₹{product.price.toLocaleString()}</span>
                          </div>
                          <button
                            onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-clay hover:text-ink hover:scale-110 transition-all z-10 shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10"
                          >
                            <ShoppingCart size={16} />
                          </button>
                        </div>
                      </div>

                    </div>
                  </AntigravityCard>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
