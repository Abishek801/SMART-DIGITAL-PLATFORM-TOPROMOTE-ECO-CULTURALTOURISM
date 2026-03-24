"use client";

import { motion } from "framer-motion";
import { Compass, Shield, LucideIcon } from "lucide-react";

interface RoleToggleProps {
  activeRole: "TRAVELER" | "ADMIN";
  onChange: (role: "TRAVELER" | "ADMIN") => void;
}

export default function RoleToggle({ activeRole, onChange }: RoleToggleProps) {
  return (
    <div className="relative w-full bg-white/[0.03] border border-white/5 rounded-2xl p-1.5 flex gap-1 mb-8 shadow-inner">
      {/* Sliding Background */}
      <motion.div
        layoutId="role-slider"
        className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl z-0 shadow-lg border"
        initial={false}
        animate={{
          x: activeRole === "TRAVELER" ? 0 : "100%",
          background: activeRole === "TRAVELER" 
            ? "linear-gradient(135deg, var(--t-mid), var(--t-deep))" 
            : "linear-gradient(135deg, var(--a-mid), var(--a-deep))",
          borderColor: activeRole === "TRAVELER" 
            ? "rgba(74,139,92,0.3)" 
            : "rgba(212,168,67,0.3)",
          boxShadow: activeRole === "TRAVELER"
            ? "0 4px 15px rgba(74,139,92,0.2)"
            : "0 4px 15px rgba(212,168,67,0.2)"
        }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      />

      <RoleButton
        active={activeRole === "TRAVELER"}
        onClick={() => onChange("TRAVELER")}
        icon={Compass}
        label="Traveler"
        role="TRAVELER"
      />
      
      <RoleButton
        active={activeRole === "ADMIN"}
        onClick={() => onChange("ADMIN")}
        icon={Shield}
        label="Admin"
        role="ADMIN"
      />
    </div>
  );
}

function RoleButton({ 
  active, 
  onClick, 
  icon: Icon, 
  label, 
  role 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: LucideIcon; 
  label: string;
  role: "TRAVELER" | "ADMIN";
}) {
  return (
    <button
      onClick={onClick}
      className={`relative z-10 flex-1 h-11 flex items-center justify-center gap-2.5 rounded-xl transition-all duration-300 ${
        active ? "text-white" : "text-stone-500 hover:text-stone-300"
      }`}
    >
      <Icon 
        size={16} 
        strokeWidth={active ? 2.5 : 1.5} 
        className={active ? (role === "TRAVELER" ? "text-t-mist" : "text-a-mist") : ""} 
      />
      <span className="font-display font-medium text-sm tracking-wide">
        {label}
      </span>
    </button>
  );
}
