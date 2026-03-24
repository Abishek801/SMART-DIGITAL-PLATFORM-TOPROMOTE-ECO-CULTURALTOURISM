"use client";

import { motion } from "framer-motion";
import { 
  DollarSign, 
  Calendar, 
  Package, 
  Users, 
  Download, 
  ChevronDown,
  ArrowUpRight
} from "lucide-react";

// Dashboard Components
import KpiCard from "@/components/admin/dashboard/KpiCard";
import RevenueChart from "@/components/admin/charts/RevenueChart";
import CategoryPieChart from "@/components/admin/charts/CategoryPieChart";
import RecentBookings from "@/components/admin/dashboard/RecentBookings";
import ActivityFeed from "@/components/admin/dashboard/ActivityFeed";

const KPI_DATA = [
  { 
    title: "Total Revenue", 
    value: "₹4,82,500", 
    trend: "18.2%", 
    trendUp: true, 
    icon: DollarSign, 
    color: "#D4A843",
    data: [{pv: 400}, {pv: 600}, {pv: 500}, {pv: 900}, {pv: 800}, {pv: 1100}]
  },
  { 
    title: "Active Bookings", 
    value: "348", 
    trend: "8.1%", 
    trendUp: true, 
    icon: Calendar, 
    color: "#3B82F6",
    data: [{pv: 300}, {pv: 350}, {pv: 320}, {pv: 380}, {pv: 400}, {pv: 380}]
  },
  { 
    title: "Active Orders", 
    value: "127", 
    trend: "12.4%", 
    trendUp: true, 
    icon: Package, 
    color: "#C4845A",
    data: [{pv: 100}, {pv: 120}, {pv: 110}, {pv: 140}, {pv: 130}, {pv: 150}]
  },
  { 
    title: "Total Users", 
    value: "1,284", 
    trend: "6.7%", 
    trendUp: true, 
    icon: Users, 
    color: "#22C55E",
    data: [{pv: 1100}, {pv: 1150}, {pv: 1180}, {pv: 1220}, {pv: 1250}, {pv: 1284}]
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-display">Good morning, Admin</h1>
          <p className="text-stone-500 text-sm font-medium mt-1">Thursday, 20 March 2026</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-9 px-3 rounded-lg bg-[#18181B] border border-[#27272A] text-xs font-bold text-stone-300 flex items-center gap-2 hover:text-white transition-colors">
            Last 30 Days <ChevronDown size={14} />
          </button>
          <button className="h-9 px-4 rounded-lg border border-[#3F3F46] text-xs font-bold text-stone-400 flex items-center gap-2 hover:bg-[#18181B] hover:text-white transition-all">
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_DATA.map((kpi, idx) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <RevenueChart />
        </div>
        <div className="lg:col-span-4">
          <CategoryPieChart />
        </div>
      </div>

      {/* Table & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        <div className="lg:col-span-8">
          <RecentBookings />
        </div>
        <div className="lg:col-span-4">
          <ActivityFeed />
        </div>
      </div>

    </div>
  );
}
