/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfeff',
          600: '#0891b2',
          700: '#0e7490',
        },
      },
    },
  },
  plugins: [],
};
