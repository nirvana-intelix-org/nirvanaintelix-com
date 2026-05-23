import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.json",
  ],
  safelist: [
    "md:col-span-5",
    "md:col-span-6",
    "md:col-span-7",
    "md:col-span-12",
    "aspect-[16/10]",
    "aspect-[21/9]",
    { pattern: /^from-\[#[0-9a-fA-F]{6}\]$/ },
    { pattern: /^to-\[#[0-9a-fA-F]{6}\]$/ },
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#f6f1e7",
          raised: "#fbf7ee",
          sunken: "#ece5d4",
        },
        ink: {
          DEFAULT: "#15161a",
          soft: "#2a2c33",
          muted: "#5e6068",
          dim: "#8a8c93",
          line: "#dcd3bf",
        },
        copper: {
          DEFAULT: "#bd5a1a",
          dim: "#8d4413",
          glow: "rgba(189, 90, 26, 0.12)",
        },
        teal: {
          DEFAULT: "#1b6359",
          dim: "#13473f",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        marquee: "marquee 45s linear infinite",
        blink: "blink 1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
