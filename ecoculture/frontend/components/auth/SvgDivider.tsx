"use client";

import { motion } from "framer-motion";

interface SvgDividerProps {
  role: "TRAVELER" | "ADMIN";
}

export default function SvgDivider({ role }: SvgDividerProps) {
  const isTraveler = role === "TRAVELER";
  
  // Path for Traveler (Gentle curves)
  const travelerPath = "M0,0 C20,100 80,0 100,100 L100,0 Z";
  // Path for Admin (Sharper, geometric-inspired switch)
  const adminPath = "M0,0 C40,40 60,60 100,100 L100,0 Z";

  // Actually, let's use a more vertical split divider for the desktop 50/50
  // Desktop divider is a vertical organic curve
  const desktopTravelerPath = "M0,0 Q50,500 0,1000 L-100,1000 L-100,0 Z";
  const desktopAdminPath = "M0,0 Q150,500 0,1000 L-100,1000 L-100,0 Z";

  // But the prompt asked for an S-curve. Let's make it beautiful.
  const pathT = "M0,0 C60,200 -60,800 0,1000 L-100,1000 L-100,0 Z";
  const pathA = "M0,0 C120,400 -120,600 0,1000 L-100,1000 L-100,0 Z";

  return (
    <div className="absolute top-0 bottom-0 left-[50%] w-[120px] pointer-events-none z-20 hidden lg:block">
      <svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        className="w-full h-full fill-current"
      >
        <motion.path
          animate={{
            d: isTraveler ? pathT : pathA,
            fill: isTraveler ? "#2D5A3D" : "#8B5E3C"
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
