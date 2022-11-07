/** @type {import('tailwindcss').Config} */
module.exports = {
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
        "snack-gold": "#ffd700",
      },
    },
  },
  plugins: [],
};
