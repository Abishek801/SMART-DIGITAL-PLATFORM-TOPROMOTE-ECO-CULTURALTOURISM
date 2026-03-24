"use client";

import { motion } from "framer-motion";
import { useAntigravity, AntigravityOptions } from "@/hooks/useAntigravity";
import { ReactNode } from "react";

interface AntigravityCardProps extends AntigravityOptions {
  children: ReactNode;
  className?: string;
}

export function AntigravityCard({ children, className = "", ...options }: AntigravityCardProps) {
  const { ref, style, controls } = useAntigravity(options);

  return (
    <motion.div
      ref={ref}
      style={{
        ...style,
        transformStyle: "preserve-3d",
      }}
      animate={controls}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
