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
        content: "'Libre Baskerville', serif;"
      },
      backgroundImage:{
        main: "linear-gradient(to right, #ea580c, #df540c, #d5500b, #ca4c0b, #c0480a);"
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}