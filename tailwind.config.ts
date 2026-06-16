import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#333333",
        primary: "#CC3366",
        text: "#333333",
        "text-muted": "#B3B3B3",
      },
      borderRadius: {
        sm: "3px",
        md: "50px",
        lg: "2px",
        xl: "4px",
      },
      fontFamily: {
        display: ["-apple-system", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
