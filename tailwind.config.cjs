/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      "primary-font": "#f9f9f9",
      "secondary-font": "#333",
      "primary-bg":"rgb(174,174,238)"
    },
    extend: {},
  },
  plugins: [],
}
