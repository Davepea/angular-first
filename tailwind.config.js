/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens:{
      xs: "300px",
      sm: "640px",
      md: "768px",
      xl: "1280px",
      ["2xl"]: "1530px"
    },
    extend: {},
  },
  plugins: [],
}
