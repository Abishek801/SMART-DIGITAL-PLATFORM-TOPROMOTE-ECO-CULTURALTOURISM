"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Copy, Zap, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface DemoCredentialsProps {
  role: "TRAVELER" | "ADMIN";
  onAutoFill: (email: string, pass: string) => void;
}

export default function DemoCredentials({ role, onAutoFill }: DemoCredentialsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const isTraveler = role === "TRAVELER";
  const email = isTraveler ? "priya@example.com" : "admin@ecoculture.travel";
  const password = isTraveler ? "User@1234" : "Admin@1234";

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const roleStyles = isTraveler 
    ? {
        bg: "rgba(74, 139, 92, 0.06)",
        border: "rgba(74, 139, 92, 0.15)",
        text: "var(--t-light)",
        accent: "var(--t-primary)"
      }
    : {
        bg: "rgba(212, 168, 67, 0.06)",
        border: "rgba(212, 168, 67, 0.15)",
        text: "var(--a-light)",
        accent: "var(--a-primary)"
      };

  return (
    <div className="mb-6">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[12px] font-body transition-opacity hover:opacity-100 mb-2"
        style={{ color: roleStyles.text, opacity: isOpen ? 1 : 0.6 }}
      >
        <span>Try demo credentials</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={14} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div 
              className="p-4 rounded-2xl border mb-2 flex flex-col gap-3"
              style={{ backgroundColor: roleStyles.bg, borderColor: roleStyles.border }}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-mono uppercase tracking-widest opacity-50">Email</p>
                  <p className="text-sm font-mono text-white tracking-tight">{email}</p>
                </div>
                <button 
                  type="button"
                  onClick={() => copyToClipboard(email, "Email")}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-stone-400 hover:text-white"
                >
                  {copiedField === "Email" ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-mono uppercase tracking-widest opacity-50">Password</p>
                  <p className="text-sm font-mono text-white tracking-tight">{password}</p>
                </div>
                <button 
                  type="button"
                  onClick={() => copyToClipboard(password, "Password")}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-stone-400 hover:text-white"
                >
                  {copiedField === "Password" ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
              </div>

              <button
                type="button"
                onClick={() => onAutoFill(email, password)}
                className="w-full h-10 mt-2 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all hover:scale-[0.98] active:scale-95"
                style={{ backgroundColor: roleStyles.accent, color: isTraveler ? "white" : "black" }}
              >
                <Zap size={14} fill={isTraveler ? "white" : "black"} />
                Auto-fill & Proceed
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
