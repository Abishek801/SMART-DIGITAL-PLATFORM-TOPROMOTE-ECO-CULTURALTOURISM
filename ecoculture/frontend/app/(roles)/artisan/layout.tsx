"use client";

import { motion } from "framer-motion";
import { Hammer, Package, ShoppingCart, BarChart, Settings, LogOut, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAVIGATION = [
  { name: "My Studio", href: "/artisan/studio", icon: <Hammer size={20} /> },
  { name: "Orders", href: "/artisan/orders", icon: <ShoppingCart size={20} /> },
  { name: "Inventory", href: "/artisan/inventory", icon: <Package size={20} /> },
  { name: "Sales Data", href: "/artisan/sales", icon: <BarChart size={20} /> },
  { name: "Shop Settings", href: "/artisan/settings", icon: <Settings size={20} /> },
];

export default function ArtisanLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#110D0B] flex text-stone-300">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1410] border-r border-[#8B5E3C]/10 flex flex-col fixed inset-y-0 z-50">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#8B5E3C]/20 rounded-xl flex items-center justify-center border border-[#8B5E3C]/30">
               <Sparkles className="text-[#8B5E3C]" size={20} />
            </div>
            <h1 className="font-display text-white text-xl">Artisan<span className="text-[#8B5E3C]">Studio</span></h1>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8B5E3C]/60 italic font-bold">Crafting the Future</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-[#8B5E3C]/10 text-white border border-[#8B5E3C]/20 shadow-[0_0_20px_rgba(139,94,60,0.1)]" 
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={`${isActive ? "text-[#8B5E3C]" : "text-stone-600 group-hover:text-[#8B5E3C]/60"} transition-colors`}>
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
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-stone-600 hover:text-white transition-all"
          >
            <LogOut size={20} />
            <span className="font-body text-sm font-medium">Close Studio</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl text-white">The Artisan's Bench</h2>
            <p className="text-stone-500 font-body text-sm">Welcome back. 4 new orders are awaiting your craft.</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-heading text-white">Siddharth Woodworks</p>
              <p className="text-[10px] font-mono text-[#8B5E3C] uppercase tracking-widest">Master Craftsman</p>
            </div>
            <div className="w-12 h-12 rounded-2xl border border-[#8B5E3C]/30 bg-[#8B5E3C]/10 flex items-center justify-center text-[#8B5E3C] font-bold">
               S
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
