/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'nutrtion-bg' : "url('/nutrition.jpeg')", 
      },
      backdropFilter: {
        'bg-color' : 'rgba(255, 255, 255, 0.2)',
        'blur-saturate': 'blur(20px) saturate(160%) contrast(45%) brightness(140%)',
      },
    },
  },
  plugins: [],
};
