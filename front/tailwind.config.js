/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        snack: " rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
      },
      colors: {
        "snack-blue": "#2D3857",
        "snack-orange": "#EA6a62",
        "snack-sky": "#1f8ce6",
        "snack-pink": "#FF69b4",

        "choco-green-100": "#5a9e70",
        "choco-green-200": "#344b3c",

        "choco-gray-100": "#CFD2D6",
        "choco-gray-200": "#ACB3B9",
        "choco-gray-300": "#4a4e51",

        "choco-text-light": "hsl(210,8%,25%)",
        "choco-text-dark": "hsl(210,8%,82.5%)",

        "choco-gold-100": "hsl(48,100%,50%)",
        "choco-gold-200": "hsl(45,100%,47%)",
        "choco-gold-300": "hsl(48,22%,30%)",
        "choco-silver-100": "hsl(210,6%,72%)",
        "choco-silver-200": "hsl(210,3%,61%)",
        "choco-silver-300": "hsl(0,0%,26%)",
        "choco-bronze-100": "hsl(28,38%,67%)",
        "choco-bronze-200": "hsl(28,31%,52%)",
        "choco-bronze-300": "hsl(28,13%,27%)",
      },
    },
  },
  plugins: [],
};
