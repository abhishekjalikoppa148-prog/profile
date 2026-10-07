/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#090909',
        secondaryBg: '#111111',
        darkSurface: '#161616',
        lavender: '#A89BBE',
        beige: '#D8C3A8',
        cream: '#F1E8D8',
        textPrimary: '#F5F2EE',
        textSecondary: '#B8B2B8',
        textMuted: '#77727A',
        glassBorder: 'rgba(216, 195, 168, 0.18)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
