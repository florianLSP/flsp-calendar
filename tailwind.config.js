/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        flsp: {
          light_red: '#fee2e2',
          medium_red: '#fecaca',
          dark_red: '#7f1c1c',
          light_green: '#dcfce7',
          medium_green: '#bbf7d0',
          dark_green: '#14532d',
          light_gray: '#e5e7eb',
          medium_gray: '#d1d5db',
          dark_gray: '#9ca3af',
          light_blue: '#dbeafe',
          medium_blue: '#bfdbfe',
          dark_blue: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}
