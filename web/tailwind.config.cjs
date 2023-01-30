/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      colors: {
        'background-task': '#ebebeb',
        'border-input': '#f0f0f0',
        'icon-color': '#f0f0f0'
      }
    }
  },
  plugins: []
};
