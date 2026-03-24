"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CreditCard, Leaf, Package, Shield, Truck, Trees, X } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/useCartStore";
import { AntigravityCard } from "@/components/ui/AntigravityCard";
import SmartImage from "@/components/ui/SmartImage";
import { getProductImage } from "@/lib/images";

// ─── Luhn Algorithm ──────────────────────────────────────────────────────────
function luhnCheck(num: string): boolean {
  const digits = num.replace(/\D/g, "");
  let sum = 0;
  let isEven = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (isEven) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

function formatCardNumber(value: string): string {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length > 2) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

export default function CheckoutPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const { items, removeItem, updateQty, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState<"CARD" | "UPI" | "COD">("CARD");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardError, setCardError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const total = mounted ? items.reduce((sum, item) => sum + item.price * item.qty, 0) : 0;
  // Bug 6 Fix: Eco rebate = 5% of total, capped at ₹500
  const ecoRebate = Math.min(Math.round(total * 0.05), 500);
  const finalTotal = Math.max(total - ecoRebate, 0);

  // Bug 7 Fix: Validate card before purchase
  // Bug 7 Fix: Validate card before purchase
  const handlePurchase = async () => {
    setCardError(null);
    
    if (paymentMethod === "CARD") {
      const rawCard = cardNumber.replace(/\s/g, "");
      if (!cardName.trim()) { setCardError("Please enter cardholder name."); return; }
      if (rawCard.length < 16 || !luhnCheck(rawCard)) { setCardError("Invalid card number."); return; }
      const [mm, yy] = expiry.split("/");
      const now = new Date();
      const expDate = new Date(2000 + parseInt(yy || "0"), parseInt(mm || "0") - 1);
      if (!mm || !yy || expDate <= now) { setCardError("Card has expired or expiry is invalid."); return; }
      if (cvc.replace(/\D/g, "").length < 3) { setCardError("Invalid CVC."); return; }
    } else if (paymentMethod === "UPI") {
      if (!upiId.includes("@") || upiId.length < 5) {
        setCardError("Please enter a valid UPI ID (e.g., name@okhdfcbank)."); return;
      }
    }

    setIsProcessing(true);
    try {
      const orderPayload = {
        items: items.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
        total: finalTotal,
        paymentMethod: paymentMethod
      };

      const res = await fetch("/api/users/me/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload)
      });

      if (!res.ok) throw new Error("Failed to save order");

      setStep(3);
      setTimeout(() => clearCart(), 1000);
    } catch (err) {
      setCardError("System error during checkout. Please try again or contact support.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-ink pt-24 pb-32">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Progress Bar Header */}
        <div className="flex items-center justify-center mb-16 relative">
           <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/2 md:w-1/3 h-px bg-white/10 z-0" />
           <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/2 md:w-1/3 h-px bg-leaf z-0 transition-transform duration-1000 origin-left ${step === 1 ? 'scale-x-0' : step === 2 ? 'scale-x-50' : 'scale-x-100'}`} />
           
           <div className="w-full max-w-lg flex justify-between relative z-10 px-4">
             {["Review Cart", "Payment", "Carbon Offset"].map((label, i) => (
               <div key={label} className="flex flex-col items-center gap-3">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors duration-500 border ${step > i + 1 ? "bg-leaf text-ink border-leaf" : step === i + 1 ? "bg-ink border-leaf text-leaf shadow-[0_0_15px_rgba(74,139,92,0.5)]" : "bg-ink border-white/10 text-stone-500"}`}>
                   {step > i + 1 ? <CheckCircle2 size={14} /> : i + 1}
                 </div>
                 <span className={`font-mono text-[10px] tracking-widest uppercase ${step >= i + 1 ? "text-white" : "text-stone-600"}`}>{label}</span>
               </div>
             ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: CART */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col lg:flex-row gap-12">
              <div className="w-full lg:w-2/3">
                <h2 className="font-display text-4xl font-light text-white mb-8">Your Selections</h2>
                {items.length === 0 ? (
                  <div className="glass rounded-panel p-12 text-center border border-white/5">
                    <Package size={32} className="mx-auto text-stone-500 mb-4" />
                    <p className="font-body text-stone-400 mb-6">Your artisan marketplace cart is empty.</p>
                    <Link href="/shop" className="h-12 px-8 rounded-pill bg-white text-ink inline-flex items-center justify-center font-heading font-medium">Return to Shop</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="glass p-4 md:p-6 rounded-2xl flex items-center gap-6 border border-white/5">
                        <div className="w-20 h-20 md:w-24 md:h-24 shrink-0">
                          <SmartImage 
                            src={getProductImage(item.id.toString())} 
                            alt={item.name} 
                            aspectRatio="square"
                            className="rounded-xl" 
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-display font-medium text-white text-lg">{item.name}</h4>
                          <p className="text-stone-500 font-mono text-xs uppercase tracking-widest mb-3">{item.artisan}</p>
                          <div className="flex items-center gap-4">
                            <span className="font-heading font-bold text-white">₹{item.price.toLocaleString()}</span>
                            <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 text-stone-400 hover:text-white">-</button>
                            <span className="font-mono text-xs text-white">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 text-stone-400 hover:text-white">+</button>
                          </div>
                        </div>
                        {/* Bug 2 Fix: Use X from lucide-react */}
                        <button onClick={() => removeItem(item.id)} className="text-stone-600 hover:text-red-400 p-2"><X size={16} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-full lg:w-1/3">
                <div className="sticky top-32 glass rounded-panel p-8 border border-white/5">
                  <h3 className="font-display text-2xl text-white mb-6">Summary</h3>
                  <div className="space-y-4 mb-6 text-sm font-body text-stone-300">
                    <div className="flex justify-between"><span>Subtotal</span><span className="font-mono">₹{total.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Shipping (Eco-Saver)</span><span className="font-mono text-stone-500">Free</span></div>
                    <div className="flex justify-between text-leaf">
                      <span className="flex items-center gap-2"><Leaf size={14} /> Eco Rebate (5%)</span>
                      <span className="font-mono">-₹{ecoRebate.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-end">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Total</span>
                    <span className="font-display text-3xl text-white">₹{finalTotal.toLocaleString()}</span>
                  </div>
                  <button onClick={() => items.length > 0 && setStep(2)} disabled={items.length === 0} className="w-full h-14 bg-white text-ink font-heading font-bold rounded-pill hover:scale-[0.98] transition-transform disabled:opacity-50">Proceed to Payment</button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col lg:flex-row gap-16">
              <div className="w-full lg:w-1/2">
                <button onClick={() => setStep(1)} className="text-stone-500 hover:text-white font-mono text-xs tracking-widest uppercase mb-8 flex items-center gap-2 transition-colors">← Back to Cart</button>
                <h2 className="font-display text-4xl font-light text-white mb-8">Secure Checkout</h2>
                
                {/* Payment Method Selector */}
                <div className="flex gap-4 mb-8">
                  <button onClick={() => setPaymentMethod("CARD")} className={`flex-1 p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === "CARD" ? "border-clay bg-clay/10 text-clay" : "border-white/10 bg-white/5 text-stone-400 hover:bg-white/10"}`}>
                    <CreditCard size={24} />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider">Card</span>
                  </button>
                  <button onClick={() => setPaymentMethod("UPI")} className={`flex-1 p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === "UPI" ? "border-clay bg-clay/10 text-clay" : "border-white/10 bg-white/5 text-stone-400 hover:bg-white/10"}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13.88 16.12L12 18L5.88 11.88C5.39 11.39 5.39 10.61 5.88 10.12L7.76 8.24L11.53 12L13.88 9.65L17.65 13.41L15.76 15.29C15.24 15.81 14.4 15.81 13.88 16.12Z"/></svg>
                    <span className="text-xs font-bold font-mono uppercase tracking-wider">UPI / Apps</span>
                  </button>
                  <button onClick={() => setPaymentMethod("COD")} className={`flex-1 p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === "COD" ? "border-clay bg-clay/10 text-clay" : "border-white/10 bg-white/5 text-stone-400 hover:bg-white/10"}`}>
                    <Package size={24} />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider">Cash</span>
                  </button>
                </div>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handlePurchase(); }}>
                  
                  {paymentMethod === "CARD" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
                      {/* Cardholder Name */}
                      <div className="relative group">
                        <input required type="text" value={cardName} onChange={e => setCardName(e.target.value)} placeholder=" " className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white font-body focus:outline-none focus:border-clay transition-colors placeholder-transparent" />
                        <label className="absolute left-0 top-3 text-stone-500 font-body text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-clay">Cardholder Name</label>
                      </div>
                      {/* Card Number with formatting */}
                      <div className="relative group">
                        <input required type="text" value={cardNumber}
                          onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                          placeholder=" " className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white font-body focus:outline-none focus:border-clay transition-colors placeholder-transparent font-mono tracking-widest" maxLength={19} />
                        <label className="absolute left-0 top-3 text-stone-500 font-body text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-clay">Card Number</label>
                        <CreditCard size={16} className="absolute right-0 top-4 text-stone-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        {/* Expiry with auto MM/YY formatting */}
                        <div className="relative group">
                          <input required type="text" value={expiry}
                            onChange={e => setExpiry(formatExpiry(e.target.value))}
                            placeholder=" " className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white font-body focus:outline-none focus:border-clay transition-colors placeholder-transparent font-mono" maxLength={5} />
                          <label className="absolute left-0 top-3 text-stone-500 font-body text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-clay">Expiry (MM/YY)</label>
                        </div>
                        {/* CVC - digits only */}
                        <div className="relative group">
                          <input required type="text" value={cvc}
                            onChange={e => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            placeholder=" " className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white font-body focus:outline-none focus:border-clay transition-colors placeholder-transparent font-mono" maxLength={4} />
                          <label className="absolute left-0 top-3 text-stone-500 font-body text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-clay">CVC</label>
                          <Shield size={16} className="absolute right-0 top-4 text-stone-500" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === "UPI" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                       <div className="p-4 rounded-xl border border-clay/20 bg-clay/5 text-clay text-sm flex items-start gap-3">
                          <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
                          <p>You can pay via Google Pay, PhonePe, Paytm, or any UPI app. Approve the request on your phone after clicking Pay.</p>
                       </div>
                       <div className="relative group">
                         <input required type="text" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder=" " className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white font-body focus:outline-none focus:border-clay transition-colors placeholder-transparent" />
                         <label className="absolute left-0 top-3 text-stone-500 font-body text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-clay">Enter UPI ID (e.g. name@okhdfcbank)</label>
                       </div>
                    </motion.div>
                  )}

                  {paymentMethod === "COD" && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="p-6 rounded-xl border border-white/10 bg-white/5 flex flex-col items-center text-center">
                          <Truck size={32} className="text-stone-400 mb-4"/>
                          <h3 className="text-white font-bold text-lg mb-2">Pay on Delivery</h3>
                          <p className="text-stone-400 text-sm">Please keep exact change ready. You can pay via Cash or UPI QR dynamically right to the courier executive.</p>
                        </div>
                     </motion.div>
                  )}

                  {cardError && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-400 text-sm font-body bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                      <X size={14} className="shrink-0" />
                      {cardError}
                    </motion.div>
                  )}
                  
                  <div className="pt-8">
                    <button type="submit" disabled={isProcessing} className="w-full h-14 bg-clay text-ink font-heading font-bold rounded-pill shadow-[0_0_20px_rgba(196,132,90,0.3)] hover:scale-[0.98] transition-transform disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2">
                      {isProcessing ? (
                        <div className="w-5 h-5 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                      ) : (
                        paymentMethod === "COD" ? "Place Order & Plant a Tree" : `Pay ₹${finalTotal.toLocaleString()} & Plant a Tree`
                      )}
                    </button>
                  </div>
                </form>
              </div>

              <div className="w-full lg:w-1/2 flex items-center justify-center min-h-[400px]">
                {paymentMethod === "CARD" && (
                 <div className="w-full max-w-[420px] aspect-[1.58] perspective-[2000px]">
                   <AntigravityCard mode="tilt" maxRotation={15} perspective={2000} className="w-full h-full">
                     <div className="w-full h-full rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-[20px_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl border border-white/10"
                          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%), rgba(20,20,20,0.8)" }}>
                       <div className="absolute top-0 left-0 w-full h-[150%] bg-gradient-to-tr from-white/10 to-transparent -rotate-45 -translate-y-1/4 translate-x-1/3 pointer-events-none" />
                       <div className="flex justify-between items-start relative z-10">
                         <Chip />
                         <span className="font-display font-bold text-white tracking-widest text-xl opacity-80">EcoCulture</span>
                       </div>
                       <div className="relative z-10 text-white/50 font-mono tracking-[0.2em] text-lg md:text-2xl pt-8">
                         {cardNumber || "**** **** **** ****"}
                       </div>
                       <div className="flex justify-between items-end relative z-10 font-mono text-xs text-white/60 tracking-widest uppercase">
                         <div className="flex flex-col">
                           <span className="text-[8px] mb-1">Cardholder</span>
                           <span>{cardName || "Conscious Traveler"}</span>
                         </div>
                         <div className="flex flex-col items-end">
                           <span className="text-[8px] mb-1">Valid Thru</span>
                           <span>{expiry || "MM/YY"}</span>
                         </div>
                       </div>
                     </div>
                   </AntigravityCard>
                 </div>
                )}
                {paymentMethod === "UPI" && (
                  <div className="w-full max-w-[300px] aspect-square rounded-3xl border border-white/10 bg-white/5 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-clay/10 to-transparent opacity-50"/>
                     <div className="w-32 h-32 bg-white rounded-xl mb-6 flex items-center justify-center relative z-10 p-2 shadow-2xl shadow-clay/20">
                        {/* Fake QR code pattern */}
                        <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-1 opacity-80 mix-blend-multiply filter blur-[0.5px]">
                          {[...Array(16)].map((_, i) => <div key={i} className="bg-stone-800 rounded-sm" style={{ opacity: Math.random() > 0.3 ? 1 : 0 }}/>)}
                        </div>
                     </div>
                     <p className="text-white font-bold relative z-10">Scan to Pay</p>
                     <p className="text-stone-400 text-sm mt-2 relative z-10">Use any UPI app</p>
                  </div>
                )}
                {paymentMethod === "COD" && (
                  <div className="w-full max-w-[300px] aspect-square rounded-3xl border border-white/10 bg-[#0E1410] flex flex-col items-center justify-center p-8 text-center shadow-2xl">
                     <div className="w-20 h-20 rounded-full bg-leaf/20 flex items-center justify-center text-leaf mb-6">
                        <Truck size={40} />
                     </div>
                     <p className="text-white font-bold text-xl font-display mb-2">Zero-Carbon Reach</p>
                     <p className="text-stone-500 text-sm">Your order stays secure. Pay effortlessly upon delivery.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-20">
               <div className="relative w-64 h-64 mb-10 flex items-center justify-center">
                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 100, damping: 10 }}
                   className="w-32 h-32 rounded-full bg-leaf/20 flex items-center justify-center border-2 border-leaf/50 overflow-hidden relative">
                   <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
                     <Trees size={60} className="text-leaf fill-leaf/30" strokeWidth={1.5} />
                   </motion.div>
                 </motion.div>
                 {[...Array(3)].map((_, i) => (
                   <motion.div key={i} initial={{ scale: 0.8, opacity: 1 }} animate={{ scale: 2 + i * 0.5, opacity: 0 }}
                     transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
                     className="absolute inset-0 rounded-full border border-leaf/30 pointer-events-none" />
                 ))}
               </div>
               <h2 className="font-display text-5xl font-light text-white mb-6">Seeds Planted.</h2>
               <p className="font-body text-stone-400 text-lg max-w-md mx-auto mb-10">
                 Thank you for your conscious purchase. A tree is being planted in the Western Ghats under your name to offset dispatch emissions.
               </p>
               <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur max-w-sm mx-auto mb-12 flex items-center gap-4 text-left">
                 <Truck className="text-stone-400" size={24} />
                 <div>
                   <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-1">Zero-Carbon Dispatch</h4>
                   <p className="font-body text-sm text-stone-500">Arriving via electric courier in 3-5 days.</p>
                 </div>
               </div>
               <Link href="/dashboard" className="h-14 px-10 rounded-pill border border-white/20 bg-white/5 text-white inline-flex items-center justify-center font-heading font-medium hover:bg-white/10 transition-colors">
                 Track Impact & Deliveries
               </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Chip() {
  return (
    <svg width="45" height="30" viewBox="0 0 45 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
      <rect x="0.5" y="0.5" width="44" height="29" rx="3.5" stroke="rgba(255,255,255,0.4)" fill="rgba(255,255,255,0.1)"/>
      <path d="M15 0.5V29.5" stroke="rgba(255,255,255,0.4)"/>
      <path d="M30 0.5V29.5" stroke="rgba(255,255,255,0.4)"/>
      <path d="M0.5 15H44.5" stroke="rgba(255,255,255,0.4)"/>
    </svg>
  );
}
