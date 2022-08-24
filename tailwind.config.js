/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        fancy: "url(../public/cursor/cursor.svg), pointer",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
