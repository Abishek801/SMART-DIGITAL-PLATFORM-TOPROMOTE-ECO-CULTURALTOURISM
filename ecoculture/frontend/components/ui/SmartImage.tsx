"use client";

import { useState, useCallback } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SmartImageProps extends Omit<ImageProps, "src"> {
  src: string;
  fallbackSrc?: string;
  fallbackGradient?: string;
  showSkeleton?: boolean;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide" | "hero";
  objectFit?: "cover" | "contain" | "fill";
  hoverZoom?: boolean;
  category?: string; // used to generate fallback gradient
}

// Generate consistent gradient from string
function stringToGradient(str: string): string {
  const gradients = [
    "linear-gradient(135deg, #1C3829 0%, #2D5A3D 50%, #4A8B5C 100%)",
    "linear-gradient(135deg, #2D5A3D 0%, #8B5E3C 50%, #C4845A 100%)",
    "linear-gradient(135deg, #1C3829 0%, #1A1A1A 50%, #2D5A3D 100%)",
    "linear-gradient(135deg, #8B5E3C 0%, #C4845A 50%, #E8D5B7 100%)",
    "linear-gradient(135deg, #4A8B5C 0%, #2D5A3D 50%, #1C3829 100%)",
    "linear-gradient(135deg, #D4A843 0%, #8B5E3C 50%, #1C3829 100%)",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

// Aspect ratio map
const ASPECT_RATIOS = {
  square:    "aspect-square",
  portrait:  "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide:      "aspect-[16/9]",
  hero:      "aspect-[21/9]",
};

// Fallback icon per category
const CATEGORY_ICONS: Record<string, string> = {
  ECO_VILLAGE:  "🌿",
  CULTURE:      "🏛",
  TREKKING:     "⛰",
  NATURE:       "🌲",
  WILDLIFE:     "🐯",
  BEACH:        "🏖",
  FOOD:         "🍵",
  CLOTHING:     "🧵",
  HOME_DECOR:   "🪴",
  ACCESSORIES:  "👜",
  WELLNESS:     "💆",
  default:      "🌍",
};

export default function SmartImage({
  src,
  fallbackSrc,
  fallbackGradient,
  showSkeleton = true,
  aspectRatio = "landscape",
  objectFit = "cover",
  hoverZoom = false,
  category = "default",
  alt = "",
  className = "",
  ...props
}: SmartImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [currentSrc, setCurrentSrc] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);

  const handleLoad = useCallback(() => {
    setStatus("loaded");
  }, []);

  const handleError = useCallback(() => {
    if (!triedFallback && fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setTriedFallback(true);
      setStatus("loading");
    } else {
      setStatus("error");
    }
  }, [triedFallback, fallbackSrc]);

  const gradient = fallbackGradient || stringToGradient(alt || src || category);
  const icon = CATEGORY_ICONS[category] || CATEGORY_ICONS.default;

  return (
    <div
      className={`relative overflow-hidden ${aspectRatio ? ASPECT_RATIOS[aspectRatio] : ""} ${className}`}
    >
      {/* SKELETON LOADING STATE */}
      <AnimatePresence>
        {status === "loading" && showSkeleton && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(90deg, #1A1A1A 25%, #242424 50%, #1A1A1A 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s ease-in-out infinite",
            }}
          />
        )}
      </AnimatePresence>

      {/* ERROR / FALLBACK STATE */}
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
          style={{ background: gradient }}
        >
          <span className="text-4xl mb-2 opacity-60">{icon}</span>
          <span className="text-white/40 text-xs font-body text-center px-4">
            {alt || "Image unavailable"}
          </span>
        </motion.div>
      )}

      {/* ACTUAL IMAGE */}
      {status !== "error" && (
        <motion.div
          className="absolute inset-0"
          whileHover={hoverZoom ? { scale: 1.06 } : undefined}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src={currentSrc}
            alt={alt}
            fill
            className={`
              object-${objectFit}
              transition-opacity duration-500
              ${status === "loaded" ? "opacity-100" : "opacity-0"}
            `}
            onLoad={handleLoad}
            onError={handleError}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
            sizes={
              props.sizes ||
              "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            {...props}
          />
        </motion.div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
