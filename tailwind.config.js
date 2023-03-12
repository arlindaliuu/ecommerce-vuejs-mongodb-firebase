/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        title: "cursive;",
        content: ["'Jomolhari', serif", "'Libre Baskerville'", "serif', 'Tilt Warp', cursive'"]
      },
      backgroundImage:{
        main: "linear-gradient(to right, #ea580c, #df540c, #d5500b, #ca4c0b, #c0480a);",
        dashboard: "linear-gradient(to bottom, #00b7f8, #00aeef, #00a5e6, #009ddd, #0094d4);"
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}