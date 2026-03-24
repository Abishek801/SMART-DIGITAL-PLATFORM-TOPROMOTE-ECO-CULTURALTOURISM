"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GeometricParticles() {
  const [shapes, setShapes] = useState<any[]>([]);

  useEffect(() => {
    const newShapes = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 40, // 40-80px
      duration: Math.random() * 20 + 20, // 20-40s
      delay: Math.random() * -20,
    }));
    setShapes(newShapes);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {shapes.map((shape) => (
        <motion.svg
          key={shape.id}
          viewBox="0 0 100 100"
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: shape.duration, repeat: Infinity, ease: "linear" },
            y: { duration: shape.duration / 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <polygon 
            points="50,0 100,25 100,75 50,100 0,75 0,25" 
            className="fill-none stroke-current"
            stroke="var(--a-primary)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
        </motion.svg>
      ))}
    </div>
  );
}
