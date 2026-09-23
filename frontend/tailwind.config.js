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
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'polar-sm': '0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)',
        'polar-md': '0 4px 16px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.03)',
        'polar-lg': '0 12px 32px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04)',
        'polar-glow': '0 0 30px rgba(14, 165, 233, 0.25)',
      }
    },
  },
  plugins: [],
}
