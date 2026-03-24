"use client";

import { motion } from "framer-motion";
import { Crown, Shield, Users, Activity, BarChart3, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAVIGATION = [
  { name: "Overview", href: "/super-admin/dashboard", icon: <Activity size={20} /> },
  { name: "User Control", href: "/super-admin/users", icon: <Users size={20} /> },
  { name: "Platform Assets", href: "/super-admin/assets", icon: <Shield size={20} /> },
  { name: "Economics", href: "/super-admin/economics", icon: <BarChart3 size={20} /> },
  { name: "System Settings", href: "/super-admin/settings", icon: <Settings size={20} /> },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex text-stone-300">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0F0F0F] border-r border-gold/10 flex flex-col fixed inset-y-0 z-50">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center border border-gold/20">
            <Crown className="text-gold" size={24} />
          </div>
          <div>
            <h1 className="font-display text-white text-lg leading-none mb-1">EcoCulture</h1>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold/60">Command Center</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-gold/10 text-gold border border-gold/20 shadow-[0_0_20px_rgba(212,168,67,0.1)]" 
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={`${isActive ? "text-gold" : "text-stone-500 group-hover:text-gold/60"} transition-colors`}>
                  {item.icon}
                </span>
                <span className="font-body text-sm font-medium tracking-wide">
                  {item.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_#D4A843]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gold/5">
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-stone-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={20} />
            <span className="font-body text-sm font-medium">Log out of System</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12 overflow-y-auto">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="font-display text-4xl text-white mb-2">Systems Operational</h2>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full uppercase tracking-widest border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Global Pulse Active
              </span>
              <span className="text-xs text-stone-500 font-body">Node: New Delhi-01 · Time: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-ink bg-stone-800" />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-ink bg-gold/20 flex items-center justify-center text-[10px] font-bold text-gold">
                +12
              </div>
            </div>
            <div className="h-10 w-[1px] bg-white/5" />
            <div className="text-right">
              <p className="text-xs font-heading text-white">Supreme Overseer</p>
              <p className="text-[10px] font-mono text-gold uppercase tracking-tighter">Gold Tier Clearance</p>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
