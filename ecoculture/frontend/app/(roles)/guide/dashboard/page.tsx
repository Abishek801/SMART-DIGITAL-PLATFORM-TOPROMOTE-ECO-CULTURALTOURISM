"use client";

import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Star, ArrowRight, Shield, Thermometer, Droplets, Wind } from "lucide-react";
import { AntigravityCard } from "@/components/ui/AntigravityCard";

export default function GuideDashboard() {
  return (
    <div className="space-y-10">
      {/* Today's Mission */}
      <section className="relative p-10 rounded-card bg-[#1A241D] border border-leaf/10 overflow-hidden group">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-leaf/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-leaf/20 text-leaf text-[10px] font-mono font-bold rounded uppercase tracking-widest border border-leaf/30">Upcoming Phase</span>
            <span className="text-stone-500 text-xs font-body">Starts in 42 minutes</span>
          </div>
          
          <h1 className="font-display text-5xl text-white mb-6 leading-tight">
            Silent Valley <span className="italic text-leaf">Night Trek</span>
          </h1>
          
          <div className="flex flex-wrap gap-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 text-stone-400"><Users size={20} /></div>
              <div><p className="text-[10px] font-mono text-stone-600 uppercase">Travelers</p><p className="text-lg font-heading text-white">12 Participants</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 text-stone-400"><MapPin size={20} /></div>
              <div><p className="text-[10px] font-mono text-stone-600 uppercase">Assembly</p><p className="text-lg font-heading text-white">Base Camp Delta</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 text-stone-400"><Shield size={20} /></div>
              <div><p className="text-[10px] font-mono text-stone-600 uppercase">Safety</p><p className="text-lg font-heading text-green-500">Green Status</p></div>
            </div>
          </div>

          <button className="h-14 px-8 bg-leaf text-ink font-bold rounded-xl flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_30px_rgba(74,139,92,0.3)]">
            Begin Expedition Sync <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Field Vitals */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <AntigravityCard mode="tilt" maxRotation={3} perspective={1000}>
                <div className="p-6 rounded-card bg-[#141C16] border border-white/5 h-full">
                  <Thermometer className="text-leaf mb-4" />
                  <p className="text-[10px] font-mono text-stone-600 uppercase mb-1">Temperature</p>
                  <p className="text-2xl font-display text-white">18°C</p>
                  <p className="text-[10px] text-stone-500 mt-2">Optimal for Trekking</p>
                </div>
             </AntigravityCard>
             <AntigravityCard mode="tilt" maxRotation={3} perspective={1000}>
                <div className="p-6 rounded-card bg-[#141C16] border border-white/5 h-full">
                  <Droplets className="text-leaf mb-4" />
                  <p className="text-[10px] font-mono text-stone-600 uppercase mb-1">Humidity</p>
                  <p className="text-2xl font-display text-white">62%</p>
                  <p className="text-[10px] text-stone-500 mt-2">Dew point 14°C</p>
                </div>
             </AntigravityCard>
             <AntigravityCard mode="tilt" maxRotation={3} perspective={1000}>
                <div className="p-6 rounded-card bg-[#141C16] border border-white/5 h-full">
                  <Wind className="text-leaf mb-4" />
                  <p className="text-[10px] font-mono text-stone-600 uppercase mb-1">Wind Speed</p>
                  <p className="text-2xl font-display text-white">12 km/h</p>
                  <p className="text-[10px] text-stone-500 mt-2">NNE Gusts active</p>
                </div>
             </AntigravityCard>
          </div>

          <section className="p-8 rounded-card bg-[#141C16] border border-white/5">
            <h3 className="font-display text-2xl text-white mb-8">Traveler Manifesto</h3>
            <div className="space-y-6">
              {[
                { name: "John & Sarah Doe", count: 2, level: "Explorer", tags: ["Vegetarian", "Photography"] },
                { name: "The Iyer Family", count: 4, level: "Guardian", tags: ["Senior Citizens", "Cultural Focus"] },
                { name: "Marco Polo", count: 1, level: "Pioneer", tags: ["Expert Hiker"] },
              ].map((group, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-leaf/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-stone-800 flex items-center justify-center text-stone-500 font-bold">
                       {group.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{group.name} <span className="text-xs text-stone-500 font-normal">({group.count})</span></p>
                      <div className="flex gap-2 mt-1">
                        {group.tags.map(tag => <span key={tag} className="text-[9px] font-mono text-stone-600 uppercase border border-stone-800 px-1.5 py-0.5 rounded">{tag}</span>)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-leaf uppercase tracking-widest">{group.level}</span>
                    <p className="text-[10px] text-stone-600">ID: E-284{i}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Schedule & Impact */}
        <div className="space-y-8">
           <section className="p-6 rounded-card bg-[#141C16] border border-white/5">
             <h4 className="text-xs font-mono text-stone-500 uppercase tracking-widest mb-6">Weekly Roster</h4>
             <div className="space-y-3">
               {[
                 { day: "MON", event: "Valley Trek", status: "active" },
                 { day: "TUE", event: "Tea Garden Sync", status: "pending" },
                 { day: "WED", event: "OFF - Restoration", status: "off" },
                 { day: "THU", event: "Waterfall Route", status: "pending" },
               ].map((d, i) => (
                 <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-white/5 bg-black/20">
                    <div className="text-center w-10 shrink-0">
                      <p className="text-[10px] font-mono text-stone-600 mb-1">{d.day}</p>
                      <div className={`h-1 w-full rounded-full ${d.status === 'active' ? 'bg-leaf' : d.status === 'off' ? 'bg-stone-800' : 'bg-clay'}`} />
                    </div>
                    <p className={`text-xs ${d.status === 'off' ? 'text-stone-600' : 'text-stone-300'}`}>{d.event}</p>
                 </div>
               ))}
             </div>
           </section>

           <section className="p-6 rounded-card bg-leaf/5 border border-leaf/10 text-center">
              <Star className="text-leaf mx-auto mb-4" size={32} />
              <h4 className="font-display text-xl text-white mb-2">Guide Excellence</h4>
              <p className="text-3xl font-heading text-leaf mb-1">4.92</p>
              <p className="text-[10px] font-mono text-stone-600 uppercase tracking-[0.2em] mb-6">Current Field Rating</p>
              <button className="w-full h-10 border border-leaf/30 rounded-lg text-xs text-leaf hover:bg-leaf/10 transition-all font-body">View Feedback Logs</button>
           </section>
        </div>
      </div>
    </div>
  );
}
