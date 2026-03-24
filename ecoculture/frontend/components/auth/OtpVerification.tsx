"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface OtpVerificationProps {
  email: string;
  onVerify: (code: string, trustDevice: boolean) => Promise<void>;
  onResend: () => Promise<void>;
}

export default function OtpVerification({ email, onVerify, onResend }: OtpVerificationProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [trustDevice, setTrustDevice] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join("");
    if (fullCode.length < 6) {
      toast.error("Please enter the full 6-digit code");
      return;
    }

    setLoading(true);
    try {
      await onVerify(fullCode, trustDevice);
    } catch (err: any) {
      toast.error(err.message || "Invalid verification code");
      // Clear code on error
      setCode(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setLoading(true);
    try {
      await onResend();
      setTimer(60);
      setCanResend(false);
      toast.success("New code sent to your email");
    } catch (err) {
      toast.error("Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-leaf/10 rounded-2xl flex items-center justify-center text-leaf mx-auto mb-6 border border-leaf/20 shadow-[0_0_20px_rgba(74,139,92,0.1)]">
          <Shield size={32} />
        </div>
        <h2 className="font-display text-3xl text-white mb-2 tracking-tight">Identify Yourself</h2>
        <p className="font-body text-stone-400 text-sm">
          A security code was sent to <span className="text-white font-medium">{email}</span>
        </p>
      </div>

      <div className="flex justify-between gap-3 mb-8">
        {code.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-full aspect-square bg-white/5 border border-white/10 rounded-xl text-center text-2xl font-display text-white focus:outline-none focus:border-leaf focus:ring-1 focus:ring-leaf/40 transition-all shadow-inner"
            disabled={loading}
          />
        ))}
      </div>

      <div 
        className="flex items-center gap-3 mb-8 px-2 cursor-pointer group select-none" 
        onClick={() => setTrustDevice(!trustDevice)}
      >
        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-300 ${trustDevice ? 'bg-leaf border-leaf shadow-[0_0_10px_rgba(74,139,92,0.3)]' : 'border-white/20 group-hover:border-white/40 bg-white/5'}`}>
          {trustDevice && <CheckCircle2 size={12} className="text-white" />}
        </div>
        <span className="text-xs text-stone-500 group-hover:text-stone-300 transition-colors">Trust this device for 30 days</span>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || code.some(d => !d)}
        className="w-full h-14 bg-white text-ink font-heading font-bold rounded-pill flex items-center justify-center gap-3 hover:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 mb-6 group shadow-xl"
      >
        {loading ? (
          <RefreshCw className="animate-spin" size={20} />
        ) : (
          <>
            Verify Account
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <div className="text-center">
        <button
          onClick={handleResend}
          disabled={!canResend || loading}
          className={`font-mono text-[10px] tracking-widest uppercase transition-all duration-300 ${canResend ? "text-leaf hover:text-white" : "text-stone-600 cursor-not-allowed"}`}
        >
          {canResend ? "Resend New Code" : `Resend available in ${timer}s`}
        </button>
      </div>

      <div className="mt-12 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-3 backdrop-blur-sm">
        <AlertCircle className="text-amber-500 shrink-0" size={18} />
        <p className="text-[11px] text-stone-500 font-body leading-relaxed">
          For your safety, EcoCulture requires two-factor authentication for all administrative actions and high-value transactions. This helps protect your impact and identity.
        </p>
      </div>
    </div>
  );
}
