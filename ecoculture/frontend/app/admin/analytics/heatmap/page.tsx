"use client";

import { useState } from "react";
import { Flame, TrendingUp, Filter, Tag, Info, Clock } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

export default function ProductHeatmapPage() {
  const [days, setDays] = useState(30);
  const [category, setCategory] = useState("ALL");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const queryParams = new URLSearchParams({
    days: days.toString(),
    ...(category !== "ALL" ? { category } : {})
  });

  const { data: products, isLoading, error } = useSWR(`/api/admin/products/heatmap?${queryParams}`, fetcher);

  // Determine max purchases to set heat ratio (0-1)
  const maxPurchases = products?.length ? Math.max(...products.map((p: any) => p.purchases)) : 100;

  const getHeatColor = (purchases: number) => {
    const ratio = purchases / maxPurchases;
    if (ratio >= 0.8) return "bg-red-500/80 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]";
    if (ratio >= 0.5) return "bg-orange-500/60 border-orange-500/80 text-white";
    if (ratio >= 0.2) return "bg-yellow-500/40 border-yellow-500/50 text-stone-200";
    return "bg-blue-500/20 border-blue-500/30 text-stone-400";
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            <Flame className="text-orange-500" /> Product Heatmap
          </h1>
          <p className="text-stone-500 text-sm font-medium mt-1">Visual performance of shop items based on order volume.</p>
        </div>

        <div className="flex items-center gap-2">
          <select 
            value={days} 
            onChange={(e) => setDays(Number(e.target.value))}
            className="h-9 px-3 rounded-lg bg-[#18181B] border border-[#27272A] text-xs font-bold text-stone-300 focus:outline-none"
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
            <option value={365}>Last Year</option>
          </select>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="h-9 px-3 rounded-lg bg-[#18181B] border border-[#27272A] text-xs font-bold text-stone-300 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="HOME_DECOR">Home Decor</option>
            <option value="FOOD">Food & Beverage</option>
            <option value="CLOTHING">Clothing</option>
            <option value="WELLNESS">Wellness</option>
            <option value="ACCESSORIES">Accessories</option>
          </select>
        </div>
      </div>

      <div className="bg-[#111113] border border-[#27272A] rounded-2xl p-6">
        {/* Heatmap Legend */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#27272A]">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-widest">Performance Grid</h2>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
             <span>Low Activity</span>
             <div className="flex gap-1">
               <div className="w-8 h-3 bg-blue-500/20 rounded-sm"></div>
               <div className="w-8 h-3 bg-yellow-500/40 rounded-sm"></div>
               <div className="w-8 h-3 bg-orange-500/60 rounded-sm"></div>
               <div className="w-8 h-3 bg-red-500/80 rounded-sm"></div>
             </div>
             <span>High Activity</span>
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-64 flex items-center justify-center text-stone-500 gap-2"><Clock className="animate-spin-slow"/> Generating heatmap...</div>
        ) : error ? (
          <div className="w-full h-64 flex items-center justify-center text-red-500">Failed to load analytics.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products?.map((product: any) => (
              <div 
                key={product.productId}
                onMouseEnter={() => setHoveredProduct(product.productId)}
                onMouseLeave={() => setHoveredProduct(null)}
                className={`relative p-4 rounded-xl border transition-all duration-300 cursor-crosshair group ${getHeatColor(product.purchases)} ${hoveredProduct === product.productId ? "scale-105 z-10" : "scale-100 hidden sm:block md:block"}`}
                style={{
                   // Apply display none/block based on category if we handled client-side filtering, but API handles it via 'category' query.
                }}
              >
                <div className="flex items-start justify-between mb-3">
                   <div className="px-2 py-0.5 bg-black/30 rounded text-[9px] font-mono tracking-widest uppercase truncate max-w-[120px]">
                     {product.category}
                   </div>
                   <div className="text-xl font-bold font-display">{product.purchases} <span className="text-xs font-sans font-normal opacity-70">sales</span></div>
                </div>
                <h3 className="font-medium text-sm leading-tight mb-4 drop-shadow-md">{product.productName}</h3>
                
                <div className="flex items-center justify-between text-xs opacity-90">
                   <span className="font-mono">₹{product.revenue.toLocaleString()}</span>
                   <span className="flex items-center gap-1"><TrendingUp size={12}/> {product.views} views</span>
                </div>

                {/* Expanded Tooltip on Hover */}
                {hoveredProduct === product.productId && (
                  <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[110%] bg-[#09090B] border border-[#27272A] p-3 rounded-xl shadow-2xl z-50 text-stone-300 text-xs">
                    <div className="grid grid-cols-2 gap-2 font-mono">
                       <div>Stock: <span className={product.stock < 20 ? "text-red-400 font-bold" : "text-white"}>{product.stock} units</span></div>
                       <div>Rating: <span className="text-yellow-400">{product.rating} ★</span></div>
                       <div className="col-span-2">Conv. Rate: <span className="text-white">{((product.purchases / product.views) * 100).toFixed(1)}%</span></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {products?.length === 0 && (
              <div className="col-span-full h-32 flex items-center justify-center text-stone-500 italic">No activity matching criteria.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
