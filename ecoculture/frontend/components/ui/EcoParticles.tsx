"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export function EcoParticles({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      // Return 0 particles on mobile for performance logic if needed later
      if (window.innerWidth < 768) return Array.from({ length: Math.floor(count / 2) }).map(createParticle);
      return Array.from({ length: count }).map(createParticle);
    };

    const createParticle = (_: any, i: number) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -50 - Math.random() * 200,
      size: 15 + Math.random() * 25,
      duration: 15 + Math.random() * 25, // Slow, peaceful drifting
      delay: Math.random() * 5,
      rotation: Math.random() * 360,
    });
    
    setParticles(generateParticles());
    
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => setParticles(generateParticles()), 300);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-forest-500/20"
          initial={{ x: p.x, y: p.y, rotate: p.rotation, opacity: 0 }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
            x: p.x + (Math.random() * 200 - 100), // Drifting horizontally
            rotate: p.rotation + 360,
            opacity: [0, 1, 1, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: p.size, height: p.size }}
        >
          {/* Simple Leaf Path */}
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12,2C12,2 5,5 5,12C5,19 12,22 12,22C12,22 19,19 19,12C19,5 12,2 12,2ZM12,20C9.1,17.7 7,14.6 7,12C7,7 12,4.5 12,4.5C12,4.5 17,7 17,12C17,14.6 14.9,17.7 12,20Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
