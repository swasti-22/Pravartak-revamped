/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ivory: '#FDFBF7',
          sage: '#8DA399',
          forest: '#2C4A3E',
          slate: '#4F5E5B',
          saffron: '#E76F51',
          gold: '#C5A880',
        }
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(44, 74, 62, 0.05)',
        'warm-md': '0 4px 20px -4px rgba(44, 74, 62, 0.08)',
        'warm-lg': '0 12px 30px -6px rgba(44, 74, 62, 0.12)',
      }
    },
  },
  plugins: [],
}
