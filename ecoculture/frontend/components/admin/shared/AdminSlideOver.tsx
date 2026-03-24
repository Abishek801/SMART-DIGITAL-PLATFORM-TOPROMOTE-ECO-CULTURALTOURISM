"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AdminSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function AdminSlideOver({ isOpen, onClose, title, children }: AdminSlideOverProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[640px] bg-[#111113] border-l border-[#27272A] z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-[#27272A] bg-[#0D0D0F]">
               <h2 className="text-lg font-bold text-white font-display tracking-tight">{title}</h2>
               <button 
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#18181B] text-stone-500 hover:text-white transition-all"
               >
                  <X size={20} />
               </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-stone-800">
               {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
