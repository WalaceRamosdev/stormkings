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
        storm: {
          950: "#02040a",
          900: "#0a0f1c",
          800: "#151e32",
          blue: "#00f0ff",
          silver: "#cbd5e1",
          gold: "#ffd700",
        },
      },
      backgroundImage: {
        'storm-gradient': "linear-gradient(to bottom, #02040a, #0a0f1c)",
        'neon-glow': "radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(2,4,10,0) 70%)",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-rajdhani)', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
