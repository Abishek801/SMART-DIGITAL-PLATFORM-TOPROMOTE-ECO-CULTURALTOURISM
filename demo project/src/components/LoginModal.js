"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { FaTimes, FaEnvelope, FaLock, FaUser, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LoginModal({ onClose }) {
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        name: mode === "register" ? name : undefined,
        isRegister: mode === "register" ? "true" : "false",
      });

      if (result.error) {
        setError(result.error);
      } else {
        router.refresh();
        onClose();
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass-panel w-full max-w-md relative p-8 md:p-12 animate-slide-up border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.5)] bg-slate-900/90"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-2"
        >
          <FaTimes size={20} />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2 font-heading tracking-tight">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-slate-400 text-sm">
            {mode === "login"
              ? "Experience sustainable travel at its best."
              : "Join the eco-travel revolution in India."}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-lg mb-6 text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "register" && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  className="input-glass pl-12 py-3.5 bg-white/5"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                className="input-glass pl-12 py-3.5 bg-white/5"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                className="input-glass pl-12 py-3.5 bg-white/5"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full py-4 mt-4 font-bold uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 transition-all"
            disabled={isSubmit}
          >
            {isSubmit
              ? "Authenticating..."
              : mode === "login"
                ? "Sign In"
                : "Sign Up Free"}
          </button>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative z-10 bg-slate-900 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
              Or continue with
            </span>
          </div>

          <button
            type="button"
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-all text-xs"
          >
            <FaGoogle className="mr-3 text-red-400" /> Google Account (coming
            soon)
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-white/5">
          <p className="text-sm text-slate-400 font-medium">
            {mode === "login"
              ? "New to EcoCulture? "
              : "Already have an account? "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors ml-1"
            >
              {mode === "login" ? "Create Account" : "Sign In instead"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
