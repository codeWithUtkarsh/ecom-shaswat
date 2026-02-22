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
        surface: {
          DEFAULT: "#FFFFFF",
          50: "#F5F7FA",
          100: "#EEF1F6",
          200: "#E2E5EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
        },
        navy: {
          DEFAULT: "#1B2A5B",
          light: "#2A3D7A",
          dark: "#111B3E",
          50: "#E8EBF4",
          100: "#C5CCE3",
          200: "#8C9AC5",
          300: "#5368A7",
          400: "#2A3D7A",
          500: "#1B2A5B",
          600: "#142047",
          700: "#0E1633",
        },
        orange: {
          DEFAULT: "#F5901F",
          light: "#F9A94D",
          dark: "#E07D10",
          50: "#FEF3E2",
          100: "#FDE4BD",
          200: "#FBCC82",
          300: "#F9A94D",
          400: "#F5901F",
          500: "#E07D10",
          600: "#B86508",
          700: "#8A4C06",
        },
        accent: {
          gold: "#FFD700",
          amber: "#FFBF00",
          warm: "#F5901F",
          rose: "#DC2626",
        },
        primary: {
          50: "#FEF3E2",
          100: "#FDE4BD",
          200: "#FBCC82",
          300: "#F9A94D",
          400: "#F5901F",
          500: "#E07D10",
          600: "#B86508",
          700: "#8A4C06",
          800: "#5C3304",
          900: "#2E1A02",
          950: "#170D01",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["DM Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brand:
          "0 0 15px rgba(27, 42, 91, 0.15), 0 0 45px rgba(27, 42, 91, 0.05)",
        "brand-sm": "0 0 10px rgba(27, 42, 91, 0.1)",
        "brand-lg":
          "0 0 30px rgba(27, 42, 91, 0.2), 0 0 80px rgba(27, 42, 91, 0.08)",
        "orange-glow":
          "0 0 15px rgba(245, 144, 31, 0.2), 0 0 45px rgba(245, 144, 31, 0.08)",
        soft: "0 2px 15px rgba(0, 0, 0, 0.06)",
        "soft-lg": "0 4px 25px rgba(0, 0, 0, 0.08)",
        "soft-xl": "0 8px 40px rgba(0, 0, 0, 0.1)",
        card: "0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
        "card-hover":
          "0 10px 30px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(27, 42, 91, 0.08)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        gradient: "gradientShift 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
