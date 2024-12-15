/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      maxWidth: {
        "screen-3xl": "1920px", // Укажите любое значение
        800: "47.059vw",
        hSticky: "40vw",
      },
      fontFamily: {
        sans: ["Inter Tight", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "gradient-main":
          "linear-gradient(129.25deg, #1F1F1F 27.52%, #9D4B0B 177.57%)",
        "gradient-card":
          "linear-gradient(101.24deg, rgba(255, 255, 255, 0.1) -4.32%, rgba(255, 255, 255, 0.05) 93.72%)",
      },
      fontSize: {
        "2xs": "0.647vw", // 11px
        h1: "3.765vw", // 64px
        h2: "2.353vw", // 40px
        h3: "1.647vw", // 28px
        140: "8.235vw", // 140px
      },
      borderRadius: {
        20: "20px",
      },
      scale: {
        120: "1.2",
      },
      width: {
        15: "3.75rem",
      },
      height: {
        15: "3.75rem",
        xl: "28.235vw",
        welcome: "calc(100dvh - 30px)",
        900: "52.941vw",
      },
      padding: {
        4.5: "0.875rem",
        15: "3.75rem",
        30: "7.5rem",
      },
      colors: {
        error: "#FF7575",
        default: "#1D1D1D",
        dark: {
          DEFAULT: "#0F0F0F",
          layer2: "#2B2B2B",
        },
        secondary: {
          DEFAULT: "#949494",
        },
        gDark: "#1F1F1F",
        gBrown: "#9D4B0B",
        lightGrey: "#F5F5F5",
        headerStickyBorder: "#F3F5F81A",
      },
    },
  },
  plugins: [],
};
