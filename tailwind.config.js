/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      maxWidth: {
        'screen-3xl': '1920px', // Укажите любое значение
      },
      fontFamily: {
        sans: ['Inter Tight', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        h1: "64px",
        h2: "40px",
        h3: "28px",
        '140': "140px",
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
        '900': '900px'
      },
      padding: {
        4.5: "0.875rem",
        15: "3.75rem",
        30: "7.5rem",
      },
      colors: {
        default: "#1D1D1D",
        dark: {
          DEFAULT: "#0F0F0F",
        },
        secondary: {
          DEFAULT: "#949494",
        },
        gDark: "#1F1F1F",
        gBrown: "#9D4B0B",
        lightGrey: '#F5F5F5'
      },
    },
  },
  plugins: [],
};
