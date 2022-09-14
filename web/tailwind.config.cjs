/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
      },
      backgroundImage: {
        galaxy: "url('/Fundo.png')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 48.94%, #E1D55D 96.57%)',
        'game-gradient': 'linear-gradient(180deg, #00000000 23.08%, #121214cc 60%)'
      }
    },
  },
  plugins: [],
}
