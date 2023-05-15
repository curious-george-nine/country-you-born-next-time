/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
