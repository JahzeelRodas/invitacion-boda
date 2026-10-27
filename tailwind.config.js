/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F5EF',
        silk: '#FFFCF7',
        champagne: '#D8C3A5',
        gold: {
          DEFAULT: '#B49A67',
          light: '#C9B183',
          dark: '#9A8152',
        },
        warm: '#77716A',
        ink: '#292723',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      keyframes: {
        eq: {
          '0%, 100%': { transform: 'scaleY(0.25)' },
          '50%': { transform: 'scaleY(1)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'eq-1': 'eq 1s ease-in-out infinite',
        'eq-2': 'eq 1s ease-in-out infinite',
        'eq-3': 'eq 1s ease-in-out infinite',
        drift: 'drift 2.4s ease-in-out infinite',
        'soft-pulse': 'soft-pulse 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
