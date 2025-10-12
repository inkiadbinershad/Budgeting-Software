/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      // Custom gold palette matching the provided swatch
      colors: {
        gold: {
          50:  '#FFF8DC', // very light gold (cornsilk-like)
          100: '#FFE9A9',
          200: '#FCD875',
          300: '#F0C24C',
          400: '#D9A520', // goldenrod mid
          500: '#C69311', // rich gold
          600: '#AD7E0A',
          700: '#8C6505', // deep gold
          800: '#6E4D03',
          900: '#553A02', // darkest
        },
      },
      // Reusable shiny gold gradient
      backgroundImage: theme => ({
        'gold-shine': `linear-gradient(90deg, ${theme('colors.gold.100')} 0%, ${theme('colors.gold.400')} 45%, ${theme('colors.gold.700')} 100%)`,
      }),
    },
  },
  plugins: [],
}
