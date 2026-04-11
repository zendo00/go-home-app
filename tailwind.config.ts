import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Work Sans'", "sans-serif"],
      },
      colors: {
        goBlue: "#3F51B5",
        homeGreen: "#4CAF50",
        headerGreen: "#4CAF50",
        navBlack: "#1a1a1a",
        navBorder: "#f5f5f5",
      },
      clipPath: {
        "rounded-arrow-right": "polygon(0% 0%, 82% 0%, 100% 50%, 82% 100%, 0% 100%, 0% 0%)",
      },
    },
  },
  plugins: [],
};
export default config;
