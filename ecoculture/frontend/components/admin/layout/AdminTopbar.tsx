"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Bell, 
  Command, 
  PanelLeft, 
  Layout, 
  ExternalLink,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Activity
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function AdminTopbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Parse path for breadcrumbs
  const pathParts = pathname?.split("/").filter(Boolean) || [];

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#09090B]/90 backdrop-blur-xl border-b border-[#27272A] z-[50] px-4 flex items-center justify-between">
      
      {/* Left side: Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button className="flex lg:hidden w-8 h-8 items-center justify-center rounded-lg hover:bg-[#18181B] text-stone-500">
          <PanelLeft size={18} />
        </button>

        <nav className="flex items-center gap-2 text-xs font-medium">
          <span className="text-stone-500">Admin</span>
          {pathParts.filter(p => p !== 'admin').map((part, i) => (
            <div key={part} className="flex items-center gap-2">
              <span className="text-stone-700">/</span>
              <span className={i === pathParts.length - 2 ? "text-white" : "text-stone-400 capitalize"}>
                {part.replace(/-/g, ' ')}
              </span>
            </div>
          ))}
        </nav>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex items-center relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-[#D4A843] transition-colors">
          <Search size={14} />
        </div>
        <input 
          type="text" 
          placeholder="Search bookings, users, audits..." 
          className="w-80 h-9 bg-[#18181B] border border-[#27272A] rounded-lg pl-10 pr-16 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-[#D4A843]/30 transition-all"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#3F3F46] bg-[#27272A] text-[10px] text-stone-500 font-mono">
          <Command size={10} />
          <span>K</span>
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 pr-2 border-r border-[#27272A]">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18181B] border border-[#27272A]">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-widest">Live</span>
          </div>
        </div>

        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#18181B] text-stone-500 hover:text-white transition-all">
          <Bell size={18} strokeWidth={1.5} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#09090B]" />
        </button>

        <div className="relative">
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-[#18181B] transition-colors group"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D4A843] to-[#8B5E3C] flex items-center justify-center text-xs font-bold text-ink">
              {session?.user?.name?.[0] || 'A'}
            </div>
            <ChevronDown size={14} className={`text-stone-600 group-hover:text-stone-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Dropdown */}
          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-56 bg-[#111113] border border-[#27272A] rounded-xl shadow-2xl p-1.5 z-[100]"
              >
                <div className="px-3 py-3 border-b border-[#27272A] mb-1.5">
                  <p className="text-sm font-semibold text-white">{session?.user?.name || "Admin User"}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-1.5 py-0.5 rounded bg-[#D4A843]/10 border border-[#D4A843]/20 text-[9px] font-mono font-bold text-[#D4A843] tracking-widest uppercase">Admin</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <DropdownLink icon={User} label="My Profile" onClick={() => setUserMenuOpen(false)} />
                  <DropdownLink icon={Settings} label="Settings" onClick={() => setUserMenuOpen(false)} />
                  <DropdownLink icon={Activity} label="My Activity" onClick={() => setUserMenuOpen(false)} />
                </div>

                <div className="my-1.5 border-t border-[#27272A]" />

                <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-400 hover:bg-[#18181B] hover:text-white text-xs transition-colors">
                  <ExternalLink size={14} /> View Live Site
                </Link>

                <button 
                  onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-500/10 text-xs transition-colors mt-1"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function DropdownLink({ icon: Icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-400 hover:bg-[#18181B] hover:text-white text-xs transition-colors">
      <Icon size={14} /> {label}
    </button>
  );
}
