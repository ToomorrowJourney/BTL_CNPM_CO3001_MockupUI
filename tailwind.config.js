/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding the HCMUT Blue color from the logo [cite: 1]
        'hcmut-blue': '#00558d', 
        'hcmut-light': '#e6f0f5',
      }
    },
  },
  plugins: [],
}