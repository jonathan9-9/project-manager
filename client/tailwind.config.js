/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          50: "#f5e1f7",
          100: "#e2bbf0",
          200: "#d08ae7",
          300: "#b958de",
          400: "#a62ad4",
          500: "#8c20a7", // Primary purple color
          600: "#741c8a",
          700: "#5c1671",
          800: "#451255",
          900: "#2e0c3d",
        },
        slate: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#a6c1d9",
          300: "#7b99b7",
          400: "#536b8e",
          500: "#354563", // Primary gray slate color
          600: "#2b3950",
          700: "#222e3d",
          800: "#192231",
          900: "#0f1424",
        },
      },
    },
  },
  plugins: [],
};
