/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'comic-red': '#ff375f',
        'comic-blue': '#00a8ff',
        'comic-yellow': '#ffcc00',
        'comic-purple': '#9c51ff',
        'comic-dark': '#1a1a2e',
        'comic-green': '#10b981',
      },
      animation: {
        'comic-bounce': 'comicBounce 2s ease-in-out infinite',
        'spin-comic': 'spinComic 1.5s linear infinite',
        'float-comic': 'floatComic 3s ease-in-out infinite',
        'shake-comic': 'shakeComic 0.5s ease-in-out',
        'pulse-comic': 'pulseComic 2s ease-in-out infinite',
        'actionLine': 'actionLine 2s linear infinite',
      },
      keyframes: {
        comicBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spinComic: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        floatComic: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(5deg)' },
          '66%': { transform: 'translateY(5px) rotate(-5deg)' },
        },
        shakeComic: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        pulseComic: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
        actionLine: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        }
      },
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        'comic': ['Comic Neue', 'cursive'],
        'nunito': ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}