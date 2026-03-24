"use client";

import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { LeafCursor } from "@/components/ui/LeafCursor";
import { ImpersonationBanner } from "@/components/auth/ImpersonationBanner";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en" className={`${cormorant.variable} ${jetbrains.variable}`}>
      <head>
        {/* Load Clash Display & Satoshi from Fontshare */}
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@300,400,500,600,700&f[]=satoshi@300,400,500,700,900&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --font-clash: 'Clash Display', sans-serif;
            --font-satoshi: 'Satoshi', sans-serif;
          }
        `}} />
      </head>
      <body className="bg-ink min-h-screen selection:bg-leaf selection:text-ink overflow-x-hidden antialiased">
        <AuthProvider>
          <GrainOverlay />
          <LeafCursor />
          <ImpersonationBanner />
          <Navbar />
          <AnimatePresence mode="wait" initial={false}>
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-screen"
            >
              {children}
            </motion.main>
          </AnimatePresence>
          <Toaster position="bottom-right" toastOptions={{
            style: { background: '#1c1c1c', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
          }} />
        </AuthProvider>
      </body>
    </html>
  );
}
