/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'beige':{
          100:"#F5F5DC",
        },
        'darkblue':{
          100:"#000080",
        },
        'darkgreen':{
          100:"#008000",
        },
        'pink':{
          100:"#f973a0"
        }
      },
      backgroundImage:{
        main: "linear-gradient(to right, #ea580c, #df540c, #d5500b, #ca4c0b, #c0480a);",
        dashboard: "linear-gradient(to bottom, #00b7f8, #00aeef, #00a5e6, #009ddd, #0094d4);",
        login:"linear-gradient(to right bottom, #f5f5dc, #efefce, #eae9c0, #e4e4b3, #dedea5);",
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}