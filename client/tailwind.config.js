/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: { 
      colors: {
      'greendark': '#41B06E',
      'sky': '#141E46',
      'lowyellow': '#FFF5E0',
      'lowgreen': '8DECB4',
      'black': '#000000',
      'white': '#FFF7FC',
      'coral': '#FF7F50',
    },},
  },
  plugins: [],
}