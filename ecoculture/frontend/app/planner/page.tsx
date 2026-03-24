"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu, MapPin, Download, Share2, Send, Bot, User, Sparkles
} from "lucide-react";
import toast from "react-hot-toast";

type Message = {
  id: string;
  role: "ai" | "user";
  content: string;
};

const MOCK_ITINERARY = {
  title: "10-Day Eco-Cultural Journey through Kerala & Karnataka",
  destination: "Kerala & Karnataka, India",
  carbonFootprint: 235,
  carbonSaved: 180,
  totalCost: 45000,
  days: [
    {
      day: 1,
      title: "Arrival in Kochi — God's Own Country",
      activities: [
        { time: "14:00", type: "TRANSPORT", activity: "Arrive at Cochin International Airport", carbon: 0, cost: 0 },
        { time: "15:30", type: "ACCOMMODATION", activity: "Check into Heritage Eco Homestay, Fort Kochi", carbon: 2.1, cost: 2800 },
        { time: "18:00", type: "CULTURAL", activity: "Evening Kathakali performance at Kerala Kalamandalam", carbon: 0.1, cost: 450 },
      ],
    },
    {
      day: 2,
      title: "Fort Kochi — Art, Spice & Colonial Heritage",
      activities: [
        { time: "07:00", type: "ACTIVITY", activity: "Morning cycle tour of Fort Kochi heritage quarter", carbon: 0, cost: 300 },
        { time: "10:00", type: "CULTURAL", activity: "Visit Mattancherry Palace and Jewish Synagogue", carbon: 0.2, cost: 100 },
        { time: "14:00", type: "ACTIVITY", activity: "Spice market tour & organic spice workshop", carbon: 0.3, cost: 800 },
      ],
    },
    {
      day: 3,
      title: "Munnar — Into the Tea Cloud Forests",
      activities: [
        { time: "07:30", type: "TRANSPORT", activity: "Eco-cab to Munnar via Periyar scenic route", carbon: 8.4, cost: 2200 },
        { time: "13:00", type: "MEAL", activity: "Lunch at organic farm-to-table restaurant", carbon: 0.4, cost: 500 },
        { time: "15:00", type: "ACCOMMODATION", activity: "Check into Munnar Eco Village Solar Retreat", carbon: 1.2, cost: 3800 },
      ],
    },
  ],
};

const ACTIVITY_COLORS: Record<string, string> = {
  TRANSPORT: "bg-blue-900/40 border-blue-700/30 text-blue-400",
  ACCOMMODATION: "bg-purple-900/40 border-purple-700/30 text-purple-400",
  CULTURAL: "bg-earth-900/40 border-earth-700/30 text-earth-400",
  ACTIVITY: "bg-forest-900/40 border-forest-700/30 text-forest-400",
  MEAL: "bg-yellow-900/40 border-yellow-700/30 text-yellow-400",
};

