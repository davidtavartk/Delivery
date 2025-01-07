/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [ 'Custom-Sans', 'sans-serif'],
      },
      colors: {
        "c-yel": "#FFC244",
        "c-green": "#00A082",
        "c-green-h": "#00846B",
        "c-green-f": "#006653",
        "c-light-green": "#E9F8F5"
      },
      backgroundImage: {
        "mark": "linear-gradient(to bottom, transparent 65%, #FFC244 10%)",
        "mark1": "linear-gradient(to bottom, transparent 65%, #FFF 10%)"
      },
      boxShadow: {
        'custom-shadow': 'inset 0 0 0 0.0625rem rgba(0, 0, 0, 0.9)',
      },
    },
  },
  plugins: []
};
