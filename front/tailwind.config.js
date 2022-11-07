/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        snack: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
      },
      colors: {
        "snack-blue": "#2D3857",
        "snack-orange": "#EA6a62",
        "snack-sky": "#1f8ce6",
        "snack-pink": "#FF69b4",
        "snack-gold": "#ffcf40",
      },
    },
  },
  plugins: [],
};
