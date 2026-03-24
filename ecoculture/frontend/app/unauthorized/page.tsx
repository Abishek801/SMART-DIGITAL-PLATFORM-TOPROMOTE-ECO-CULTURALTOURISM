"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ForbiddenPage() {
  const { data: session } = useSession();
  const user = session?.user as any;

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={48} className="text-red-500" />
          </div>
          
          <h1 className="font-display text-4xl text-white mb-4">Access Restricted</h1>
          <p className="text-stone-400 font-body">
            You are logged in as <span className="text-clay font-bold">{user?.role}</span>. 
            This area requires a different clearance level.
          </p>
        </motion.div>

        <div className="space-y-4">
          <Link 
            href={getDashboardLink(user?.role)}
            className="w-full h-14 bg-white text-ink rounded-xl font-heading font-bold flex items-center justify-center gap-2 hover:scale-[0.98] transition-all"
          >
            <Home size={18} /> Go to My Dashboard
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full h-14 bg-white/5 border border-white/10 text-white rounded-xl font-heading font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

function getDashboardLink(role?: string) {
  switch (role) {
    case "SUPER_ADMIN": return "/super-admin/dashboard";
    case "ADMIN": return "/admin/dashboard";
    case "GUIDE": return "/guide/dashboard";
    case "ARTISAN": return "/artisan/studio";
    case "TRAVELER": return "/dashboard";
    default: return "/";
  }
}
