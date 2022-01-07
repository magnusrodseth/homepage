module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};

// Color palette:
// * Shades of gray
// * Shades of indigo, mostly indigo-300 and indigo-400
// * Shades of sky, mostly sky-100 and sky-200
// * Shades of lime, mostly lime-50, lime-100 and lime-200
