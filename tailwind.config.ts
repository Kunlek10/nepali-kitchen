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
        brand: "#E8472A",
        "brand-dark": "#C73D22",
        "brand-light": "#FFF0EE",
        "neutral-50": "#F7F7F7",
        "neutral-100": "#EBEBEB",
        "neutral-200": "#DDDDDD",
        "neutral-500": "#717171",
        "neutral-700": "#484848",
        "neutral-900": "#222222",
        // keep legacy names so existing components don't break
        saffron: "#E8472A",
        turmeric: "#C73D22",
        "deep-green": "#222222",
        cream: "#FFF0EE",
      },
      boxShadow: {
        card: "0 2px 16px rgba(0,0,0,0.12)",
        "card-hover": "0 4px 24px rgba(0,0,0,0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
