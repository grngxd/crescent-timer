/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        x: {
          300: "#b8b9bb",
          400: "#12151e",
          500: "#0B0E17"
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}