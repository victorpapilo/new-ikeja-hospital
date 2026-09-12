/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F6F4EF",
        sand: "#ECE3D2",
        teal: {
          50: "#EDFCFC",
          100: "#D3F6F8",
          200: "#91E9EE",
          300: "#4EDCE4",
          400: "#22D4DD",
          500: "#1DB2B9",
          600: "#18949A",
          700: "#13777C",
          800: "#0E5558",
          900: "#0B1F2A",
        },
        navy: "#0B1F2A",
        amber: "#D9A441",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        card: "0 20px 50px -20px rgba(11, 31, 42, 0.25)",
        soft: "0 10px 30px -12px rgba(11, 31, 42, 0.18)",
      },
      borderRadius: {
        xl2: "1.75rem",
      },
    },
  },
  plugins: [],
};