export default function PlannerPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "ai", content: "Hi! I'm your Eco-Concierge. Where are you dreaming of traveling, and what kind of authentic experience are you looking for?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showItinerary]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulated Chat Flow
    setTimeout(() => {
      let aiMsg: Message;
      if (messages.length === 1) {
        aiMsg = { id: (Date.now() + 1).toString(), role: "ai", content: "That sounds incredible! I can definitely build an itinerary around that. How many days are you planning to stay, and what is your approximate group size?" };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
      } else {
        // Final generation trigger
        aiMsg = { id: (Date.now() + 1).toString(), role: "ai", content: "Perfect. I'm mapping out a highly sustainable, authentic journey for you. Please hold on a moment while I generate the timeline..." };
        setMessages(prev => [...prev, aiMsg]);
        
        setTimeout(() => {
          setIsTyping(false);
          setShowItinerary(true);
          toast.success("Your Eco-Itinerary is ready!");
        }, 2500);
      }
    }, 1500);
  };

  const handleSaveTrip = async () => {
    if (isBooking) return;
    setIsBooking(true);
    try {
      // 1. Fetch available destinations to mock this custom AI trip against a real DB destination
      const destRes = await fetch("/api/destinations");
      if (!destRes.ok) throw new Error("Could not fetch DB destinations");
      const destinations = await destRes.json();
      if (!destinations || destinations.length === 0) throw new Error("No destinations in DB");
      
      const proxyDest = destinations[0]; // Just use the first available destination as the proxy for the custom planner

      // 2. Build booking payload
      const checkIn = new Date();
      checkIn.setDate(checkIn.getDate() + 14); // AI trip starts in 2 weeks
      const checkOut = new Date(checkIn);
      checkOut.setDate(checkOut.getDate() + 10); // 10 day itinerary

      const bookRes = await fetch("/api/users/me/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinationId: proxyDest.id,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
          guests: 2,
          notes: `Custom AI Itinerary: ${MOCK_ITINERARY.title}`
        })
      });

      if (!bookRes.ok) throw new Error("Failed to save booking");
      
      toast.success("AI Itinerary successfully booked! Check your dashboard.", { duration: 5000 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save itinerary. Make sure backend is running.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center">
      {/* Header */}
      <div className="relative py-12 px-6 text-center w-full">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-2xl mx-auto">
          <div className="eco-badge mx-auto mb-4 w-fit">
            <Sparkles size={14} /> AI-Powered Travel Architect
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-100 mb-2">
            Conversational <span className="text-gradient-green">Planning</span>
          </h1>
          <p className="text-stone-400 font-body text-base">
            Chat with our Eco-Concierge to dynamically generate your carbon-neutral itinerary.
          </p>
        </motion.div>
      </div>

      <div className="w-full max-w-3xl px-4 pb-24 flex-1 flex flex-col">
        {!showItinerary ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 glass-dark rounded-3xl border border-forest-900/30 overflow-hidden flex flex-col shadow-2xl drop-shadow-2xl shadow-forest-900/10 h-[600px] max-h-[70vh]"
          >
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`flex items-end gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "ai" ? "bg-forest-900/60 text-forest-400 border border-forest-500/30" : "bg-earth-900/60 text-earth-400 border border-earth-500/30"}`}>
                      {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className={`p-4 rounded-3xl shadow-md text-sm font-body leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-earth-600 text-stone-100 rounded-br-sm" 
                        : "bg-surface text-stone-300 rounded-bl-sm border border-forest-900/20"
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-3 max-w-[85%] mr-auto">
                  <div className="w-8 h-8 rounded-full bg-forest-900/60 text-forest-400 border border-forest-500/30 flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-3xl rounded-bl-sm bg-surface text-stone-400 border border-forest-900/20 flex gap-1.5 items-center h-12">
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className="w-2 h-2 rounded-full bg-forest-500/50" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }} className="w-2 h-2 rounded-full bg-forest-500/70" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }} className="w-2 h-2 rounded-full bg-forest-500" />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-stone-900/50 border-t border-forest-900/30">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tell me your travel dreams..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-full py-4 pl-6 pr-14 text-sm font-body text-stone-200 focus:outline-none focus:border-forest-500/50 transition-colors placeholder:text-stone-600"
                  autoFocus
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 w-10 h-10 rounded-full bg-forest-600 flex items-center justify-center text-white hover:bg-forest-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          /* ─── RESULT TIMELINE ─── */
          <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="glass-dark border border-forest-500/30 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl shadow-forest-900/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-forest-600/10 blur-[100px] rounded-full" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative z-10">
                <div>
                  <div className="eco-badge mb-3 w-fit"><Cpu size={12}/> AI Generated</div>
                  <h2 className="font-display text-3xl font-bold text-stone-100">{MOCK_ITINERARY.title}</h2>
                  <p className="text-stone-400 font-body mt-2 flex items-center gap-1">
                    <MapPin size={16} className="text-forest-400" /> {MOCK_ITINERARY.destination}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => toast.success("Trip plan link copied to clipboard!")} className="btn-outline py-2.5 px-5 flex items-center gap-2 text-sm font-semibold rounded-xl">
                    <Share2 size={16} /> Share
                  </button>
                  <button 
                    onClick={handleSaveTrip} 
                    disabled={isBooking}
                    className="btn-primary py-2.5 px-5 flex items-center gap-2 text-sm font-semibold rounded-xl disabled:opacity-70"
                  >
                    {isBooking ? (
                      <div className="w-4 h-4 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Download size={16} />
                    )} 
                    {isBooking ? "Saving..." : "Save & Book"}
                  </button>
                </div>
              </div>

              {/* Carbon metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                {[
                  { label: "Carbon Footprint", value: `${MOCK_ITINERARY.carbonFootprint} kg CO₂`, color: "text-earth-300", bg: "bg-earth-900/10 border-earth-900/30" },
                  { label: "Carbon Saved vs avg", value: `${MOCK_ITINERARY.carbonSaved} kg`, color: "text-forest-300", bg: "bg-forest-900/10 border-forest-900/30" },
                  { label: "Estimated Cost", value: `₹${MOCK_ITINERARY.totalCost.toLocaleString()}`, color: "text-stone-200", bg: "bg-stone-900/40 border-stone-800" },
                ].map((m) => (
                  <div key={m.label} className={`text-center p-4 rounded-2xl border ${m.bg}`}>
                    <p className={`font-display text-2xl font-bold ${m.color}`}>{m.value}</p>
                    <p className="text-stone-500 text-xs font-body mt-1 uppercase tracking-widest">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Days */}
            <div className="space-y-6">
              {MOCK_ITINERARY.days.map((day, dIdx) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: dIdx * 0.15 }}
                  className="glass rounded-3xl overflow-hidden border border-forest-900/10 shadow-lg"
                >
                  <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-forest-900/30 to-transparent border-b border-forest-900/20">
                    <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center text-sm font-mono font-bold text-forest-200 shadow-inner">
                      D{day.day}
                    </div>
                    <h3 className="font-display font-bold text-stone-200 text-lg">{day.title}</h3>
                  </div>
                  <div className="p-6 pr-8 space-y-6">
                    {day.activities.map((act, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="text-right w-14 shrink-0 pt-1">
                          <span className="text-sm font-mono text-stone-500">{act.time}</span>
                        </div>
                        <div className="w-px bg-forest-900/30 shrink-0 relative flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full absolute top-1.5 ring-4 ring-stone-950 ${ACTIVITY_COLORS[act.type].split(' ')[0]}`} />
                        </div>
                        <div className="flex-1 pb-2 pl-2">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md border ${ACTIVITY_COLORS[act.type] || ""}`}>
                              {act.type}
                            </span>
                          </div>
                          <p className="text-stone-200 font-body text-base leading-relaxed">{act.activity}</p>
                          <div className="flex gap-4 mt-2">
                            {act.carbon > 0 && (
                              <span className="text-xs text-earth-300 font-mono font-semibold">+{act.carbon} kg CO₂</span>
                            )}
                            {act.cost > 0 && (
                              <span className="text-xs text-stone-500 font-mono font-semibold">₹{act.cost}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button onClick={() => { setShowItinerary(false); setMessages([{ id: "1", role: "ai", content: "Hi again! Do you want to try planning a different route?" }]) }} className="btn-outline font-semibold">
                ← Plan Another Trip
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
