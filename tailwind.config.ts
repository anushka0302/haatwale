import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandDark: "#1E4A26",    
        brandPrimary: "#6DAE44", 
        brandAccent: "#EC9706",  
        brandLight: "#F3F9F4",   
      },
      animation: {
        // Reduced from 40s to 15s for faster movement
        'infinite-scroll': 'infinite-scroll 10s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        }
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;