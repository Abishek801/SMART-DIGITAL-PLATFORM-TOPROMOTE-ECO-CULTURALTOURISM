"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Eco Village", value: 35, color: "#D4A843" },
  { name: "Trekking", value: 25, color: "#4A8B5C" },
  { name: "Culture", value: 20, color: "#C4845A" },
  { name: "Wildlife", value: 15, color: "#3B82F6" },
  { name: "Nature", value: 5, color: "#8B5E3C" },
];

export default function CategoryPieChart() {
  return (
    <div className="w-full h-[320px] bg-[#111113] border border-[#27272A] rounded-xl p-6">
      <h3 className="text-sm font-semibold text-white mb-4">Category Breakdown</h3>
      
      <div className="relative h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: "#18181B", borderRadius: "12px", border: "1px solid #3F3F46", fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold font-mono text-white">348</span>
          <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Bookings</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[11px] text-stone-400 whitespace-nowrap">{item.name}</span>
            <span className="text-[10px] font-mono text-stone-600 ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
