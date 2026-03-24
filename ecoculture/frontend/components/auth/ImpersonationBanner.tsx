"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, LogOut, ShieldAlert } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export function ImpersonationBanner() {
  const { data: session } = useSession();
  
  // In a real app, we'd check session.isImpersonating
  // For this demo, we can trigger it via a search param or local storage
  const isImpersonating = typeof window !== 'undefined' && localStorage.getItem('impersonating') === 'true';

  if (!isImpersonating) return null;

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[9999] bg-gold text-ink px-6 py-2 flex items-center justify-between shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
    >
      <div className="flex items-center gap-3 font-heading font-bold text-sm">
        <ShieldAlert size={18} className="animate-pulse" />
        <span>SUPER ADMIN MODE: Viewing as {session?.user?.name || 'User'}</span>
        <span className="hidden md:inline px-2 py-0.5 bg-ink/10 rounded text-[10px] uppercase font-mono">Auditable Session</span>
      </div>

      <button 
        onClick={() => {
          localStorage.removeItem('impersonating');
          window.location.reload();
        }}
        className="flex items-center gap-2 px-4 py-1 bg-ink text-white rounded-lg text-xs font-bold hover:scale-105 transition-all"
      >
        <LogOut size={14} />
        Exit Impersonation
      </button>
    </motion.div>
  );
}
