"use client";

import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain, Zap, Snowflake, CloudFog, Thermometer, Wind, Droplets } from "lucide-react";
import { WeatherCondition } from "./WeatherAnimations";

interface WeatherWidgetProps {
  data: {
    temp: number;
    condition: WeatherCondition;
    description: string;
    humidity: number;
    windSpeed: number;
    locationName: string;
  };
  size?: "small" | "medium" | "large";
}

const CONDITION_ICONS: Record<string, React.ReactNode> = {
  CLEAR_DAY: <Sun className="text-amber-400" />,
  CLEAR_NIGHT: <Sun className="text-blue-300 opacity-50" />, // Moonlight
  CLOUDY: <Cloud className="text-stone-400" />,
  RAIN: <CloudRain className="text-blue-400" />,
  THUNDERSTORM: <Zap className="text-amber-300" />,
  SNOW: <Snowflake className="text-white" />,
  FOG: <CloudFog className="text-stone-300" />,
  HOT: <Thermometer className="text-red-400" />,
  COLD: <Thermometer className="text-blue-200" />,
  WINDY: <Wind className="text-stone-200" />
};

export default function WeatherWidget({ data, size = "medium" }: WeatherWidgetProps) {
  const Icon = CONDITION_ICONS[data.condition] || <Cloud />;

  if (size === "small") {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="scale-75">{Icon}</div>
        <span className="text-white font-mono text-sm leading-none">{data.temp}°C</span>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass border border-white/10 rounded-2xl overflow-hidden ${size === 'large' ? 'p-8 min-w-[300px]' : 'p-5 min-w-[200px]'}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-stone-500 font-mono text-[10px] uppercase tracking-widest mb-1">Local Climate</p>
          <h4 className="text-white font-display text-lg leading-tight">{data.locationName}</h4>
        </div>
        <div className="text-clay scale-110">
          {Icon}
        </div>
      </div>

      <div className="flex items-end gap-3 mb-6">
        <span className="text-4xl md:text-5xl font-display text-white">{data.temp}°</span>
        <div className="pb-1.5 flex flex-col">
          <span className="text-xs text-white capitalize">{data.description}</span>
          <span className="text-[10px] text-stone-500 font-mono uppercase tracking-tighter">Feels like {data.temp + 1}°</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-5">
        <div className="flex items-center gap-2">
          <Droplets size={14} className="text-blue-400 opacity-60" />
          <div className="flex flex-col">
            <span className="text-[9px] text-stone-600 font-mono uppercase">Humidity</span>
            <span className="text-xs text-white font-mono">{data.humidity}%</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind size={14} className="text-stone-400 opacity-60" />
          <div className="flex flex-col">
            <span className="text-[9px] text-stone-600 font-mono uppercase">Wind</span>
            <span className="text-xs text-white font-mono">{data.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
