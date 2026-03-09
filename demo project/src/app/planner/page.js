"use client";

import { useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import LoginModal from "../../components/LoginModal";
import {
  FaMapMarkedAlt,
  FaCloudSun,
  FaLeaf,
  FaSuitcaseRolling,
  FaCalendarAlt,
  FaUsers,
  FaCompass,
  FaChevronRight,
  FaChevronLeft,
  FaRobot,
  FaSave,
  FaRedo,
} from "react-icons/fa";

function PlannerInner() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const initialDest = searchParams.get("dest") || "";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    destination: initialDest,
    days: 3,
    interests: "Nature",
    style: "Comfort",
    budget: "Standard",
    people: 1,
    date: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitPlan = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          save: status === "authenticated",
          userId: session?.user?.id,
        }),
      });
      const data = await res.json();
      setPlan(data);
    } catch (e) {
      console.error("AI Plan Generation Error:", e);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (status === "unauthenticated") {
      setShowLogin(true);
    } else {
      setLoading(true);
      try {
        const res = await fetch("/api/generate-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            save: true,
            userId: session?.user?.id,
          }),
        });
        if (res.ok) {
          setSaved(true);
          alert("Itinerary saved to your dashboard!");
        }
      } catch (err) {
        console.error("Failed to save:", err);
      }
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 md:py-24 max-w-5xl animate-fade-in min-h-screen">
      {!plan ? (
        <div className="glass-panel p-8 md:p-16 border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[140px] opacity-10 pointer-events-none -mr-48 -mt-48"></div>

          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 text-3xl mb-8 mx-auto shadow-lg shadow-emerald-500/10">
              <FaRobot className="animate-float" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-4">
              AI Travel Architect
            </h1>
            <p className="text-slate-400 font-medium">
              Crafting a carbon-conscious, culturally rich journey just for you.
            </p>
          </div>

          {/* Multi-step indicator */}
          <div className="max-w-lg mx-auto mb-16 px-4">
            <div className="flex justify-between items-center relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/5 -z-10 rounded-full">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  style={{ width: `${((step - 1) / 4) * 100}%` }}
                />
              </div>
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500 z-10 ${step >= num ? "bg-emerald-500 text-white scale-110 shadow-xl" : "bg-slate-800 text-slate-500"}`}
                >
                  {num}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">
              <span className={step >= 1 ? "text-emerald-400" : ""}>Destination</span>
              <span className={step >= 2 ? "text-emerald-400" : ""}>Interests</span>
              <span className={step >= 3 ? "text-emerald-400" : ""}>Style</span>
              <span className={step >= 4 ? "text-emerald-400" : ""}>Budget</span>
              <span className={step >= 5 ? "text-emerald-400" : ""}>Verify</span>
            </div>
          </div>

          <div className="min-h-[300px] mb-12">
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-slide-up">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center">
                    <FaCompass className="mr-2 text-emerald-500" /> Target Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    className="input-glass bg-white/5 py-4 px-6 border-white/10"
                    placeholder="e.g. Spiti Valley, Meghalaya"
                    value={formData.destination}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center">
                    <FaCalendarAlt className="mr-2 text-emerald-500" /> Start Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="input-glass bg-white/5 py-4 px-6 border-white/10 text-slate-300"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-slide-up">
                <div className="col-span-full space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">
                    Primary Interest Cluster
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: "Nature", icon: <FaLeaf />, label: "Nature & Wildlife" },
                      { id: "Culture", icon: <FaUsers />, label: "Art & Culture" },
                      { id: "Spirituality", icon: <FaUsers />, label: "Spirituality & Yoga" },
                    ].map((interest) => (
                      <button
                        key={interest.id}
                        onClick={() => setFormData({ ...formData, interests: interest.id })}
                        className={`p-6 rounded-2xl flex flex-col items-center gap-4 transition-all border ${formData.interests === interest.id ? "bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-500/20" : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10"}`}
                      >
                        <span className="text-2xl">{interest.icon}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">{interest.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-slide-up">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center">
                    <FaSuitcaseRolling className="mr-2 text-emerald-500" /> Travel Style
                  </label>
                  <select
                    name="style"
                    className="input-glass bg-white/5 py-4 px-6 border-white/10 text-slate-300"
                    value={formData.style}
                    onChange={handleChange}
                  >
                    <option value="Comfort">Comfort / Eco-Resorts</option>
                    <option value="Adventure">Adventure / Camping</option>
                    <option value="Minimalist">Minimalist / Home-Stays</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center">
                    <FaUsers className="mr-2 text-emerald-500" /> Group Size
                  </label>
                  <input
                    type="number"
                    name="people"
                    className="input-glass bg-white/5 py-4 px-6 border-white/10"
                    min="1"
                    value={formData.people}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-slide-up">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">
                    Budget Tier
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {["Economy", "Standard", "Premium"].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className={`py-4 px-6 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border text-left flex justify-between items-center ${formData.budget === b ? "bg-emerald-500 text-white border-emerald-500 shadow-lg" : "bg-white/5 text-slate-500 border-white/5 hover:border-white/10"}`}
                      >
                        {b} {formData.budget === b && <FaChevronRight />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">
                    Trip Duration (Days)
                  </label>
                  <input
                    type="number"
                    name="days"
                    className="input-glass bg-white/5 py-5 px-6 border-white/10"
                    min="1"
                    max="14"
                    value={formData.days}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="flex flex-col items-center justify-center text-center space-y-8 animate-slide-up">
                <div className="p-10 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl max-w-xl w-full">
                  <h4 className="text-2xl font-black text-white mb-8 tracking-tighter">
                    Ready to Architect?
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-[10px] font-black uppercase tracking-widest">
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 text-slate-400">
                      <p className="text-[8px] opacity-40 mb-1">Target</p>
                      <span className="text-white truncate block">{formData.destination}</span>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 text-slate-400">
                      <p className="text-[8px] opacity-40 mb-1">Length</p>
                      <span className="text-white">{formData.days} Days</span>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 text-slate-400">
                      <p className="text-[8px] opacity-40 mb-1">Interest</p>
                      <span className="text-white">{formData.interests}</span>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 text-slate-400">
                      <p className="text-[8px] opacity-40 mb-1">Tier</p>
                      <span className="text-white">{formData.budget}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-8 border-t border-white/5 justify-between max-w-2xl mx-auto">
            <button
              className={`flex items-center gap-2 py-4 px-8 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all ${step === 1 ? "opacity-30 cursor-not-allowed bg-white/5 text-slate-500" : "bg-white/10 text-white hover:bg-white/20"}`}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              <FaChevronLeft /> Prev
            </button>
            {step < 5 ? (
              <button
                className="flex items-center gap-2 py-4 px-12 rounded-full font-black uppercase tracking-widest text-[10px] bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:-translate-y-1 transition-all"
                onClick={() => setStep((s) => Math.min(5, s + 1))}
              >
                Next Step <FaChevronRight />
              </button>
            ) : (
              <button
                className="flex items-center gap-3 py-4 px-12 rounded-full font-bold uppercase tracking-widest text-[10px] bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:-translate-y-1 transition-all"
                onClick={submitPlan}
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-pulse flex items-center">
                    <FaSpinner className="animate-spin mr-2" /> Visualizing...
                  </span>
                ) : (
                  <>
                    <FaRobot className="text-lg" /> Construct Plan
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="glass-panel p-8 md:p-16 animate-fade-in relative overflow-hidden border-white/10 shadow-3xl bg-slate-900/80">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.3em]">
                AI Engineered Result
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white mt-1 border-white/5">
                {formData.destination}{" "}
                <span className="text-slate-500 font-light opacity-60">
                  Quest
                </span>
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                className="btn btn-primary py-3 px-6 text-[10px] font-bold uppercase tracking-widest flex items-center"
                onClick={handleSave}
                disabled={loading || saved}
              >
                <FaSave className="mr-2" /> {saved ? "Success" : "Save Plan"}
              </button>
              <button
                className="btn btn-glass py-3 px-6 text-[10px] font-bold uppercase tracking-widest flex items-center"
                onClick={() => {
                  setPlan(null);
                  setStep(1);
                  setSaved(false);
                }}
              >
                <FaRedo className="mr-2" /> Rewrite
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="glass-panel p-8 border-white/10 bg-amber-500/5 grid-card-container">
              <h4 className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center shrink-0">
                <FaCloudSun className="mr-3 text-xl" /> Sync Status: Weather
              </h4>
              <div className="flex items-end gap-4 mb-4">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                  {plan.weather.temp}°C
                </span>
                <span className="text-slate-400 text-xs font-bold mb-1 uppercase tracking-tight">
                  {plan.weather.condition}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 bg-white/5 p-4 rounded-xl border border-white/5 leading-relaxed italic flex-1 flex items-center">
                "{plan.weather.alert}"
              </p>
            </div>

            <div className="glass-panel p-8 border-white/10 bg-emerald-500/5 grid-card-container">
              <h4 className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center shrink-0">
                <FaLeaf className="mr-3 text-xl" /> Impact Metrics
              </h4>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                  {plan.route.carbonSaved || 42.5}kg
                </span>
                <span className="text-emerald-500 text-[8px] font-black mb-1 uppercase tracking-widest opacity-70">
                  CO₂ Protected
                </span>
              </div>
              <div className="mt-auto">
                <p className="text-[10px] font-black text-slate-500 leading-relaxed uppercase tracking-widest">
                  Optimized for{" "}
                  <span className="text-white">
                    {plan.route.suggestedTransport}
                  </span>{" "}
                  transit.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-heading font-black text-white mb-10 pl-6 border-l-4 border-emerald-500 tracking-tighter">
            Segmented Journey
          </h3>

          <div className="space-y-8">
            {plan.itinerary.map((day, idx) => (
              <div
                key={idx}
                className="relative pl-12 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-px before:bg-white/10 group"
              >
                <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-slate-900 border-2 border-emerald-500 z-10 group-hover:bg-emerald-500 transition-colors"></div>
                <div className="glass-panel p-8 border-white/5 hover:border-emerald-500/20 transition-all duration-500 hover:translate-x-3 grid-card-container">
                  <div className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] mb-2 shrink-0">
                    Checkpoint Day 0{day.day}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 leading-tight tracking-tight">
                    {day.title}
                  </h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed opacity-80 font-medium">
                    {day.activities}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </main>
  );
}

function FaSpinner(props) {
  return (
    <svg
      {...props}
      className={"animate-spin " + props.className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

export default function PlannerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen text-emerald-400">
          <FaSpinner className="text-5xl" />
        </div>
      }
    >
      <PlannerInner />
    </Suspense>
  );
}
