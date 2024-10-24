import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        dynapuff: ['Dynapuff', 'cursive'],
      },
      perspective:{
        '1000': '1000px',
      },
      rotate:{
        'y-180': 'rotateY(180deg)',
      },
    },
  },
  plugins: [],
};

export default config;
