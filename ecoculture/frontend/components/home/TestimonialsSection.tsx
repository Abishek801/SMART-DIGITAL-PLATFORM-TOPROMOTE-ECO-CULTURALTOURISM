"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Star, Quote } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { getAvatarUrl } from "@/lib/images";

const REVIEWS = [
  {
    text: "The Eco-Concierge AI designed a trek through Spiti that I never could have planned myself. Staying in solar-powered mud houses and eating locally completely changed my view on travel.",
    author: "Elena R.",
    role: "Impact Tracker: -142kg CO₂",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
  },
  {
    text: "EcoCulture isn't just a booking platform, it's a movement. The transparency regarding where my money goes and the exact carbon cost of my flight is unprecedented.",
    author: "James T.",
    role: "Impact Tracker: -310kg CO₂",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  },
  {
    text: "The zero-waste lodge in Kerala they recommended was the most luxurious stay of my life. Luxury and sustainability finally coexist beautifully.",
    author: "Sarah K.",
    role: "Impact Tracker: -85kg CO₂",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
  }
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const nextReview = () => {
    setActive((prev) => (prev + 1) % REVIEWS.length);
  };

  return (
    <section className="w-full py-32 bg-ink overflow-hidden border-t border-white/5">
      <div className="max-w-[800px] mx-auto px-4 text-center">
        
        <div className="mb-20">
          <Quote size={40} className="text-white/10 mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
            The travelers who <br className="hidden sm:block"/>
            <span className="italic text-sand">came before you.</span>
          </h2>
        </div>

        {/* Card Stack */}
        <div className="relative h-[400px] w-full max-w-[600px] mx-auto cursor-pointer" onClick={nextReview}>
          {REVIEWS.map((rev, i) => {
            const isActive = i === active;
            const isPrev = i === (active - 1 + REVIEWS.length) % REVIEWS.length;
            const isNext = i === (active + 1) % REVIEWS.length;

            let zIndex = 0;
            let y = 0;
            let scale = 1;
            let opacity = 0;

            if (isActive) { zIndex = 30; y = 0; scale = 1; opacity = 1; }
            else if (isNext) { zIndex = 20; y = 20; scale = 0.95; opacity = 0.6; }
            else if (isPrev) { zIndex = 10; y = 40; scale = 0.9; opacity = 0; }
            else { zIndex = 0; y = 40; scale = 0.9; opacity = 0; }

            return (
              <motion.div
                key={i}
                initial={false}
                animate={{ y, scale, opacity, zIndex }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-x-0 mx-auto glass border border-white/10 rounded-panel p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center"
              >
                <div className="flex items-center gap-1 text-gold mb-8">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" strokeWidth={0} />)}
                </div>
                <p className="font-display text-2xl md:text-3xl font-medium text-white text-center leading-snug mb-10">"{rev.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <SmartImage 
                    src={getAvatarUrl(rev.author)} 
                    alt={rev.author}
                    aspectRatio="square"
                    className="w-12 h-12 rounded-full grayscale opacity-80"
                  />
                  <div className="text-left">
                    <p className="font-body font-bold text-white text-sm">{rev.author}</p>
                    <p className="font-mono text-[10px] text-leaf tracking-widest uppercase">{rev.role}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        <p className="font-mono text-xs text-stone-500 uppercase tracking-widest mt-12">Tap card to read more <br className="sm:hidden" />or swipe</p>
      </div>
    </section>
  );
}
