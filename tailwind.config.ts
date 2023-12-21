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
        background: "#f6f8fc",
        foreground: "#fcfcfc",
        elements: "#f7f7f7",
      },
      maxWidth: {
        "8xl": "96rem",
      },
      boxShadow: {
        poke: "0 10px 20px 2px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
