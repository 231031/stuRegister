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
      'sky': '#96C6C6',
      'lowyellow': '#FFF5E0',
      'lowgreen': '#264E58',
      'darkgreen': '#112D31',
      'lowbrown': '#6E6659',
      'darkbrown': '#4E4A41',
      'black': '#000000',
      'white': '#FFF7FC',
      'Slate' : '#cbd5e1'
    },
    flex:{
      

    }},
  },
  plugins: [],
}
