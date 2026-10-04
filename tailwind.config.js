/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vyuha: {
          blue: '#071A3A',
          indigo: '#10102D',
          antiqueGold: '#D6A64B',
          divineGold: '#FFD778',
          saffron: '#E68A24',
          ivory: '#FFF1D0',
          lotusPink: '#E8A5B6',
          cyan: '#7EDCEB',
          darkBg: '#08091A',
          cardBg: 'rgba(16, 16, 45, 0.75)',
          borderGold: 'rgba(214, 166, 75, 0.4)',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'Cinzel Decorative', 'serif'],
        decorative: ['Cinzel Decorative', 'serif'],
        sanskrit: ['Yatra One', 'cursive', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'divine-glow': '0 0 25px rgba(255, 215, 120, 0.45)',
        'divine-glow-lg': '0 0 50px rgba(255, 215, 120, 0.6), 0 0 100px rgba(230, 138, 36, 0.3)',
        'saffron-glow': '0 0 25px rgba(230, 138, 36, 0.5)',
        'cyan-glow': '0 0 30px rgba(126, 220, 235, 0.4)',
        'lotus-glow': '0 0 30px rgba(232, 165, 182, 0.45)',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'spin-reverse-slow': 'spinReverse 40s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gate-glow': 'gateGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gateGlow: {
          '0%': { filter: 'drop-shadow(0 0 8px rgba(214, 166, 75, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(255, 215, 120, 0.9))' },
        }
      }
    },
  },
  plugins: [],
}
