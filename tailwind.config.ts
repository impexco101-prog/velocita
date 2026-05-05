import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0E1A",
        cards: "#0F1629",
        "card-border": "#1E2D4A",
        "gold-cta": "#D4A843",
        "success-green": "#10C27A",
        "text-primary": "#F0F4FF",
        "text-secondary": "#8B9DC3",
        "insight-blue": "#3B82F6",
      },
      fontFamily: {
        "playfair": ["var(--font-playfair)"],
        "dm-sans": ["var(--font-dm-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;
