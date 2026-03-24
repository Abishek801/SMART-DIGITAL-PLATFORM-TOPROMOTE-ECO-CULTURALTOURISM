import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        moss: "var(--moss)",
        canopy: "var(--canopy)",
        leaf: "var(--leaf)",
        sage: "var(--sage)",
        mist: "var(--mist)",
        earth: "var(--earth)",
        clay: "var(--clay)",
        sand: "var(--sand)",
        gold: "var(--gold)",
        white: "var(--white)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        heading: ["var(--font-clash)", "sans-serif"],
        body: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "fluid-hero": "clamp(3.5rem, 8vw, 7.5rem)", // clamp(56px, 8vw, 120px)
        "fluid-section": "clamp(2.25rem, 5vw, 4.5rem)", // clamp(36px, 5vw, 72px)
        "fluid-card": "clamp(1.25rem, 2.5vw, 2rem)", // clamp(20px, 2.5vw, 32px)
      },
      lineHeight: {
        tight: "0.9", // editorial tight
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      spacing: {
        '2xs': '8px',
        'xs': '16px',
        'sm': '24px',
        'md': '32px',
        'lg': '64px',
        'xl': '80px', // max-width side padding
        '2xl': '120px', // vertical padding
      },
      borderRadius: {
        input: '4px',
        cardSmall: '12px',
        card: '20px',
        panel: '32px',
        pill: '9999px',
      },
      backgroundImage: {
        "gradient-radial": "var(--bg-gradient)",
        "gradient-surface": "linear-gradient(180deg, rgba(45,90,61,0.08) 0%, rgba(28,56,41,0) 100%)",
      },
      boxShadow: {
        'surface': 'inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 3px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3)',
      },
      animation: {
        "marquee": "marquee 35s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.7s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slideUp: {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
