import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./data/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        aecode: {
          bg: "#0E1121",
          bg2: "#0D0F1F",
          nav: "#0C0F29",
          card: "#222341",
          border: "#3A4065",
          text: "#EEF3F8",
          muted: "#A2B4CB",
          lavender: "#C5CFFA",
          indigo: "#4A3AC1",
          violet: "#7C7EDF",
          violet2: "#8F60EA",
          blue: "#4465EE",
          green: "#47CF78",
          mint: "#95E3B1",
          light: "#EDEBF9",
          darkText: "#2A2C3A",
          amber: "#F8B84E",
          coral: "#FF7A66",
          cyan: "#69D2FF"
        }
      },
      fontFamily: {
        sans: ["Inter", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 90px rgba(124, 126, 223, 0.24)",
        mint: "0 18px 60px rgba(71, 207, 120, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
