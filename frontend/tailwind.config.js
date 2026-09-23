/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        polar: {
          navy: '#0c1e33',
          dark: '#081424',
          midnight: '#0f2642',
          blue: '#1b64da',
          cyan: '#00a3e0',
          ice: '#eaf4fc',
          surface: '#f5f9fc',
          card: '#ffffff',
          border: '#e1ecf4',
          muted: '#64748b',
          accent: '#2563eb'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'polar-sm': '0 1px 3px rgba(12, 30, 51, 0.05), 0 1px 2px rgba(12, 30, 51, 0.03)',
        'polar-md': '0 4px 12px rgba(12, 30, 51, 0.06), 0 2px 4px rgba(12, 30, 51, 0.03)',
        'polar-lg': '0 10px 25px rgba(12, 30, 51, 0.08), 0 4px 10px rgba(12, 30, 51, 0.04)',
      }
    },
  },
  plugins: [],
}
