"use client";

import { useRef, useEffect } from "react";
import { useMotionValue, useSpring, useTransform, useAnimation } from "framer-motion";

export type AntigravityMode = "tilt" | "magnetic" | "drop" | "bounce" | "float";

export interface AntigravityOptions {
  mode: AntigravityMode;
  // Tilt Options
  maxRotation?: number; // max tilt degrees (default: 15)
  perspective?: number; // perspective depth (default: 1000)
  resetOnLeave?: boolean; // smooth return to 0 (default: true)
  // Magnetic Options
  strength?: number; // 0 to 1 pull strength (default: 0.3)
  radius?: number; // interaction radius
  // Spring Physics Options
  stiffness?: number;
  damping?: number;
  mass?: number;
  // Drop Options
  delay?: number;
}

export function useAntigravity({
  mode,
  maxRotation = 15,
  perspective = 1000,
  resetOnLeave = true,
  strength = 0.3,
  stiffness = 150,
  damping = 15,
  mass = 1,
  delay = 0,
}: AntigravityOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Motion values for pointer tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tracking
  const springX = useSpring(mouseX, { stiffness, damping, mass });
  const springY = useSpring(mouseY, { stiffness, damping, mass });

  // Transforms for TILT mode (normalized from center of element)
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxRotation, -maxRotation]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxRotation, maxRotation]);

  // Transforms for MAGNETIC mode (px translation)
  const translateX = useTransform(springX, [-0.5, 0.5], [-100 * strength, 100 * strength]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-100 * strength, 100 * strength]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (mode === "tilt" || mode === "magnetic") {
        // Calculate relative position from center of element (-0.5 to 0.5)
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const normalizedX = (clientX - centerX) / rect.width;
        const normalizedY = (clientY - centerY) / rect.height;

        // Clamp values to prevent extreme stretching
        const clampedX = Math.max(-0.5, Math.min(0.5, normalizedX));
        const clampedY = Math.max(-0.5, Math.min(0.5, normalizedY));

        mouseX.set(clampedX);
        mouseY.set(clampedY);
      }
    };

    const handleMouseLeave = () => {
      if (resetOnLeave) {
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    if (mode === "tilt" || mode === "magnetic") {
      window.addEventListener("mousemove", handleMouseMove);
      if (ref.current) {
        ref.current.addEventListener("mouseleave", handleMouseLeave);
      }
    }

    if (mode === "drop") {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 120, damping: 14, delay: delay / 1000 },
      });
    }

    if (mode === "bounce") {
      controls.start({
        y: [0, -40, 0],
        scale: [1, 1.1, 1],
        transition: { type: "spring", stiffness: 200, damping: 10, mass: 1 },
      });
    }

    const currentRef = ref.current;
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (currentRef) {
        currentRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [mode, mouseX, mouseY, resetOnLeave, controls, delay]);

  // Return the calculated styles based on mode
  let style: any = {};
  
  if (mode === "tilt") {
    style = { perspective, rotateX, rotateY };
  } else if (mode === "magnetic") {
    style = { x: translateX, y: translateY };
  } else if (mode === "drop") {
    // Initial state for drop
    style = { y: -100, opacity: 0 };
  } else if (mode === "float") {
    // Rely on animate-float CSS class or apply distinct y variation
    style = {}; 
  }

  return { ref, style, controls, mouseX, mouseY, rotateX, rotateY };
}
