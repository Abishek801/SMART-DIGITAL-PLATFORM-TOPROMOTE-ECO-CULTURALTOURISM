"use client";

import { motion } from "framer-motion";

export default function ScanningLine() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-30">
      <motion.div
        className="w-full h-[1px]"
        initial={{ top: "0%", opacity: 0 }}
        animate={{
          top: ["0%", "100%", "100%"],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.5, 1]
        }}
        style={{
          background: "linear-gradient(90deg, transparent, var(--a-primary), transparent)",
          boxShadow: "0 0 8px var(--a-primary)"
        }}
      />
    </div>
  );
}
