"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store/useCartStore";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { isCartOpen, setCartOpen, items, updateQty, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch for persisted states
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-stone-950 border-l border-forest-900/30 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-forest-900/20 glass-dark">
              <h2 className="font-display text-xl font-bold text-stone-100 flex items-center gap-2">
                <ShoppingBag size={20} className="text-forest-400" /> My Cart
                <span className="text-sm font-body font-normal text-stone-500 bg-forest-900/30 px-2 py-0.5 rounded-full border border-forest-800/30">
                  {items.length} items
                </span>
              </h2>
              <button 
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-900 text-stone-400 hover:text-white hover:bg-forest-900/60 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-stone-600">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-stone-200">Your cart is empty</h3>
                    <p className="text-stone-500 text-sm font-body mt-1 max-w-[200px] mx-auto">Explore our eco-friendly products and support local artisans.</p>
                  </div>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="btn-outline mt-4"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      key={item.id} 
                      className="flex gap-4 p-4 rounded-xl glass border-transparent hover:border-forest-800/40 transition-colors"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-body font-semibold text-stone-200 text-sm leading-tight hover:text-forest-300 transition-colors cursor-pointer">{item.name}</h4>
                            <p className="text-stone-500 text-[11px] mt-0.5">{item.artisan}</p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-stone-600 hover:text-red-400 mt-0.5 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center bg-stone-900 rounded-lg border border-forest-900/30 overflow-hidden">
                            <button 
                              onClick={() => updateQty(item.id, -1)}
                              className="px-2.5 py-1 text-stone-400 hover:text-white hover:bg-forest-900/60 transition-colors"
                            >-</button>
                            <span className="text-xs font-semibold font-body min-w-[24px] text-center">{item.qty}</span>
                            <button 
                              onClick={() => updateQty(item.id, 1)}
                              className="px-2.5 py-1 text-stone-400 hover:text-white hover:bg-forest-900/60 transition-colors"
                            >+</button>
                          </div>
                          <div className="font-display font-bold text-stone-200 text-sm">
                            ₹{(item.price * item.qty).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 glass-dark border-t border-forest-900/30 bg-stone-950/80 backdrop-blur-md">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="text-stone-400 text-sm font-body">Subtotal</span>
                    <p className="text-[10px] text-stone-500 mt-0.5">Shipping & taxes calculated at checkout</p>
                  </div>
                  <span className="font-display font-bold text-xl text-stone-100">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <Link 
                  href="/checkout" 
                  onClick={() => setCartOpen(false)}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
