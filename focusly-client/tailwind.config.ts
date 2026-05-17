import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /* Focusly Design System — Architectural Night Sky */
        "night-sky": "#1f1f29",
        "cofounder-blue": "#0081c0",
        "action-azure": "#41a1cf",
        "pitch-black": "#000000",
        "canvas-white": "#ffffff",
        "off-white": "#fefffc",
        "ash-gray": "#f9faf7",
        "cool-gray": "#eef1ed",
        "steel-gray": "#dee2de",
        "dark-charcoal": "#171717",
        charcoal: "#2c2c2c",
        "rich-black": "#282834",
        "slate-gray": "#444141",
        "medium-gray": "#646464",
        "light-gray": "#b4b8b4",

        /* Material Design surface tokens (from DESIGN.md) */
        "surface-dim": "#ddd9da",
        "surface-bright": "#fcf8f9",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f7f3f3",
        "surface-container": "#f1edee",
        "surface-container-high": "#ebe7e8",
        "surface-container-highest": "#e5e1e2",
        "on-surface": "#1c1b1c",
        "on-surface-variant": "#47464b",
        "inverse-surface": "#313031",
        "inverse-on-surface": "#f4f0f0",
        outline: "#78767c",
        "outline-variant": "#c8c5cc",
        "surface-tint": "#5e5d69",
        "primary-token": "#070710",
        "on-primary": "#ffffff",
        "primary-container": "#1f1f29",
        "on-primary-container": "#878693",
        "inverse-primary": "#c7c5d3",
        "secondary-token": "#006496",
        "on-secondary": "#ffffff",
        "secondary-container": "#60bbfe",
        "on-secondary-container": "#004970",
        tertiary: "#0c0801",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#252011",
        "on-tertiary-container": "#908773",
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        "primary-fixed": "#e3e1ef",
        "primary-fixed-dim": "#c7c5d3",
        "on-primary-fixed": "#1b1b25",
        "on-primary-fixed-variant": "#464651",
        "secondary-fixed": "#cce5ff",
        "secondary-fixed-dim": "#90cdff",
        "on-secondary-fixed": "#001e31",
        "on-secondary-fixed-variant": "#004b72",
        "tertiary-fixed": "#ece2ca",
        "tertiary-fixed-dim": "#d0c6af",
        "on-tertiary-fixed": "#201b0d",
        "on-tertiary-fixed-variant": "#4d4635",
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
        none: "0px",
        "cards-sm": "12px",
        "cards-md": "16px",
        "cards-lg": "24px",
        "nav-items": "8px",
        "nav-pill": "50.496px",
        full: "9999px",
      },
      fontFamily: {
        display: ["Noto Serif", "Georgia", "serif"],
        "heading-lg": ["Noto Serif", "Georgia", "serif"],
        heading: ["Noto Serif", "Georgia", "serif"],
        subheading: ["Hanken Grotesk", "system-ui", "sans-serif"],
        "button-label": ["Hanken Grotesk", "system-ui", "sans-serif"],
        body: ["Hanken Grotesk", "system-ui", "sans-serif"],
        caption: ["Hanken Grotesk", "system-ui", "sans-serif"],
      },
      fontSize: {
        caption: [
          "13px",
          { lineHeight: "1.5", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        "button-label": [
          "16px",
          { lineHeight: "1", letterSpacing: "-0.012em", fontWeight: "600" },
        ],
        subheading: [
          "18px",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "500" },
        ],
        heading: [
          "40px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "heading-lg": [
          "48px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        display: [
          "54px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
      },
      spacing: {
        base: "4px",
        "element-gap": "8px",
        "card-padding": "16px",
        "section-gap": "32px",
        "max-width": "1200px",
      },
      boxShadow: {
        "nav-item": "rgba(0, 0, 0, 0.15) 0px 2px 6px 0px",
        card: "rgba(0, 0, 0, 0.08) 0px 1px 1px 0px, rgba(0, 0, 0, 0.08) 0px 4px 5px 0px",
        "cofounder-card":
          "rgba(0, 0, 0, 0.06) 0px 2px 2px 0px, rgba(0, 0, 0, 0) 0px 6px 6px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 5px",
        "input-subtle": "rgba(0, 0, 0, 0.05) 0px 1px 8px 0px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
} satisfies Config;

export default config;
