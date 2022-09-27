const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#262738",
        "code-background": "#2f3044",
        accent: "#3dffc5",
      },

      fontFamily: {
        assistant: ["Assistant", ...fontFamily.sans],
        sans: ["PT Serif", ...fontFamily.sans],
        mono: ["JetBrains Mono", ...fontFamily.mono],
      },

      typography: () => ({
        lg: {
          css: {
            "font-size": "19px",
          }
        },
        invert: {
          css: {
            "--tw-prose-invert-body": "#d5d9ee"
          },
        },
      }),
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
  ],
};
