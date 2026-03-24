"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Role } from "@/lib/constants";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { Mail, Lock, ArrowRight, Shield, ShoppingBag, MapPin, Compass, Github, XCircle, CheckCircle2 } from "lucide-react";

// Custom Components
import TravelerPanel from "@/components/auth/TravelerPanel";
import AdminPanel from "@/components/auth/AdminPanel";
import RoleToggle from "@/components/auth/RoleToggle";
import FloatingLabelInput from "@/components/auth/FloatingLabelInput";
import DemoCredentials from "@/components/auth/DemoCredentials";
import SvgDivider from "@/components/auth/SvgDivider";
import OtpVerification from "@/components/auth/OtpVerification";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [role, setRole] = useState<"TRAVELER" | "ADMIN">("TRAVELER");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingRedirect, setPendingRedirect] = useState(false);

  // 2FA / OTP State
  const [showOtp, setShowOtp] = useState(false);
  const [tempPass, setTempPass] = useState("");

  // Watch for session to become authenticated after signIn(), then redirect
  useEffect(() => {
    if (pendingRedirect && status === "authenticated" && session?.user) {
      const userRole = (session.user as any).role as string | undefined;
      const dashboardMap: Record<string, string> = {
        SUPER_ADMIN: "/super-admin/dashboard",
        ADMIN: "/admin",
        GUIDE: "/guide/dashboard",
        ARTISAN: "/artisan/studio",
        TRAVELER: "/dashboard",
      };
      router.push(dashboardMap[userRole ?? ""] || "/dashboard");
      setPendingRedirect(false);
    }
  }, [session, status, pendingRedirect, router]);

  const handleRoleChange = (newRole: "TRAVELER" | "ADMIN") => {
    setRole(newRole);
    setError(null);
  };

  const handleAutoFill = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!result) {
        throw new Error("No response from authentication provider.");
      }

      if (result.error) {
        // Intercept the special 2FA error code thrown by auth.ts authorize()
        if (result.error === "REQUIRES_2FA") {
          setTempPass(password);
          setShowOtp(true);
          setLoading(false);
          return;
        }
        // Surfaced error codes from the updated authorize()
        const errMsg =
          result.error === "ACCOUNT_LOCKED"
            ? "Your account is temporarily locked after too many failed attempts. Please try again later."
            : result.error === "INVALID_CREDENTIALS" || result.error === "CredentialsSignin"
            ? "Invalid email or password."
            : result.error;
        setError(errMsg);
        toast.error(errMsg);
      } else {
        toast.success("Welcome back to EcoCulture");
        // Use callbackUrl if present (user was redirected here from a protected page)
        const urlParams = new URLSearchParams(window.location.search);
        const callbackUrl = urlParams.get('callbackUrl');
        if (callbackUrl) {
          router.refresh();
          router.push(callbackUrl);
        } else {
          // Set a flag — the useEffect above will redirect once useSession() is populated
          setPendingRedirect(true);
        }
      }
    } catch (err: any) {
      const msg = err.message || "An unexpected error occurred. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      if (!showOtp) setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col lg:flex-row relative overflow-hidden selection:bg-t-primary selection:text-white">
      
      {/* LEFT PANEL - IMMERSIVE WORLD */}
      <div className="lg:w-1/2 h-[40vh] lg:h-screen relative overflow-hidden transition-all duration-700">
        <AnimatePresence mode="wait">
          {role === "TRAVELER" ? (
            <motion.div
              key="traveler-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 0.6 }}
              className="w-full h-full"
            >
              <TravelerPanel />
            </motion.div>
          ) : (
            <motion.div
              key="admin-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 0.6 }}
              className="w-full h-full"
            >
              <AdminPanel />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Morphing S-Curve Divider (Desktop Only) */}
        <SvgDivider role={role} />
      </div>

      {/* RIGHT PANEL - THE FORM */}
      <div className="lg:w-1/2 min-h-[60vh] lg:h-screen bg-ink relative z-10 flex flex-col justify-center px-6 lg:px-24 py-12">
        {/* Subtle Background Glows */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          {role === "TRAVELER" ? (
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-t-primary blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          ) : (
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-a-primary blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
          )}
        </div>

        <div className="w-full max-w-[420px] mx-auto relative z-10">
          
          {/* Role Toggle */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <RoleToggle activeRole={role} onChange={handleRoleChange} />
          </motion.div>

          {/* Form Header */}
          <div className="mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="font-display text-4xl text-white font-medium mb-2">
                  {role === "TRAVELER" ? "Welcome back" : "Admin Access"}
                </h1>
                <p className="font-body text-sm" style={{ color: role === "TRAVELER" ? "var(--t-light)" : "var(--a-light)" }}>
                  {role === "TRAVELER" 
                    ? "Sign in to continue your eco journey" 
                    : "Authenticate to enter the control center"}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <DemoCredentials role={role} onAutoFill={handleAutoFill} />

          <form onSubmit={handleSubmit} className="space-y-1">
            <FloatingLabelInput 
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              role={role}
              autoComplete="email"
            />
            
            <FloatingLabelInput 
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              role={role}
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between pb-6">
              {role === "TRAVELER" ? (
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative w-5 h-5">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <div className={`w-full h-full rounded border-2 transition-all duration-200 flex items-center justify-center ${
                      rememberMe ? 'bg-t-primary border-t-primary' : 'border-white/10 group-hover:border-white/20'
                    }`}>
                      {rememberMe && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                  </div>
                  <span className="text-xs text-stone-500 font-body">Remember me for 30 days</span>
                </label>
              ) : <div />}

              <button type="button" className="text-xs font-medium hover:underline" style={{ color: role === "TRAVELER" ? "var(--t-light)" : "var(--a-light)" }}>
                Forgot Password?
              </button>
            </div>

            {/* Inline Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm font-body"
                style={{
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  color: "#f87171",
                }}
              >
                <XCircle size={15} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[58px] rounded-2xl font-display font-bold text-base transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden shadow-xl ${
                loading ? 'cursor-not-allowed opacity-80' : 'hover:scale-[0.98] active:scale-[0.96]'
              }`}
              style={{ 
                background: role === "TRAVELER" 
                  ? "linear-gradient(135deg, var(--t-primary), var(--t-mid))" 
                  : "linear-gradient(135deg, var(--a-primary), var(--a-mid))",
                color: role === "TRAVELER" ? "#F7F4EF" : "#0D0D0D",
                boxShadow: role === "TRAVELER" ? "0 10px 30px -10px rgba(74,139,92,0.4)" : "0 10px 30px -10px rgba(212,168,67,0.3)"
              }}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <>
                  <span>{role === "TRAVELER" ? "Sign In to EcoCulture" : "Access Admin Portal"}</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Social / Security Section */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {role === "TRAVELER" ? (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-[10px] font-mono text-stone-600 uppercase tracking-widest">or continue with</span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  
                  <button className="w-full h-12 bg-white/[0.04] border border-white/5 rounded-xl flex items-center justify-center gap-3 text-sm font-body text-stone-300 hover:bg-white/[0.08] hover:border-white/10 transition-all">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.1C5.62 13.43 5.5 12.72 5.5 12c0-.72.12-1.43.34-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>

                  <p className="text-center mt-8 text-xs text-stone-500 font-body">
                    New to EcoCulture? <a href="/auth/register" className="text-white hover:underline transition-colors">Register your path</a>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-4 rounded-xl bg-a-glow border border-a-border flex gap-3"
                >
                  <Shield size={16} className="text-a-primary mt-1 shrink-0" />
                  <p className="text-[11px] leading-relaxed text-a-light/60 font-body">
                    Admin accounts require email + OTP verification. Social login is disabled for enhanced identity security.
                    <br />
                    <span className="text-stone-500 mt-2 block italic text-[10px]">Need access? Contact sysadmin@ecoculture.travel</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* OTP OVERLAY */}
      <AnimatePresence>
        {showOtp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-ink/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.9 }}
              className="w-full max-w-md"
            >
              <div className="flex justify-center mb-8">
                 <button onClick={() => setShowOtp(false)} className="text-stone-500 hover:text-white transition-colors flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
                    Back to login
                 </button>
              </div>
              <OtpVerification 
                email={email}
                onVerify={async (code, trustDevice) => {
                  try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email, code })
                    });
                    
                    if (!res.ok) throw new Error("Invalid verification code");

                    if (trustDevice) {
                      document.cookie = `trusted_device_${email}=true; max-age=${30 * 24 * 60 * 60}; path=/`;
                    }
                    // Use callbackUrl if it exists
                    const urlParams = new URLSearchParams(window.location.search);
                    const callbackUrl = urlParams.get('callbackUrl');

                    await signIn("credentials", {
                      redirect: true,
                      callbackUrl: callbackUrl || "/dashboard",
                      email,
                      password: tempPass,
                    });
                  } catch (err: any) {
                    throw err;
                  }
                }}
                onResend={async () => {
                  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password: tempPass });
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
