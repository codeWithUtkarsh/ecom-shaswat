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
        // Warm cream backgrounds
        cream: {
          DEFAULT: "#faf7f2",
          50: "#fefdfb",
          100: "#faf7f2",
          200: "#f3ede3",
          300: "#e8dfd0",
          400: "#d4c7b0",
          500: "#b8a88e",
        },
        // Deep forest green — primary brand
        forest: {
          DEFAULT: "#1a3a2a",
          50: "#eef5f1",
          100: "#d5e8dc",
          200: "#a8d1b5",
          300: "#6fb48a",
          400: "#3d8a5e",
          500: "#1a3a2a",
          600: "#153024",
          700: "#10251b",
          800: "#0b1a13",
          900: "#06100a",
        },
        // Warm terracotta/copper — accent
        terra: {
          DEFAULT: "#c17f59",
          50: "#fdf4ee",
          100: "#f9e5d5",
          200: "#f2c9aa",
          300: "#e5a577",
          400: "#c17f59",
          500: "#a66842",
          600: "#8a5435",
          700: "#6e4029",
          800: "#532e1e",
          900: "#3a1f14",
        },
        // Rich gold — premium indicators
        gold: {
          DEFAULT: "#b8860b",
          50: "#fdf8eb",
          100: "#f9edc6",
          200: "#f0d68a",
          300: "#e4ba4e",
          400: "#d4a017",
          500: "#b8860b",
          600: "#946c09",
          700: "#705107",
        },
        // Warm neutrals for text & surfaces
        bark: {
          DEFAULT: "#1a1a17",
          50: "#f7f6f4",
          100: "#eeedea",
          200: "#dddbd6",
          300: "#c4c0b8",
          400: "#a09a8e",
          500: "#7a7265",
          600: "#5c5549",
          700: "#3d3830",
          800: "#272420",
          900: "#1a1a17",
        },
        // Sage green — secondary surfaces
        sage: {
          DEFAULT: "#8fa690",
          50: "#f2f5f2",
          100: "#e0e8e1",
          200: "#c2d1c3",
          300: "#a3b9a4",
          400: "#8fa690",
          500: "#6e8a6f",
          600: "#556d56",
          700: "#3d4f3e",
        },
        // Accent colors
        accent: {
          rose: "#c44536",
          emerald: "#2d6a4f",
          amber: "#e09f3e",
        },
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "-apple-system", "sans-serif"],
        display: [
          "Fraunces",
          "Georgia",
          "Cambria",
          "serif",
        ],
      },
      boxShadow: {
        soft: "0 2px 16px rgba(26, 58, 42, 0.06)",
        "soft-lg": "0 4px 28px rgba(26, 58, 42, 0.08)",
        "soft-xl": "0 8px 44px rgba(26, 58, 42, 0.1)",
        card: "0 1px 4px rgba(26, 26, 23, 0.04), 0 0 0 1px rgba(26, 58, 42, 0.03)",
        "card-hover":
          "0 12px 36px rgba(26, 58, 42, 0.1), 0 0 0 1px rgba(26, 58, 42, 0.06)",
        "warm-glow":
          "0 0 20px rgba(193, 127, 89, 0.15), 0 0 60px rgba(193, 127, 89, 0.06)",
        "forest-glow":
          "0 0 20px rgba(26, 58, 42, 0.12), 0 0 60px rgba(26, 58, 42, 0.04)",
        inner: "inset 0 2px 4px rgba(26, 26, 23, 0.04)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out both",
        "fade-up": "fadeUp 0.6s ease-out both",
        "fade-up-slow": "fadeUp 0.8s ease-out both",
        "slide-in-right": "slideInRight 0.5s ease-out both",
        "scale-in": "scaleIn 0.4s ease-out both",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
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
