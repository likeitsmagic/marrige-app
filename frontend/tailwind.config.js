const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'goudy': ['"Goudy Bookletter 1911"', 'serif'],
      },
      maxWidth: {
        'screen-2xl': '2560px',
        'screen-xl': '1560px',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#761111",
            foreground: "#ffffff",
            "500": "#d17a73"
          }
        }
      }
    },
  })]
}

