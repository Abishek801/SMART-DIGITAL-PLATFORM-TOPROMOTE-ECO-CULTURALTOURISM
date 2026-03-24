// app/not-found.tsx
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-center text-center px-6">
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-t-primary/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-moss to-canopy flex items-center justify-center shadow-xl">
            <Leaf size={18} className="text-white" />
          </div>
          <span className="font-display text-2xl font-medium text-white">EcoCulture</span>
        </div>

        {/* Giant 404 */}
        <h1 className="font-display text-[10rem] font-light leading-none text-white/5 select-none mb-0 -mt-4">
          404
        </h1>

        <div className="-mt-12 relative z-10">
          <p className="font-mono text-xs tracking-widest uppercase text-leaf mb-4">Trail Not Found</p>
          <h2 className="font-display text-4xl font-light text-white mb-4">
            This path has been
            <span className="italic text-sage"> reclaimed</span> by nature.
          </h2>
          <p className="font-body text-stone-400 mb-10 text-base leading-relaxed">
            The page you were looking for doesn't exist, or may have moved. Let's get you back on the eco-trail.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="h-14 px-8 rounded-full bg-white text-ink font-heading font-semibold flex items-center justify-center hover:scale-[0.97] transition-transform"
            >
              Return to Home
            </Link>
            <Link
              href="/destinations"
              className="h-14 px-8 rounded-full border border-white/10 text-white font-heading font-medium flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
