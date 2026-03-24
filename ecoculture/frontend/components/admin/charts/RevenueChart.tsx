"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const data = [
  { name: "01 Mar", revenue: 42000, bookings: 24 },
  { name: "05 Mar", revenue: 58000, bookings: 32 },
  { name: "10 Mar", revenue: 45000, bookings: 28 },
  { name: "15 Mar", revenue: 82000, bookings: 45 },
  { name: "20 Mar", revenue: 95000, bookings: 52 },
  { name: "25 Mar", revenue: 64000, bookings: 38 },
  { name: "30 Mar", revenue: 110000, bookings: 64 },
];

export default function RevenueChart() {
  return (
    <div className="w-full h-[320px] bg-[#111113] border border-[#27272A] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-white">Revenue Overview</h3>
        <div className="flex bg-[#18181B] rounded-lg p-1">
          {["Daily", "Weekly", "Monthly"].map((t) => (
            <button key={t} className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${t === "Monthly" ? "bg-[#D4A843] text-[#09090B]" : "text-stone-500 hover:text-white"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4A843" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#D4A843" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorBook" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272A" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#71717A", fontSize: 10 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#71717A", fontSize: 10 }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "#18181B", borderRadius: "12px", border: "1px solid #3F3F46", fontSize: "12px" }}
            itemStyle={{ color: "#FAFAFA" }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#D4A843" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorRev)" 
          />
          <Area 
            type="monotone" 
            dataKey="bookings" 
            stroke="#3B82F6" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorBook)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
