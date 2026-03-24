"use client";

import { motion } from "framer-motion";
import { Compass, Calendar, Map, Cloud, MessageCircle, Settings, LogOut, Navigation } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAVIGATION = [
  { name: "My Field", href: "/guide/dashboard", icon: <Navigation size={20} /> },
  { name: "Expeditions", href: "/guide/expeditions", icon: <Map size={20} /> },
  { name: "Roster", href: "/guide/roster", icon: <Calendar size={20} /> },
  { name: "Direct Comms", href: "/guide/messages", icon: <MessageCircle size={20} /> },
  { name: "Toolkit Config", href: "/guide/settings", icon: <Settings size={20} /> },
];

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0E1410] flex text-stone-300">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141C16] border-r border-leaf/10 flex flex-col fixed inset-y-0 z-50">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-leaf/20 rounded-full flex items-center justify-center border border-leaf/30 shadow-[0_0_15px_rgba(74,139,92,0.2)]">
            <Compass className="text-leaf" size={20} />
          </div>
          <h1 className="font-display text-white text-xl">Guide<span className="text-leaf">Hub</span></h1>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1">
          {NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-leaf/10 text-white border border-leaf/20" 
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={`${isActive ? "text-leaf" : "text-stone-600 group-hover:text-leaf/60"} transition-colors`}>
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
          <div className="mb-4 p-4 rounded-xl bg-leaf/5 border border-leaf/10">
            <div className="flex items-center gap-2 mb-2">
              <Cloud size={14} className="text-leaf" />
              <span className="text-[10px] font-mono text-leaf uppercase tracking-widest font-bold">Field Weather</span>
            </div>
            <p className="text-xs text-stone-400">Kasol: 18°C · Light Rain</p>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-stone-600 hover:text-white transition-all"
          >
            <LogOut size={20} />
            <span className="font-body text-sm font-medium">End Field Shift</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl text-white">Field Activity</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
              <p className="text-stone-500 font-body text-sm uppercase tracking-tighter">On-Site: Munnar Forest Reserve</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-heading text-white">Vikram Nair</p>
              <div className="flex items-center justify-end gap-1">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-leaf" />)}
                 <span className="text-[10px] font-mono text-leaf ml-1">VETERAN</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-leaf/30 bg-stone-800" />
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
