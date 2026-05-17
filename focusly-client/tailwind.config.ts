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
        "2xl": "1400px",
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
          DEFAULT: '#7c3eff',
          foreground: '#ffffff',
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        focusly: {
          50: '#f8f6ff',
          100: '#efe9ff',
          200: '#dfd1ff',
          300: '#c8b2ff',
          400: '#b28cff',
          500: '#9a63ff',
          600: '#7c3eff',
          700: '#5f2ad9',
          800: '#4a1f9f',
          900: '#33155f',
        },
        teal: {
          DEFAULT: '#0fb9b1',
          foreground: '#05201f',
        },
        surface: {
          DEFAULT: '#0b0b0c',
          muted: '#0f1113',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Newsreader", "Georgia", "serif"],
        "title-sm": ["Newsreader"],
        "label-caps": ["Inter"],
        "body-lg": ["Inter"],
        "display-lg": ["Newsreader"],
        "headline-md": ["Newsreader"],
        "body-sm": ["Inter"],
      },
      fontSize: {
        "title-sm": ["20px", { lineHeight: "28px", fontWeight: "500" }],
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "display-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "400" }],
        "headline-md": ["28px", { lineHeight: "36px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
      },
      spacing: {
        md: "16px",
        xs: "4px",
        xl: "40px",
        gutter: "12px",
        "margin-mobile": "20px",
        unit: "4px",
        sm: "8px",
        lg: "24px",
      },
      boxShadow: {
        "ring-subtle": "0 0 0 2px rgba(232, 230, 220, 0.5)",
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
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/forms')],
} satisfies Config;

export default config;
