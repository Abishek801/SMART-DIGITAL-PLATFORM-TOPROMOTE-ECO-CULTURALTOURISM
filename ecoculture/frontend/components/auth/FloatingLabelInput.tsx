"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, LucideIcon } from "lucide-react";

interface FloatingLabelInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  error?: string;
  required?: boolean;
  role: "TRAVELER" | "ADMIN";
  autoComplete?: string;
}

export default function FloatingLabelInput({
  label,
  type = "text",
  value,
  onChange,
  icon: Icon,
  error,
  required,
  role,
  autoComplete
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const currentType = isPassword ? (showPassword ? "text" : "password") : type;

  const isFloating = isFocused || value.length > 0;

  const roleColor = role === "TRAVELER" ? "var(--t-primary)" : "var(--a-primary)";
  const roleGlow = role === "TRAVELER" ? "var(--t-glow)" : "var(--a-glow)";
  const roleBorderFocus = role === "TRAVELER" ? "rgba(74, 139, 92, 0.5)" : "rgba(212, 168, 67, 0.5)";

  return (
    <div className="relative mb-6">
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-colors duration-200"
               style={{ color: isFocused ? roleColor : "rgba(255,255,255,0.2)" }}>
            <Icon size={18} strokeWidth={1.5} />
          </div>
        )}

        <label
          className="absolute left-12 pointer-events-none transition-all duration-200 ease-out z-10"
          style={{
            top: isFloating ? "10px" : "50%",
            transform: isFloating ? "none" : "translateY(-50%)",
            fontSize: isFloating ? "10px" : "14px",
            color: isFocused ? roleColor : "rgba(255,255,255,0.3)",
            letterSpacing: isFloating ? "0.05em" : "normal",
            fontFamily: "var(--font-satoshi), sans-serif",
            fontWeight: isFloating ? 600 : 400,
            textTransform: isFloating ? "uppercase" : "none"
          }}
        >
          {label}
        </label>

        <input
          required={required}
          type={currentType}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete={autoComplete}
          className="w-full h-[64px] bg-white/[0.03] border border-white/10 rounded-2xl px-12 pt-6 pb-2 text-white font-body text-base outline-none transition-all duration-200"
          style={{
            borderColor: error ? "rgba(239, 68, 68, 0.5)" : (isFocused ? roleBorderFocus : "rgba(255,255,255,0.1)"),
            boxShadow: isFocused ? `0 0 0 4px ${roleGlow}` : "none"
          }}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-600 hover:text-white transition-colors z-10"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-[11px] text-red-500 mt-1.5 ml-4 font-body font-medium flex items-center gap-1.5"
          >
            <span className="w-1 h-1 rounded-full bg-red-500" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
