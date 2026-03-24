import React from "react";

interface SkeletonCardProps {
  variant?: "shop" | "destination" | "small";
  className?: string;
}

export default function SkeletonCard({ variant = "shop", className = "" }: SkeletonCardProps) {
  const heights: Record<string, string> = {
    shop: "h-64",
    destination: "h-80",
    small: "h-48",
  };

  return (
    <div className={`bg-ink-soft border border-white/5 rounded-card overflow-hidden animate-pulse ${className}`}>
      {/* Image area */}
      <div className={`w-full bg-white/5 ${heights[variant]}`} />
      {/* Content area */}
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/5 rounded-full w-3/4" />
        <div className="h-3 bg-white/5 rounded-full w-1/2" />
        <div className="flex gap-2 mt-4">
          <div className="h-5 w-16 bg-white/5 rounded-full" />
          <div className="h-5 w-12 bg-white/5 rounded-full" />
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-white/5">
          <div className="h-6 w-20 bg-white/5 rounded-full" />
          <div className="h-9 w-9 bg-white/5 rounded-full" />
        </div>
      </div>
    </div>
  );
}
