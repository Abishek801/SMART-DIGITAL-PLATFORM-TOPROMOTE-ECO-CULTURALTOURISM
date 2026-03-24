"use client";

import { useState } from "react";
import { Package, ShoppingBag, User, Globe, Sparkles, Check } from "lucide-react";

export default function AddProductForm({ onCancel, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "HOME_DECOR",
    price: "",
    stock: "",
    artisanName: "",
    artisanLocation: "",
    description: "",
    score: 90,
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
      
      {/* PRODUCT INFO */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b border-[#27272A]">
           <Package size={16} className="text-[#D4A843]" />
           <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest">Product Details</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">Product Name</label>
            <input required type="text" className="admin-input" placeholder="e.g. Handwoven Bamboo Basket" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">Category</label>
              <select className="admin-input appearance-none bg-[#18181B] cursor-pointer">
                <option value="HOME_DECOR">Home & Decor</option>
                <option value="FOOD_DRINK">Food & Drink</option>
                <option value="CLOTHING">Clothing</option>
                <option value="WELLNESS">Wellness</option>
                <option value="ART_CRAFT">Art & Craft</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">SKU (Optional)</label>
              <input type="text" className="admin-input font-mono" placeholder="ECO-PRD-001" />
            </div>
          </div>
        </div>
      </div>

      {/* ARTISAN INFO */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b border-[#27272A]">
           <User size={16} className="text-[#D4A843]" />
           <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest">Artisan Story</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">Master Artisan</label>
              <input type="text" className="admin-input" placeholder="e.g. Lakshmi Devi" />
           </div>
           <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">Craft Village</label>
              <input type="text" className="admin-input" placeholder="e.g. Majuli, Assam" />
           </div>
        </div>
        
        <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">The Maker's Story</label>
            <textarea className="admin-input min-h-[100px]" placeholder="Brief background of the artisan and the techniques used..." />
        </div>
      </div>

      {/* PRICING & STOCK */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b border-[#27272A]">
           <ShoppingBag size={16} className="text-[#D4A843]" />
           <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest">Pricing & Inventory</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">Retail Price (₹)</label>
              <input type="number" className="admin-input" placeholder="0.00" />
           </div>
           <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider ml-1">Stock Quantity</label>
              <input type="number" className="admin-input" placeholder="0" />
           </div>
        </div>
      </div>

      {/* ECO SPECS */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b border-[#27272A]">
           <Sparkles size={16} className="text-[#D4A843]" />
           <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest">Eco Specifications</h3>
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

           <div className="p-4 bg-[#18181B] border border-[#27272A] rounded-xl">
              <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-3">Suggested Certifications</p>
              <div className="flex flex-wrap gap-2">
                 {["Fair Trade", "Organic", "Zero Waste", "GI Tag", "Handmade"].map(tag => (
                   <button key={tag} type="button" className="px-2 py-1 rounded border border-[#27272A] text-[10px] text-stone-400 hover:border-[#D4A843] transition-colors">+ {tag}</button>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="fixed bottom-0 right-0 w-full max-w-[640px] bg-[#111113] border-t border-[#27272A] p-6 flex justify-end gap-3 z-10">
         <button  type="button"  onClick={onCancel} className="px-6 h-10 rounded-lg text-sm font-bold text-stone-500 hover:text-white transition-colors"> Cancel </button>
         <button type="submit" disabled={loading} className="px-8 h-10 bg-[#D4A843] text-[#09090B] rounded-lg text-sm font-bold hover:bg-[#E4B853] transition-all flex items-center gap-2" >
            {loading ? <div className="w-4 h-4 border-2 border-[#09090B] border-t-transparent rounded-full animate-spin" /> : <Check size={18} />}
            {loading ? 'Adding Product...' : 'Add to Inventory'}
         </button>
      </div>

    </form>
  );
}
