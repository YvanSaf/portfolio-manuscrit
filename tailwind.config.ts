import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kraft: "#E7E0CE",
        "kraft-light": "#F2ECDC",
        "paper-white": "#FBF8F0",
        ink: "#1C1916",
        "ink-soft": "#46403A",
        guide: "#B8AE99",
        red: "#C23B22",
      },
      fontFamily: {
        "anime-ace": ["Anime Ace", "Kalam", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;