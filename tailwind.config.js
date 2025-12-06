/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'invader-pink': {
          DEFAULT: '#FF00FF',
          '500': '#FF00FF',
        },
        'invader-green': {
          DEFAULT: '#00FF00',
          '500': '#00FF00',
        },
      },
    },
  },
  plugins: [],
}
