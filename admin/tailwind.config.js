/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: '#0077B6',
        sand: '#F4E4C1',
        coral: '#FF6B6B',
        palm: '#2D6A4F',
        cream: '#FAF8F5',
      },
    },
  },
  plugins: [],
};
