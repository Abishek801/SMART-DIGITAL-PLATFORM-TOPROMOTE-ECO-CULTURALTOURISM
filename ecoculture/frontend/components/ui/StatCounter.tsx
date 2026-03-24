"use client";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { MapPin, Users, Leaf, Wind } from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={20} />,
  Users: <Users size={20} />,
  Leaf: <Leaf size={20} />,
  Wind: <Wind size={20} />,
};

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  decimals?: number;
}

function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 30, stiffness: 80 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals);
      }
    });
  }, [spring, decimals]);

  return <span ref={ref}>0</span>;
}

export default function StatCounter({ stat, index }: { stat: Stat; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="text-center"
    >
      <div className="w-10 h-10 rounded-xl bg-forest-900/60 border border-forest-700/30 flex items-center justify-center text-forest-400 mx-auto mb-3">
        {ICONS[stat.icon]}
      </div>
      <div className="font-display text-3xl font-bold text-stone-100">
        <AnimatedNumber value={stat.value} decimals={stat.decimals} />
        {stat.suffix}
      </div>
      <p className="text-stone-500 text-sm font-body mt-1">{stat.label}</p>
    </motion.div>
  );
}
