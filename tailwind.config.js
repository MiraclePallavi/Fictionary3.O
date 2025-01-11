/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',
    './src/**/*.{js,ts,jsx,tsx}',],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '20px',
        'xl': '16px',
      },
      boxShadow: {
        green: "0 0 10px 4px rgba(0, 255, 0, 0.8)",
        red: "0 0 10px 4px rgba(255, 0, 0, 0.8)",
      },
      screens: {
        // Define a custom breakpoint for 1000px
        lg1000: "1000px", 
      },
    },
  },
  plugins: ['tailwindcss-filters'],
}

