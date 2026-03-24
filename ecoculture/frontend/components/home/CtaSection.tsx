"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { EcoParticles } from "@/components/ui/EcoParticles";

export default function CtaSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Imagery */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale mix-blend-screen"
        >
          <source src="https://cdn.pixabay.com/video/2021/08/04/83815-585311224_medium.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-moss/20 to-ink" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-plus-lighter">
         <EcoParticles count={50} />
      </div>

      <div className="relative z-20 w-full max-w-[1000px] mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-8">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white">
              <path d="M7 6H15M7 12H13M7 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h2 className="font-display text-[clamp(40px,6vw,96px)] leading-none font-light text-white tracking-tight mb-8">
            The Planet Needs <br/>
            <span className="font-normal italic text-leaf">Travelers Like You.</span>
          </h2>
          
          <p className="font-body text-stone-300 text-lg md:text-xl max-w-2xl mx-auto mb-16 px-4">
            Join the movement of zero-impact explorers. Start planning your first conscious journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/auth/register" className="h-16 px-10 rounded-pill bg-white text-ink font-heading font-bold text-lg flex items-center justify-center hover:scale-95 transition-transform duration-300 w-full sm:w-auto">
              Create Your Account
            </Link>
            <Link href="/destinations" className="h-16 px-10 rounded-pill border border-white/20 bg-white/5 backdrop-blur text-white font-heading font-semibold text-lg flex items-center justify-center hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto">
              Explore Destinations
            </Link>
          </div>

          <div className="mt-16 text-stone-500 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-stone-700" />
            Designed for Earth
            <span className="w-8 h-px bg-stone-700" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
