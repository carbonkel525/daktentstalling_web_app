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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        // mobile covers all screens up to iPhone 15 Pro Max size (430px)
        'mobile': {'max': '430px'}, 
        
        // desk is for all screens larger than iPhone 15 Pro Max (431px and up)
        'desk': {'min': '431px'},
      },
    },
  },
  plugins: [],
};
export default config;
