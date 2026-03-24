"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function LeafCursor() {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
      {/* Main Cursor Dot */}
      <div className="absolute top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full" />
      
      {/* Animated Leaf Outline */}
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className="-translate-x-1/2 -translate-y-1/2 text-leaf opacity-40"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M16 4C16 4 16 12 8 16C16 20 16 28 16 28C16 28 16 20 24 16C16 12 16 4 16 4Z"
          fill="currentColor"
          stroke="none"
        />
      </motion.svg>
    </motion.div>
  );
}
