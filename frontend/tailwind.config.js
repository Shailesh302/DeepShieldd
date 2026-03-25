/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ds: {
          dark: '#0f141e',
          card: '#161c28',
          cardHover: '#1c2438',
          border: '#2a344a',
          accent: '#84cc16', // green
          accentHover: '#a3e635',
          text: '#f8fafc',
          muted: '#94a3b8',
          red: '#ef4444',
          redMuted: '#7f1d1d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
