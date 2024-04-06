/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        'dela-gothic': ['"Dela Gothic One"', 'sans-serif'],
        'kanit': ['Kanit', 'sans-serif'],
        'reddit-mono': ['"Reddit Mono"', 'monospace'],
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        "hunyadi-yellow": "#F4AC45",
        "timberwolf": "#DAD6D6",
        "carribbean-green": "#037171",
        "persian-green": "#009F93",
      },
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
        "12xl": "14rem",
      },
      backdropBlur: {
        "4xl": "4rem",
      },
    },
  },

  plugins: [
    require('tailwind-scrollbar'),
  ],
};

module.exports = config;
