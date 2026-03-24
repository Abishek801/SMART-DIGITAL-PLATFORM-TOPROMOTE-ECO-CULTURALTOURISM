"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
import { User, Leaf, Save, Camera, Star } from "lucide-react";
import toast from "react-hot-toast";

const AVATAR_COLORS = [
  { bg: "#4A8B5C", label: "Forest" },
  { bg: "#C4845A", label: "Clay" },
  { bg: "#6B8F8F", label: "Sage" },
  { bg: "#8A6B4A", label: "Earth" },
  { bg: "#4A6B8B", label: "Ocean" },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") redirect("/auth/login");

  const [name, setName] = useState(session?.user?.name || "");
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0].bg);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // In production: PATCH /api/users/me with { name }
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success("Profile updated!");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-leaf border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const user = session?.user as any;
  const ecoScore = user?.ecoScore ?? 0;

  return (
    <div className="min-h-screen bg-ink pt-24 pb-32">
      <div className="max-w-[900px] mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1.5 h-1.5 rounded-full bg-leaf" />
            <span className="font-mono text-xs tracking-widest uppercase text-stone-400">My Profile</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Avatar + Eco Score column */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* Avatar */}
              <div className="glass rounded-2xl p-6 border border-white/5 text-center">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-display font-bold mx-auto mb-4 shadow-xl relative"
                  style={{ background: avatarColor }}
                >
                  {(name || session?.user?.name || "U")[0]?.toUpperCase()}
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-ink rounded-full flex items-center justify-center border border-white/10">
                    <Camera size={14} className="text-stone-400" />
                  </div>
                </div>
                <p className="font-display text-xl text-white font-medium mb-1">{name || session?.user?.name}</p>
                <p className="font-mono text-xs text-stone-500">{session?.user?.email}</p>
                <p className="font-mono text-[10px] mt-2 px-3 py-1 rounded-full bg-white/5 text-stone-400 inline-block">
                  {user?.role || "TRAVELER"}
                </p>
              </div>

              {/* Avatar Color Picker */}
              <div className="glass rounded-2xl p-5 border border-white/5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500 mb-4">Avatar Color</p>
                <div className="flex gap-3 flex-wrap">
                  {AVATAR_COLORS.map((c) => (
                    <button
                      key={c.bg}
                      onClick={() => setAvatarColor(c.bg)}
                      className={`w-9 h-9 rounded-full transition-all ${avatarColor === c.bg ? "ring-2 ring-white ring-offset-2 ring-offset-ink scale-110" : "hover:scale-105"}`}
                      style={{ background: c.bg }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              {/* Eco Score */}
              <div className="glass rounded-2xl p-5 border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Eco Score</p>
                  <Leaf size={14} className="text-leaf" />
                </div>
                <p className="font-display text-4xl font-light text-white mb-2">{ecoScore}</p>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-leaf to-sage rounded-full transition-all" style={{ width: `${Math.min(ecoScore, 100)}%` }} />
                </div>
                <p className="text-stone-500 text-xs font-body mt-2">Complete journeys to earn eco points</p>
              </div>
            </div>

            {/* Edit Profile column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h2 className="font-display text-2xl text-white mb-6">Edit Profile</h2>
                <div className="space-y-5">
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-stone-500 block mb-2">Full Name</label>
                    <div className="relative">
                      <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white font-body text-sm focus:outline-none focus:border-leaf/50 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-stone-500 block mb-2">Email Address</label>
                    <input
                      type="email"
                      value={session?.user?.email || ""}
                      disabled
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-stone-500 font-body text-sm cursor-not-allowed"
                    />
                    <p className="text-xs text-stone-600 mt-1 font-body">Email cannot be changed</p>
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="mt-6 h-12 px-8 rounded-full bg-white text-ink font-heading font-bold flex items-center gap-2 hover:scale-[0.98] transition-transform disabled:opacity-60"
                >
                  {saving ? <div className="w-4 h-4 border-2 border-ink border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

              {/* Travel Preferences */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h3 className="font-display text-xl text-white mb-5">Travel Preferences</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["Wildlife", "Trekking", "Cultural", "Eco Village", "Wellness", "Photography"].map((pref) => (
                    <button
                      key={pref}
                      className="px-4 py-2.5 rounded-xl border border-white/10 text-stone-400 text-xs font-mono uppercase tracking-wider hover:bg-white/5 hover:text-white hover:border-leaf/30 transition-all text-left"
                    >
                      {pref}
                    </button>
                  ))}
                </div>
                <p className="text-stone-600 text-xs font-body mt-3">Click to toggle (coming soon)</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
