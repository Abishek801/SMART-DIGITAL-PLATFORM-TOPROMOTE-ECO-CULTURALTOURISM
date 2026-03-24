"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, UserCheck, UserX, Shield, Leaf, MoreHorizontal, Filter } from "lucide-react";

const USERS = [
  { id: "u1", name: "Priya Sharma", email: "priya@example.com", role: "USER", status: "ACTIVE", ecoScore: 847, trips: 6, joined: "Jan 2024", spend: "₹48,200" },
  { id: "u2", name: "Rahul Mehta", email: "rahul@example.com", role: "USER", status: "ACTIVE", ecoScore: 620, trips: 3, joined: "Feb 2024", spend: "₹22,500" },
  { id: "u3", name: "Anita Nair", email: "anita@example.com", role: "GUIDE", status: "ACTIVE", ecoScore: 920, trips: 14, joined: "Nov 2023", spend: "₹0" },
  { id: "u4", name: "Vikram Singh", email: "vikram@example.com", role: "USER", status: "LOCKED", ecoScore: 210, trips: 1, joined: "Mar 2024", spend: "₹4,800" },
  { id: "u5", name: "Deepa Krishnan", email: "deepa@example.com", role: "USER", status: "ACTIVE", ecoScore: 755, trips: 5, joined: "Dec 2023", spend: "₹38,000" },
  { id: "u6", name: "Arjun Patel", email: "arjun@example.com", role: "USER", status: "ACTIVE", ecoScore: 490, trips: 2, joined: "Feb 2024", spend: "₹15,600" },
  { id: "u7", name: "Admin User", email: "admin@ecoculture.travel", role: "ADMIN", status: "ACTIVE", ecoScore: 1000, trips: 0, joined: "Oct 2023", spend: "₹0" },
];

const ROLE_STYLE: Record<string, string> = {
  ADMIN: "bg-earth-900/60 text-earth-300 border-earth-700/30",
  GUIDE: "bg-blue-900/60 text-blue-300 border-blue-700/30",
  USER: "bg-forest-900/60 text-forest-300 border-forest-700/30",
};

const STATUS_STYLE: Record<string, string> = {
  ACTIVE: "bg-forest-900/60 text-forest-300 border-forest-700/30",
  LOCKED: "bg-red-900/60 text-red-300 border-red-700/30",
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const filtered = USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "ALL" || u.role === filter || u.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-100">User Management</h1>
          <p className="text-stone-500 font-body text-sm">{USERS.length} total users</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 glass rounded-xl px-3 py-2">
            <UserCheck size={14} className="text-forest-400" />
            <span className="text-xs font-body text-stone-300">{USERS.filter(u => u.status === "ACTIVE").length} Active</span>
          </div>
          <div className="flex items-center gap-2 glass rounded-xl px-3 py-2">
            <UserX size={14} className="text-red-400" />
            <span className="text-xs font-body text-stone-300">{USERS.filter(u => u.status === "LOCKED").length} Locked</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="input pl-9 py-2 text-sm" />
        </div>
        {["ALL", "USER", "GUIDE", "ADMIN", "LOCKED"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-2 rounded-xl text-sm font-body font-medium transition-all ${filter === f ? "bg-earth-600 text-white" : "glass text-stone-400 hover:text-stone-200"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-forest-900/20">
              {["User", "Role", "Status", "Eco Score", "Trips", "Total Spend", "Joined", "Actions"].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-body font-semibold text-stone-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-900/10">
            {filtered.map((user, i) => (
              <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="hover:bg-forest-900/10 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center text-xs font-bold text-forest-300">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-stone-200 font-body text-sm font-medium">{user.name}</p>
                      <p className="text-stone-500 text-xs">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-[10px] px-2 py-1 rounded-full border font-semibold font-body ${ROLE_STYLE[user.role]}`}>{user.role}</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-[10px] px-2 py-1 rounded-full border font-semibold font-body ${STATUS_STYLE[user.status]}`}>{user.status}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <Leaf size={12} className="text-forest-400" />
                    <span className="text-forest-300 font-mono text-sm font-bold">{user.ecoScore}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-stone-400 font-body text-sm">{user.trips}</td>
                <td className="px-5 py-4 text-stone-200 font-display font-bold text-sm">{user.spend}</td>
                <td className="px-5 py-4 text-stone-500 font-body text-xs">{user.joined}</td>
                <td className="px-5 py-4">
                  <button className="w-7 h-7 glass rounded-lg flex items-center justify-center text-stone-500 hover:text-stone-200 transition-colors">
                    <MoreHorizontal size={14} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
