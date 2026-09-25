/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#151c2e',
          900: '#0f172a',
          950: '#0b1120',
        },
        indigo: {
          950: '#1e1b4b',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.45), 0 0 20px 2px rgba(99, 102, 241, 0.25)',
        'glass-glow': '0 0 25px 2px rgba(99, 102, 241, 0.35)',
        'glass-inner': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px',
        'glass-lg': '24px',
      },
    },
  },
  plugins: [],
}
