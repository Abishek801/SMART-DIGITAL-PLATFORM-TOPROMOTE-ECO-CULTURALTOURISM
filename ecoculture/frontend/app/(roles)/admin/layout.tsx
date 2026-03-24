"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, CheckSquare, IndianRupee, FileText, Settings, LogOut, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAVIGATION = [
  { name: "Control Center", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Moderation Queue", href: "/admin/moderation", icon: <CheckSquare size={20} /> },
  { name: "Payout Hub", href: "/admin/payouts", icon: <IndianRupee size={20} /> },
  { name: "Analytics", href: "/admin/reports", icon: <FileText size={20} /> },
  { name: "Preferences", href: "/admin/settings", icon: <Settings size={20} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex text-stone-400">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121212] border-r border-clay/10 flex flex-col fixed inset-y-0 z-50">
        <div className="p-8">
          <h1 className="font-display text-white text-2xl tracking-tight">Control<span className="text-clay italic">Room</span></h1>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-600 mt-1">EcoCulture Admin</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-clay/10 text-clay border border-clay/20" 
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={isActive ? "text-clay" : "text-stone-600"}>
                  {item.icon}
                </span>
                <span className="font-body text-sm font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:text-white hover:bg-white/5 transition-all"
          >
            <LogOut size={20} />
            <span className="font-body text-sm font-medium">Exit Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl text-white">Operations Dashboard</h2>
            <p className="text-stone-500 font-body text-sm">Managing platform integrity and financial flow.</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-full bg-white/5 border border-white/10 text-stone-400 hover:text-clay transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-clay rounded-full shadow-[0_0_8px_#C4845A]" />
            </button>
            <div className="h-8 w-[1px] bg-white/10 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-heading text-white">Aditi Singh</p>
                <p className="text-[10px] font-mono text-clay uppercase">Senior Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-clay/20 border border-clay/30" />
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
