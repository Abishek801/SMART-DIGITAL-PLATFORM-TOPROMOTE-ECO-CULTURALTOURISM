"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Package, Calendar, UserPlus, CreditCard, Star } from "lucide-react";

const activities = [
  { id: 1, type: "booking", text: "Priya Sharma booked Munnar Eco Village", time: "2 min ago", icon: Calendar, color: "#3B82F6" },
  { id: 2, type: "order", text: "New order #ORD-4421 from Kochi", time: "12 min ago", icon: Package, color: "#C4845A" },
  { id: 3, type: "user", text: "Rahul Das joined as a Traveler", time: "45 min ago", icon: UserPlus, color: "#22C55E" },
  { id: 4, type: "payment", text: "₹45,000 payout processed for Munnar Village", time: "1 hour ago", icon: CreditCard, color: "#D4A843" },
  { id: 5, type: "review", text: "5★ review received for Ziro Valley Trek", time: "3 hours ago", icon: Star, color: "#EAB308" },
  { id: 6, type: "booking", text: "David Miller booked Coorg Estate Stay", time: "5 hours ago", icon: Calendar, color: "#3B82F6" },
  { id: 7, type: "order", text: "New order #ORD-4420 from Bangalore", time: "6 hours ago", icon: Package, color: "#C4845A" },
];

export default function ActivityFeed() {
  return (
    <div className="bg-[#111113] border border-[#27272A] rounded-xl p-5 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-white">Live Activity</h3>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-mono text-stone-600 uppercase tracking-widest font-bold">Real-time</span>
        </div>
      </div>

      <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-[#27272A]">
        {activities.map((act) => (
          <div key={act.id} className="flex gap-4 relative">
            <div 
              className="w-8 h-8 rounded-full border border-[#27272A] flex items-center justify-center bg-[#111113] z-10 shrink-0"
              style={{ color: act.color, boxShadow: `0 0 10px ${act.color}11` }}
            >
              <act.icon size={14} />
            </div>
            <div className="flex-1 pb-2 border-b border-[#1F1F23] last:border-0 border-dashed">
              <p className="text-xs text-stone-200 leading-tight mb-1">{act.text}</p>
              <span className="text-[10px] font-mono text-stone-600 italic">{act.time}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-2 text-[11px] font-bold text-stone-500 hover:text-white border border-[#27272A] rounded-lg hover:bg-[#18181B] transition-all uppercase tracking-widest">
        Full Audit Log
      </button>
    </div>
  );
}
