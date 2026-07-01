import type { Config } from "tailwindcss";

/**
 * AECODE Training — tokens surfaced to Tailwind as CSS-variable-driven colors.
 * Never hardcode a hex in a component; use these semantic names or var(--token).
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          active: "var(--primary-active)",
          50: "var(--primary-050)",
          100: "var(--primary-100)",
          200: "var(--primary-200)"
        },
        bg: "var(--bg)",
        surface: {
          DEFAULT: "var(--surface)",
          2: "var(--surface-2)",
          3: "var(--surface-3)"
        },
        line: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)"
        },
        ink: {
          DEFAULT: "var(--text)",
          2: "var(--text-2)",
          3: "var(--text-3)"
        },
        aec: {
          progress: "var(--aec-progress)",
          risk: "var(--aec-risk)",
          danger: "var(--aec-danger)",
          success: "var(--aec-success)",
          ai: "var(--aec-ai)"
        }
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"]
      },
      borderRadius: {
        xs: "var(--r-xs)",
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        xl: "var(--r-xl)"
      },
      maxWidth: {
        shell: "var(--max-w)"
      },
      boxShadow: {
        card: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
        glow: "var(--shadow-glow)"
      },
      transitionTimingFunction: {
        house: "cubic-bezier(0.23, 1, 0.32, 1)",
        spring: "cubic-bezier(0.34, 1.4, 0.64, 1)"
      }
    }
  },
  plugins: []
};

export default config;
