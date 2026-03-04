/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Bungee', 'cursive'],
        'display-shade': ['Bungee Shade', 'cursive'],
        'sans': ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif']
      },
      colors: {
        'primary-blue': '#2f3691',
        'accent-yellow': '#f8cb47',
        'accent-red': '#dc2328',
        'accent-pink': '#ee7295'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
