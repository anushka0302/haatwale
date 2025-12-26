import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",      // Scans app folder
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",    // Scans pages folder
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Scans components
    "./src/**/*.{js,ts,jsx,tsx,mdx}"       // Scans src (just in case)
  ],
  theme: {
    extend: {
      colors: {
        // Dark Green from "HAATWALE" Text
        brandDark: "#1E4A26", 
        // Fresh Leaf Green from Logo Icon
        brandPrimary: "#6DAE44", 
        // Orange from the Swoosh
        brandAccent: "#F59E0B", 
        // Very Light Mint for Backgrounds (Modern Look)
        brandLight: "#F3F9F4", 
        // Neutral Dark Text
        darkText: "#1F2937",    
      },
      fontFamily: {
        // Changed to Modern Sans-Serif for a clean look
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'], 
      },
      // --- NEW ANIMATIONS FOR HERO SCENE ---
      animation: {
        'sun': 'spin 20s linear infinite',
        'cloud-slow': 'float 25s linear infinite',
        'cloud-fast': 'float 15s linear infinite',
        'crop': 'sway 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        }
      },
    },
  },
  plugins: [],
};
export default config;