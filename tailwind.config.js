/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mooli: ['Mooli', 'sans-serif'],
        robotoslab: ['Roboto Slab', 'serif'],
      },
    },
  },
  plugins: [],
}
