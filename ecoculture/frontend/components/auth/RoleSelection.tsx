"use client";

import { motion } from "framer-motion";
import { Crown, Settings, Compass, Hammer, Backpack, CheckCircle2 } from "lucide-react";
import { AntigravityCard } from "@/components/ui/AntigravityCard";
import { Role } from "@/lib/constants";

interface RoleOption {
  id: Role;
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const ROLES: RoleOption[] = [
  {
    id: "SUPER_ADMIN" as Role,
    name: "Super Admin",
    description: "Master control for platforms and users.",
    color: "#D4A843",
    icon: <Crown className="w-12 h-12" />,
  },
  {
    id: "ADMIN" as Role,
    name: "Admin",
    description: "Manage destinations and operations.",
    color: "#C4845A",
    icon: <Settings className="w-12 h-12" />,
  },
  {
    id: "GUIDE" as Role,
    name: "Guide",
    description: "Lead eco-tours and host journeys.",
    color: "#4A8B5C",
    icon: <Compass className="w-12 h-12" />,
  },
  {
    id: "ARTISAN" as Role,
    name: "Artisan",
    description: "Craft and sell sustainable products.",
    color: "#8B5E3C",
    icon: <Hammer className="w-12 h-12" />,
  },
  {
    id: "TRAVELER" as Role,
    name: "Traveler",
    description: "Discover and experience the wild.",
    color: "#2D5A3D",
    icon: <Backpack className="w-12 h-12" />,
  },
];

interface RoleSelectionProps {
  onSelect: (role: Role) => void;
  selectedRole: Role | null;
}

export function RoleSelection({ onSelect, selectedRole }: RoleSelectionProps) {
  return (
    <div className="w-full max-w-[1440px] px-4 md:px-xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-display text-5xl md:text-7xl font-light text-white mb-6">
          Who are you <span className="italic text-clay">today?</span>
        </h1>
        <p className="text-stone-400 font-body text-lg max-w-xl mx-auto">
          Select your role to enter your personalized portal and begin your contribution to the ecosystem.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
        {ROLES.map((role) => (
          <motion.div
            key={role.id}
            layout
            whileHover={{ scale: 1.05 }}
            className={`relative transition-opacity duration-500 ${
              selectedRole && selectedRole !== role.id ? "opacity-40" : "opacity-100"
            }`}
          >
            <AntigravityCard
              mode="tilt"
              maxRotation={10}
              perspective={1000}
              className="h-full cursor-pointer"
            >
              <div
                onClick={() => onSelect(role.id)}
                className={`flex flex-col items-center justify-center p-8 rounded-card h-[280px] bg-ink-soft border-2 transition-all duration-500 shadow-surface group ${
                  selectedRole === role.id
                    ? "border-[color:var(--role-color)] ring-2 ring-[color:var(--role-color)] ring-opacity-50"
                    : "border-white/5 hover:border-white/20"
                }`}
                style={{ "--role-color": role.color } as any}
              >
                <div
                  className="mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{ color: role.color }}
                >
                  {role.icon}
                </div>
                
                <h3 className="font-display text-xl font-medium text-white mb-2">
                  {role.name}
                </h3>
                
                <p className="text-stone-500 text-xs text-center font-body leading-relaxed">
                  {role.description}
                </p>

                {selectedRole === role.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 text-[color:var(--role-color)]"
                  >
                    <CheckCircle2 size={24} fill="currentColor" className="text-ink" />
                  </motion.div>
                )}
                
                {/* Background Glow */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                  style={{ 
                    background: `linear-gradient(to top, ${role.color}, transparent)` 
                  }}
                />
              </div>
            </AntigravityCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
