/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: '#2f855a',
        bubblegum: '#ff6b9f',
      },
    },
  },
  plugins: [],
};
