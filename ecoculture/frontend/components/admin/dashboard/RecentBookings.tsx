"use client";

import { motion } from "framer-motion";
import { ArrowRight, MoreHorizontal, User, MapPin } from "lucide-react";
import Link from "next/link";

const bookings = [
  { id: "BK-8291", customer: "Arjun Mehta", destination: "Munnar Eco Village", date: "20 Mar 2026", amount: "₹18,500", status: "Confirmed" },
  { id: "BK-8292", customer: "Sarah Chen", destination: "Ziro Valley Trek", date: "21 Mar 2026", amount: "₹24,200", status: "Pending" },
  { id: "BK-8293", customer: "Rahul Das", destination: "Sundarbans Stay", date: "22 Mar 2026", amount: "₹12,800", status: "Completed" },
  { id: "BK-8294", customer: "Elena Rodriguez", destination: "Coorg Estate", date: "24 Mar 2026", amount: "₹31,000", status: "Confirmed" },
  { id: "BK-8295", customer: "Vikram Singh", destination: "Spiti Homestay", date: "25 Mar 2026", amount: "₹15,400", status: "Cancelled" },
];

export default function RecentBookings() {
  return (
    <div className="bg-[#111113] border border-[#27272A] rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[#27272A] flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Recent Bookings</h3>
        <Link href="/admin/bookings" className="text-xs font-bold text-[#D4A843] hover:underline flex items-center gap-1">
           View All <ArrowRight size={12} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#0D0D0F] border-b border-[#27272A]">
            <tr>
              <th className="px-6 py-3 text-[10px] font-bold text-stone-500 uppercase tracking-widest">ID</th>
              <th className="px-6 py-3 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Customer</th>
              <th className="px-6 py-3 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Destination</th>
              <th className="px-6 py-3 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-3 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F1F23]">
            {bookings.map((bk) => (
              <tr key={bk.id} className="group hover:bg-[#18181B] transition-colors">
                <td className="px-6 py-4 text-[11px] font-mono text-stone-500">{bk.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#1F1F23] flex items-center justify-center text-stone-400">
                      <User size={12} />
                    </div>
                    <span className="text-sm text-stone-200 font-medium">{bk.customer}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs text-stone-400">
                    <MapPin size={12} className="text-[#D4A843]" />
                    {bk.destination}
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-mono font-bold text-white">{bk.amount}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={bk.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-stone-600 hover:text-white transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    Confirmed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Completed: "bg-green-500/10 text-green-500 border-green-500/20",
    Cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${colors[status]}`}>
      {status}
    </span>
  );
}
