"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  BarChart3, 
  MapPin, 
  ShoppingBag, 
  Map, 
  Calendar, 
  Package, 
  Users, 
  Star, 
  Wallet, 
  Bell, 
  Settings, 
  History,
  Shield,
  Truck,
  Flame,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_SECTIONS = [
  {
    label: "OVERVIEW",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { label: "Product Heatmap", href: "/admin/analytics/heatmap", icon: Flame },
    ]
  },
  {
    label: "MANAGEMENT",
    items: [
      { label: "Destinations", href: "/admin/destinations", icon: MapPin },
      { label: "Products", href: "/admin/products", icon: ShoppingBag },
      { label: "Locations", href: "/admin/locations", icon: Map },
      { label: "Bookings", href: "/admin/bookings", icon: Calendar, badge: "12" },
      { label: "Delivery", href: "/admin/orders", icon: Truck, badge: "23" },
    ]
  },
  {
    label: "USERS",
    items: [
      { label: "All Users", href: "/admin/users", icon: Users },
      { label: "Reviews", href: "/admin/reviews", icon: Star },
      { label: "Payouts", href: "/admin/payouts", icon: Wallet },
    ]
  },
  {
    label: "SYSTEM",
    items: [
      { label: "Notifications", href: "/admin/notifications", icon: Bell },
      { label: "Login History", href: "/admin/login-history", icon: Shield },
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "Audit Log", href: "/admin/audit", icon: History },
    ]
  }
];

interface AdminSidebarProps {
  collapsed: boolean;
  onTableCollapse: () => void;
}

export default function AdminSidebar({ collapsed, onTableCollapse }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 260 }}
      className="fixed left-0 top-14 bottom-0 bg-[#09090B] border-r border-[#27272A] z-40 flex flex-col transition-all duration-300 ease-in-out"
    >
      {/* Scrollable Nav */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
        {NAV_SECTIONS.map((section, idx) => (
          <div key={section.label} className="mb-6">
            {!collapsed && (
              <h3 className="px-6 mb-2 text-[10px] font-bold text-stone-600 tracking-[0.15em] uppercase">
                {section.label}
              </h3>
            )}
            <div className="px-2 space-y-1">
              {section.items.map((item) => (
                <SidebarItem 
                  key={item.href}
                  {...item} 
                  isActive={pathname === item.href} 
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-[#27272A] bg-[#09090B]/80 backdrop-blur-md">
        <button
          onClick={onTableCollapse}
          className="w-full h-10 flex items-center justify-center rounded-lg hover:bg-[#18181B] text-stone-500 hover:text-white transition-colors gap-2"
        >
          {collapsed ? <ChevronRight size={18} /> : (
            <>
              <ChevronLeft size={16} />
              <span className="text-xs font-medium">Collapse</span>
            </>
          )}
        </button>
        {!collapsed && (
          <div className="mt-2 px-4 py-2">
             <p className="text-[9px] font-mono text-stone-600 uppercase tracking-widest">v2.1.0 · Build 2847</p>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

function SidebarItem({ label, href, icon: Icon, badge, isActive, collapsed }: any) {
  return (
    <Link href={href}>
      <div 
        className={`relative h-10 flex items-center gap-3 rounded-lg mx-1 transition-all duration-200 group ${
          isActive 
            ? "bg-[#D4A843]/10 border border-[#D4A843]/20 text-white" 
            : "text-stone-400 hover:text-white hover:bg-[#18181B]"
        } ${collapsed ? "justify-center" : "px-3"}`}
      >
        <div className={`shrink-0 ${isActive ? "text-[#D4A843]" : "text-stone-500 group-hover:text-stone-300"}`}>
          <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
        </div>
        
        {!collapsed && (
          <>
            <span className="text-sm font-medium flex-1 truncate">{label}</span>
            {badge && (
              <span className="ml-auto px-1.5 py-0.5 rounded-full bg-red-500 text-[10px] font-bold text-white min-w-[18px] text-center">
                {badge}
              </span>
            )}
          </>
        )}

        {isActive && (
          <motion.div 
            layoutId="sidebar-active"
            className="absolute left-0 top-2 bottom-2 w-[3px] bg-[#D4A843] rounded-r-full"
          />
        )}

        {collapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#111113] border border-[#27272A] rounded text-[11px] text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
            {label}
          </div>
        )}
      </div>
    </Link>
  );
}
