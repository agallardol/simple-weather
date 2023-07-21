/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/**/*.{html,ts}',
  ],
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}'],
  },
  theme: {

    extend: {
      colors: {
        'ria-blue': 'rgb(0, 94, 186)',
        'ria-light-blue': 'rgb(0, 183, 218)',
        'ria-gray': 'rgb(138, 138, 138)',
      },
    },
  },
  plugins: [],
}

