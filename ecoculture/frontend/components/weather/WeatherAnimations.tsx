"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export type WeatherCondition = 
  | "CLEAR_DAY" 
  | "CLEAR_NIGHT" 
  | "CLOUDY" 
  | "RAIN" 
  | "THUNDERSTORM" 
  | "SNOW" 
  | "FOG" 
  | "HOT" 
  | "COLD" 
  | "WINDY";

interface WeatherAnimationsProps {
  condition: WeatherCondition;
}

export default function WeatherAnimations({ condition }: WeatherAnimationsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={condition}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full relative"
        >
          {condition === "RAIN" && <RainEffect />}
          {condition === "THUNDERSTORM" && <ThunderstormEffect />}
          {condition === "CLEAR_DAY" && <ClearDayEffect />}
          {condition === "CLEAR_NIGHT" && <ClearNightEffect />}
          {condition === "CLOUDY" && <CloudyEffect />}
          {condition === "SNOW" && <SnowEffect />}
          {condition === "FOG" && <FogEffect />}
          {condition === "HOT" && <HotEffect />}
          {condition === "WINDY" && <WindyEffect />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function RainEffect() {
  return (
    <div className="absolute inset-0">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/20 w-[1px] h-12"
          initial={{ 
            top: -100, 
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{ 
            top: "110%",
          }}
          transition={{ 
            duration: Math.random() * 0.5 + 0.5, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 2 
          }}
        />
      ))}
      <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
    </div>
  );
}

function ThunderstormEffect() {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const triggerFlash = () => {
      if (Math.random() > 0.8) {
        setFlash(true);
        setTimeout(() => setFlash(false), 50 + Math.random() * 100);
        // Double flash
        if (Math.random() > 0.5) {
          setTimeout(() => {
            setFlash(true);
            setTimeout(() => setFlash(false), 30);
          }, 150);
        }
      }
    };

    const interval = setInterval(triggerFlash, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      <RainEffect />
      <motion.div 
        animate={{ opacity: flash ? 0.4 : 0 }}
        className="absolute inset-0 bg-white z-50 pointer-events-none"
      />
      <div className="absolute inset-0 bg-slate-900/30 mix-blend-multiply" />
    </div>
  );
}

function ClearDayEffect() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 to-transparent">
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-200/20 blur-[100px] rounded-full"
      />
    </div>
  );
}

function ClearNightEffect() {
  return (
    <div className="absolute inset-0">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full w-1 h-1"
          style={{ 
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%` 
          }}
          animate={{ 
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
      <div className="absolute inset-0 bg-blue-950/20 mix-blend-multiply" />
    </div>
  );
}

function CloudyEffect() {
  return (
    <div className="absolute inset-0">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/5 blur-[60px] rounded-full"
          style={{ 
            width: `${Math.random() * 40 + 30}%`,
            height: `${Math.random() * 30 + 20}%`,
            top: `${Math.random() * 60}%`,
            left: `${Math.random() * 100 - 20}%`
          }}
          animate={{ 
            x: ["-10%", "10%"]
          }}
          transition={{ 
            duration: Math.random() * 20 + 20, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

function SnowEffect() {
  return (
    <div className="absolute inset-0">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{ 
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            filter: "blur(1px)"
          }}
          initial={{ 
            top: -20, 
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3
          }}
          animate={{ 
            top: "110%",
            x: [0, 20, -20, 0]
          }}
          transition={{ 
            top: { duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" },
            x: { duration: Math.random() * 4 + 2, repeat: Infinity, ease: "easeInOut" },
            delay: Math.random() * 5 
          }}
        />
      ))}
      <div className="absolute inset-0 bg-blue-100/5 mix-blend-overlay" />
    </div>
  );
}

function FogEffect() {
  return (
    <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]">
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-t from-stone-400/20 to-transparent"
      />
    </div>
  );
}

function HotEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div 
        animate={{ 
          filter: ["blur(0px) brightness(1)", "blur(1px) brightness(1.1)", "blur(0px) brightness(1)"],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-amber-500/5 mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-orange-400/10 to-transparent" />
    </div>
  );
}

function WindyEffect() {
  return (
    <div className="absolute inset-0">
       {[...Array(10)].map((_, i) => (
        <motion.div
           key={i}
           className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
           style={{ 
             width: `${Math.random() * 300 + 100}px`,
             top: `${Math.random() * 100}%`,
             left: "-100%"
           }}
           animate={{ 
             left: "200%" 
           }}
           transition={{ 
             duration: Math.random() * 1 + 1, 
             repeat: Infinity, 
             ease: "linear",
             delay: Math.random() * 5 
           }}
        />
      ))}
    </div>
  );
}
