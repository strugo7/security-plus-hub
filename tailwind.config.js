/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        section: {
          1: '#3b82f6',
          2: '#ef4444',
          3: '#22c55e',
          4: '#f97316',
          5: '#a855f7',
        },
        "primary": "#137fec",
        "primary-dark": "#1557b0",
        "terminal-green": "#0f0",
        "terminal-cyan": "#0ff",
        "background-dark": "#101922",
        "grid-blue": "#0a192f",
        "accent": "#00d4ff",
        "background-light": "#f6f7f8",
        "card-dark": "#192633",
        "card-hover": "#233648",
        "text-secondary": "#92adc9",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        display: ['Lexend', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #0a192f 1px, transparent 1px), linear-gradient(to bottom, #0a192f 1px, transparent 1px)",
        'cyber-gradient': 'linear-gradient(135deg, rgba(19, 127, 236, 0.1) 0%, rgba(16, 25, 34, 0) 100%)',
        'badge-glow': 'radial-gradient(circle, rgba(19,127,236,0.3) 0%, rgba(16,25,34,0) 70%)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s step-end infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
