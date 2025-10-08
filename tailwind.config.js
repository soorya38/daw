/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    letterSpacing: {
      widest: ".25em",
    },
    extend: {
      colors: {
        "primary": "#2d1b2e",
        "secondary": "#fff5f7",
        "romantic-rose": "#ff6b9d",
        "romantic-pink": "#ffb3d9",
        "romantic-lavender": "#c9a0dc",
        "romantic-cream": "#ffeef3",
        "romantic-gold": "#d4af37",
        "romantic-burgundy": "#8b4567",
        "light-green": "#ff6b9d",
        "light-red": "#ff6b9d",
        "light-blue": "#ffb3d9",
        "light-gray": "#c9a0dc",
      },
    },
  },
  plugins: [],
}
