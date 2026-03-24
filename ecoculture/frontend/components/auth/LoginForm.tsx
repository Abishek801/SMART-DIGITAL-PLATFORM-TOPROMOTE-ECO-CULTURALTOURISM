import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Role } from "@/lib/constants";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ShoppingBag, MapPin, Compass, ArrowRight, Github, Settings } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

interface LoginFormProps {
  role: Role;
  onRequires2fa?: (email: string, pass: string) => void;
}

export function LoginForm({ role, onRequires2fa }: LoginFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    twoFactor: "",
    shopId: "",
    guideId: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // First, check if 2FA is required by calling our backend directly
      const loginCheck = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: formData.email,
        password: formData.password
      });

      if (loginCheck.data.requires2fa) {
        if (onRequires2fa) {
          onRequires2fa(formData.email, formData.password);
          return;
        }
      }

      // If no 2FA, proceed with normal next-auth signIn
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        toast.error(result.error || "Login failed");
      } else {
        toast.success("Welcome back to EcoCulture");
        const dashboardMap: Record<string, string> = {
          "SUPER_ADMIN": "/super-admin/dashboard",
          "ADMIN": "/admin/dashboard",
          "GUIDE": "/guide/dashboard",
          "ARTISAN": "/artisan/studio",
          "TRAVELER": "/dashboard"
        };
        router.push(dashboardMap[role as string] || "/dashboard");
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Invalid credentials";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const roleStyles = getRoleStyles(role);

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 text-[10px] font-mono tracking-widest uppercase"
          style={{ 
            borderColor: `${roleStyles.color}33`, 
            color: roleStyles.color, 
            backgroundColor: `${roleStyles.color}11` 
          } as React.CSSProperties}
        >
          {roleStyles.icon} Access Level: {role.replace('_', ' ')}
        </div>
        <h2 className="font-display text-3xl text-white">
          {roleStyles.heading}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-widest text-stone-500 ml-1">Email Address</label>
          <div className="relative group">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-white transition-colors" />
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-ink-soft border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white font-body focus:outline-none focus:border-white/20 transition-all"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-widest text-stone-500 ml-1">Password</label>
          <div className="relative group">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-white transition-colors" />
            <input
              required
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-ink-soft border border-white/5 rounded-xl py-3.5 pl-12 pr-12 text-white font-body focus:outline-none focus:border-white/20 transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-600 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Role-Specific Fields */}
        <AnimatePresence>
          {role === ("ARTISAN" as any) && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-1 overflow-hidden">
              <label className="text-xs font-mono uppercase tracking-widest text-[#8B5E3C] ml-1">Shop Identifier</label>
              <div className="relative group">
                <ShoppingBag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B5E3C]/40" />
                <input
                  type="text"
                  value={formData.shopId}
                  onChange={(e) => setFormData({ ...formData, shopId: e.target.value })}
                  className="w-full bg-ink-soft border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white font-body focus:outline-none focus:border-[#8B5E3C]/30 transition-all"
                  placeholder="shop_xxxx"
                />
              </div>
            </motion.div>
          )}

          {role === ("GUIDE" as any) && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-1 overflow-hidden">
              <label className="text-xs font-mono uppercase tracking-widest text-[#4A8B5C] ml-1">Guide ID (Verified)</label>
              <div className="relative group">
                <Compass size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A8B5C]/40" />
                <input
                  type="text"
                  value={formData.guideId}
                  onChange={(e) => setFormData({ ...formData, guideId: e.target.value })}
                  className="w-full bg-ink-soft border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white font-body focus:outline-none focus:border-[#4A8B5C]/30 transition-all"
                  placeholder="guide_xxxx"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between py-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              className="w-4 h-4 rounded border-white/10 bg-ink-soft text-clay focus:ring-0"
            />
            <span className="text-xs text-stone-500 group-hover:text-stone-300 transition-colors">Remember Me</span>
          </label>
          <a href="#" className="text-xs text-stone-500 hover:text-white transition-colors underline-offset-4 hover:underline">Forgot Password?</a>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full h-14 rounded-xl font-heading font-bold text-ink transition-all hover:scale-[0.98] active:scale-95 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          style={{ backgroundColor: roleStyles.color }}
        >
          {loading ? "Verifying..." : roleStyles.submitText}
          {!loading && <ArrowRight size={18} />}
        </button>

        {role === ("TRAVELER" as any) && (
          <div className="pt-6 border-t border-white/5 mt-4">
            <p className="text-center text-[10px] font-mono text-stone-600 uppercase tracking-widest mb-4">Or continue exploring with</p>
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-medium">
                <Github size={18} /> Google
              </button>
              <button type="button" className="h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-medium">
                Apple
              </button>
            </div>
            <p className="text-center text-xs text-stone-500 mt-6">
              New to EcoCulture? <a href="/auth/register" className="text-white hover:underline">Register your path</a>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

function getRoleStyles(role: Role) {
  switch (role as string) {
    case "SUPER_ADMIN":
      return {
        color: "#D4A843",
        icon: <ShieldCheck size={12} />,
        heading: "Master Control",
        submitText: "Access Command Center",
      };
    case "ADMIN":
      return {
        color: "#C4845A",
        icon: <Settings size={12} />,
        heading: "Operations Hub",
        submitText: "Enter Admin Portal",
      };
    case "GUIDE":
      return {
        color: "#4A8B5C",
        icon: <Compass size={12} />,
        heading: "Guide Portal",
        submitText: "Enter Guide Hub",
      };
    case "ARTISAN":
      return {
        color: "#8B5E3C",
        icon: <ShoppingBag size={12} />,
        heading: "Artisan Studio",
        submitText: "Enter My Studio",
      };
    case "TRAVELER":
      return {
        color: "#2D5A3D",
        icon: <MapPin size={12} />,
        heading: "Welcome Traveler",
        submitText: "Begin My Journey",
      };
    default:
      return {
        color: "#4A8B5C",
        icon: <Compass size={12} />,
        heading: "Login",
        submitText: "Enter Portal",
      };
  }
}
