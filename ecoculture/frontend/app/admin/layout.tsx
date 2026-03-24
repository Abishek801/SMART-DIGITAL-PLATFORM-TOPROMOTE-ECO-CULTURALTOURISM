"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple auth check for POC - in real app would use proper middleware
  if (status === "unauthenticated") {
    // redirect("/auth/login");
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans">
      {/* Topbar */}
      <AdminTopbar />

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar 
          collapsed={collapsed} 
          onTableCollapse={() => setCollapsed(!collapsed)} 
        />

        {/* Main Content Area */}
        <motion.main
          animate={{ 
            marginLeft: collapsed ? "64px" : "260px",
            width: collapsed ? "calc(100% - 64px)" : "calc(100% - 260px)"
          }}
          className="flex-1 mt-14 p-6 min-h-[calc(100vh-56px)] transition-all duration-300 ease-in-out overflow-x-hidden"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
