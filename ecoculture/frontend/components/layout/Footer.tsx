"use client";
import Link from "next/link";
import { Leaf, Mail, MapPin, Instagram, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-forest-900/30 bg-stone-950/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-forest-600 flex items-center justify-center">
                <Leaf size={18} className="text-white" />
              </div>
              <span className="font-display text-xl font-bold text-stone-100">
                Eco<span className="text-forest-400">Culture</span>
              </span>
            </Link>
            <p className="text-stone-500 text-sm font-body leading-relaxed mb-4">
              Sustainable travel for a planet worth protecting. Every journey matters.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Instagram size={16} />, href: "#" },
                { icon: <Twitter size={16} />, href: "#" },
                { icon: <Github size={16} />, href: "#" },
              ].map((s, i) => (
                <a key={i} href={s.href} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-stone-400 hover:text-forest-400 hover:border-forest-600/40 transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Platform",
              links: [
                { label: "Destinations", href: "/destinations" },
                { label: "AI Planner", href: "/planner" },
                { label: "Eco Shop", href: "/shop" },
                { label: "Interactive Map", href: "/destinations?view=map" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About Us", href: "/about" },
                { label: "Sustainability Report", href: "/sustainability" },
                { label: "Partner with Us", href: "/partner" },
                { label: "Blog", href: "/blog" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "Help Center", href: "/help" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Contact", href: "/contact" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold text-stone-300 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-stone-500 hover:text-stone-300 text-sm font-body transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-forest-900/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-600 text-sm font-body">
            © 2024 EcoCulture. Made with 🌱 for a sustainable future.
          </p>
          <div className="flex items-center gap-2 text-stone-600 text-xs font-body">
            <div className="w-2 h-2 rounded-full bg-forest-500 animate-pulse" />
            Carbon neutral infrastructure
          </div>
        </div>
      </div>
    </footer>
  );
}
