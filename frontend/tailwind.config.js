/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        base:'#ED0049',
        primary:"#FFFFFF",
        secondary:'#0F518C'
      }
    },
  },
  plugins: [],
}

