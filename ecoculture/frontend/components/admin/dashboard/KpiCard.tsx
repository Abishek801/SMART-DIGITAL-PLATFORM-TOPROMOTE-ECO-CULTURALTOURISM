"use client";

import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: LucideIcon;
  data: any[];
  color: string;
}

export default function KpiCard({ title, value, trend, trendUp, icon: Icon, data, color }: KpiCardProps) {
  return (
    <div className="bg-[#111113] border border-[#27272A] rounded-xl p-5 relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
             <h4 className="text-2xl font-bold font-mono text-white tracking-tight">{value}</h4>
             <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${trendUp ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                {trendUp ? '↑' : '↓'} {trend}
             </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-stone-500 group-hover:text-white transition-colors">
          <Icon size={16} />
        </div>
      </div>

      <div className="h-10 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="pv" 
              stroke={color} 
              strokeWidth={2} 
              dot={false} 
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-[10px] text-stone-600 font-medium">vs. last month</div>
      
      {/* Decorative background glow */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
