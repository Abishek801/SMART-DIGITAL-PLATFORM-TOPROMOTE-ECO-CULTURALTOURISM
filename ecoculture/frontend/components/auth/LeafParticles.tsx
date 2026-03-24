"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LEAF_PATH = "M10,0 C15,5 20,8 10,20 C0,8 5,5 10,0 Z";

export default function LeafParticles() {
  const [leaves, setLeaves] = useState<any[]>([]);

  useEffect(() => {
    const newLeaves = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 16 + 12, // 12-28px
      opacity: Math.random() * 0.3 + 0.15,
      duration: Math.random() * 6 + 8, // 8-14s
      delay: Math.random() * 5,
      color: i % 2 === 0 ? "#4A8B5C" : "#7BAE8A"
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-50">
      {leaves.map((leaf) => (
        <motion.svg
          key={leaf.id}
          viewBox="0 0 20 20"
          className="absolute"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            width: leaf.size,
            height: leaf.size,
            fill: leaf.color,
            opacity: leaf.opacity
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 5, -5, 3, 0],
            rotate: [0, 15, -10, 8, 0],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: "easeInOut"
          }}
        >
          <path d={LEAF_PATH} />
        </motion.svg>
      ))}
    </div>
  );
}
