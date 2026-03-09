"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaPlus,
  FaLeaf,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/map", label: "Map" },
    { href: "/shop", label: "Marketplace" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <nav
        className={`fixed top-3 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl px-5 py-2 flex justify-between items-center z-50 rounded-xl transition-all duration-300 ${scrolled ? "shadow-xl backdrop-blur-md bg-slate-900/80 border border-white/10" : "bg-transparent border border-transparent"
          }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading font-black text-lg text-white hover:text-emerald-400 transition-colors"
        >
          <div className="w-7 h-7 bg-emerald-500 rounded flex items-center justify-center text-white shadow-lg">
            <FaLeaf className="text-xs" />
          </div>
          <span className="tracking-tighter">EcoCulture</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-7 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
          {session && (
            <Link href="/dashboard" className="nav-link !text-emerald-400">
              Dashboard
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex gap-2 items-center">
          <Link
            href="/planner"
            className="hidden md:flex btn btn-glass px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest items-center"
          >
            <FaPlus className="mr-1" /> AI Planner
          </Link>

          {status === "authenticated" ? (
            <div className="flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold text-white leading-none mb-0.5">
                  {session.user?.name?.split(" ")[0]}
                </p>
                <button
                  onClick={() => signOut()}
                  className="text-[8px] text-slate-400 hover:text-red-400 transition-colors flex items-center justify-end"
                >
                  <FaSignOutAlt className="mr-1" /> Logout
                </button>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 overflow-hidden">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="User"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-lg" />
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="btn btn-primary px-4 py-2 text-[9px] font-bold uppercase tracking-widest"
            >
              Login
            </button>
          )}

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-16 left-4 right-4 z-50 glass-panel p-5 flex flex-col gap-3 lg:hidden animate-slide-up shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-bold text-white hover:text-emerald-400 py-1.5 border-b border-white/5"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {session && (
            <Link
              href="/dashboard"
              className="text-xs font-bold text-emerald-400"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/planner"
            className="btn btn-primary w-full text-center py-2.5 text-[10px] font-bold uppercase tracking-widest mt-2"
            onClick={() => setMenuOpen(false)}
          >
            AI Planner
          </Link>
        </div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
