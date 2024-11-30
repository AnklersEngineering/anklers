/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      fontSize: {
        h1: "60px",
        h2: "48px",
      },
      borderRadius: {
        20: "20px",
      },
      width: {
        15: "3.75rem",
      },
      height: {
        15: "3.75rem",
        xl: "480px",
        welcome: "calc(100dvh - 30px)",
      },
      padding: {
        4.5: "0.875rem",
        15: "3.75rem",
        30: "7.5rem",
      },
      colors: {
        default: "#1D1D1D",
        dark: {
          DEFAULT: "#1F1F1F",
        },
        secondary: {
          DEFAULT: "#949494",
        },
      },
    },
  },
  plugins: [],
};
