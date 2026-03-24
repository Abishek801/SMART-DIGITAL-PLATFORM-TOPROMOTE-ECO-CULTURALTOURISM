"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { Search, MapPin, Cpu, ShoppingBag, Menu, X, User, LogOut, LayoutDashboard, ChevronDown, Shield, ShoppingCart, List } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import CartDrawer from "@/components/shop/CartDrawer";
import { springConfigs } from "@/lib/motion";

const NAV_LINKS = [
  { href: "/destinations", label: "Destinations" },
  { href: "/map", label: "Map" },
  { href: "/planner", label: "AI Planner" },
  { href: "/shop", label: "Eco Shop" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const { items, setCartOpen } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const isAdmin = session?.user?.email === "admin@ecoculture.travel";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ ...springConfigs.snappy, delay: 0.1 }}
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className={`pointer-events-auto flex items-center justify-between h-14 w-full max-w-[900px] px-2 rounded-pill transition-all duration-500 ${scrolled ? "glass shadow-2xl" : "bg-transparent"}`}>
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 pl-2 group">
            <div className="w-8 h-8 rounded-full overflow-hidden relative bg-gradient-to-br from-moss to-canopy flex items-center justify-center shadow-surface">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                <path d="M7 6H15M7 12H13M7 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-display text-xl font-medium tracking-wide hidden sm:block text-white">
              EcoCulture
            </span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="relative group px-2 py-1">
                  <span className={`text-sm font-body font-medium transition-colors duration-300 relative z-10 ${isActive ? "text-leaf" : "text-stone-300 group-hover:text-leaf"}`}>
                    {link.label}
                  </span>
                  {/* Active highlight pill */}
                  {isActive && (
                    <motion.div layoutId="nav-active" className="absolute inset-0 bg-white/5 rounded-pill" transition={springConfigs.snappy} />
                  )}
                  {/* Hover underline */}
                  <span className="absolute -bottom-1 left-1.5 right-1.5 h-[2px] bg-leaf scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              )
            })}
          </nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-1 pr-1">
            <button onClick={() => setCartOpen(true)} className="relative w-10 h-10 rounded-full flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/5 transition-colors">
              <ShoppingCart size={18} strokeWidth={1.5} />
              {mounted && items.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-leaf rounded-full text-[10px] font-bold font-mono text-white flex items-center justify-center shadow-md">
                  {items.reduce((acc, i) => acc + i.qty, 0)}
                </span>
              )}
            </button>

            {session ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-white/5 transition-colors group">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-body ${isAdmin ? "bg-gold text-ink" : "bg-canopy text-white"}`}>
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  {isAdmin && <span className="text-[10px] font-mono font-bold text-gold tracking-widest px-1.5 py-0.5 rounded bg-gold/10 hidden sm:block">ADMIN</span>}
                  <ChevronDown size={14} className={`text-stone-400 group-hover:text-white transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                      animate={{ opacity: 1, y: 0, scale: 1 }} 
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={springConfigs.snappy}
                      className="absolute right-0 top-full mt-4 w-56 glass shadow-2xl rounded-2xl overflow-hidden border border-white/10"
                    >
                      <div className="p-4 border-b border-white/10">
                        <p className="font-body font-semibold text-white text-sm">{session.user?.name}</p>
                        <p className="font-mono text-xs text-stone-400 mt-0.5 truncate">{session.user?.email}</p>
                      </div>
                      <div className="p-2 space-y-1">
                        {isAdmin && (
                          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gold hover:bg-gold/10 text-sm font-body transition-colors" onClick={() => setUserMenuOpen(false)}>
                            <Shield size={16} strokeWidth={1.5} /> Admin Portal
                          </Link>
                        )}
                        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-300 hover:bg-white/10 text-sm font-body transition-colors" onClick={() => setUserMenuOpen(false)}>
                          <LayoutDashboard size={16} strokeWidth={1.5} /> Dashboard
                        </Link>
                        <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-300 hover:bg-white/10 text-sm font-body transition-colors" onClick={() => setUserMenuOpen(false)}>
                          <User size={16} strokeWidth={1.5} /> Profile
                        </Link>
                      </div>
                      <div className="p-2 border-t border-white/10">
                        <button onClick={() => signOut({ callbackUrl: "/auth/login" })} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-clay hover:bg-clay/10 text-sm font-body transition-colors w-full">
                          <LogOut size={16} strokeWidth={1.5} /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-1 pl-2">
                <Link href="/auth/login" className="px-4 py-2 text-sm font-body font-medium text-stone-300 hover:text-white transition-colors">Sign In</Link>
                <Link href="/auth/register" className="h-9 px-5 rounded-full bg-white text-ink text-sm font-body font-semibold flex items-center justify-center hover:scale-95 transition-transform duration-200">
                  Begin
                </Link>
              </div>
            )}

            <button className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setMenuOpen(true)}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE FULL-SCREEN OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-xl flex flex-col pt-6 pb-12 px-6"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setMenuOpen(false)} className="w-12 h-12 rounded-full glass flex items-center justify-center text-white">
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 flex-1 justify-center">
              {NAV_LINKS.map((link, i) => (
                <motion.div 
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springConfigs.snappy, delay: i * 0.1 }}
                  className="overflow-hidden"
                >
                  <Link href={link.href} onClick={() => setMenuOpen(false)} className="font-display text-5xl font-medium text-white hover:text-leaf transition-colors block">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-auto space-y-4"
            >
              <hr className="border-white/10" />
              {session ? (
                <div className="grid grid-cols-2 gap-3 pt-4">
                  {isAdmin && <Link href="/admin" onClick={() => setMenuOpen(false)} className="glass text-gold text-center py-4 rounded-2xl font-body font-medium">Admin Portal</Link>}
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="glass text-white text-center py-4 rounded-2xl font-body font-medium">Dashboard</Link>
                  <button onClick={() => { setMenuOpen(false); setCartOpen(true); }} className="glass text-white text-center py-4 rounded-2xl font-body font-medium">Cart ({mounted ? items.reduce((acc, i) => acc + i.qty, 0) : 0})</button>
                  <button onClick={() => signOut()} className="glass text-clay text-center py-4 rounded-2xl font-body font-medium">Sign Out</button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-4">
                  <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="glass text-white text-center py-4 rounded-2xl font-body font-medium text-lg">Sign In</Link>
                  <Link href="/auth/register" onClick={() => setMenuOpen(false)} className="bg-white text-ink text-center py-4 rounded-2xl font-body font-medium text-lg">Create Account</Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <CartDrawer />
    </>
  );
}
