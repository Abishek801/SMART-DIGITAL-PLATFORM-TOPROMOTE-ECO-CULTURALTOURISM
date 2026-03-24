"use client";

import { motion } from "framer-motion";
import { Mail, Shield, MapPin, Wind, Sparkles, Building, Globe, Layers, Check } from "lucide-react";
import { useState } from "react";

export default function AddDestinationForm({ onCancel, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "ECO_VILLAGE",
    region: "",
    country: "India",
    description: "",
    shortDesc: "",
    score: 85,
    difficulty: "MODERATE",
    featured: false,
    status: "ACTIVE"
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess?.();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 pb-20">
      
      {/* BASIC INFO */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b border-[#27272A]">
           <Layers size={16} className="text-[#D4A843]" />
           <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest">Basic Information</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 space-y-1.5">
            <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">Destination Name</label>
            <input 
              required
              type="text" 
              className="admin-input" 
              placeholder="e.g. Munnar Eco Village" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">Category</label>
            <select 
              className="admin-input appearance-none bg-[#18181B] cursor-pointer"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="ECO_VILLAGE">Eco Village</option>
              <option value="TREKKING">Trekking</option>
              <option value="CULTURE">Culture</option>
              <option value="WILDLIFE">Wildlife</option>
              <option value="NATURE">Nature</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">Slug (Auto)</label>
            <input 
              type="text" 
              className="admin-input text-stone-500" 
              placeholder="munnar-eco-village" 
              value={formData.name.toLowerCase().replace(/\s+/g, '-')}
              readOnly
            />
          </div>
        </div>

        <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">Short Preview Description</label>
            <textarea 
              className="admin-input min-h-[80px]" 
              placeholder="Describe the highlight of this destination in 160 characters..."
              maxLength={160}
            />
            <div className="text-[9px] text-right text-stone-600 font-mono">0 / 160</div>
        </div>
      </div>

      {/* LOCATION */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b border-[#27272A]">
           <MapPin size={16} className="text-[#D4A843]" />
           <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest">Geographic Data</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">Region / State</label>
            <input type="text" className="admin-input" placeholder="Kerala" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">Country</label>
            <input type="text" className="admin-input" value="India" readOnly />
          </div>
        </div>

        <div className="p-4 bg-[#18181B] border border-[#27272A] rounded-xl">
           <p className="text-[11px] text-stone-500 leading-relaxed">Coordinates can be set using the visual map management tool or by entering them manually in the detailed view.</p>
        </div>
      </div>

      {/* ECO METRICS */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b border-[#27272A]">
           <Sparkles size={16} className="text-[#D4A843]" />
           <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest">Sustainability Metrics</h3>
        </div>

        <div className="space-y-4">
           <div className="space-y-2">
              <div className="flex justify-between items-center">
                 <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">Sustainability Score</label>
                 <span className="text-sm font-bold text-[#D4A843] font-mono">{formData.score}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={formData.score} 
                onChange={e => setFormData({ ...formData, score: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-[#27272A] rounded-lg appearance-none cursor-pointer accent-[#D4A843]" 
              />
           </div>

           <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">Difficulty Level</label>
                <div className="flex bg-[#18181B] border border-[#27272A] rounded-lg p-1">
                   {["EASY", "MOD", "HARD"].map(d => (
                     <button 
                        key={d} 
                        type="button" 
                        className={`flex-1 py-1 text-[9px] font-bold rounded ${d === "MOD" ? 'bg-[#27272A] text-white' : 'text-stone-500'}`}
                      >
                       {d}
                     </button>
                   ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6">
                 <button 
                    type="button"
                    onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                    className={`w-10 h-5 rounded-full relative transition-colors ${formData.featured ? 'bg-[#D4A843]' : 'bg-[#27272A]'}`}
                 >
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${formData.featured ? 'left-6' : 'left-1'}`} />
                 </button>
                 <span className="text-xs font-medium text-stone-400">Featured Destination</span>
              </div>
           </div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="fixed bottom-0 right-0 w-full max-w-[640px] bg-[#111113] border-t border-[#27272A] p-6 flex justify-end gap-3 z-10">
         <button 
            type="button" 
            onClick={onCancel}
            className="px-6 h-10 rounded-lg text-sm font-bold text-stone-500 hover:text-white transition-colors"
          >
            Cancel
         </button>
         <button 
            type="submit" 
            disabled={loading}
            className="px-8 h-10 bg-[#D4A843] text-[#09090B] rounded-lg text-sm font-bold hover:bg-[#E4B853] transition-all flex items-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#09090B] border-t-transparent rounded-full animate-spin" />
            ) : <Check size={18} />}
            {loading ? 'Publishing...' : 'Publish Destination'}
         </button>
      </div>

    </form>
  );
}
