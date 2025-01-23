/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#fffaf9',  // Replace with your desired hex color or name
      },
    },
  },
  plugins: [],
}

