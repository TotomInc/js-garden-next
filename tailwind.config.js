const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#262738",
        "code-background": "#2f3044",
        accent: "#61f4ef",
        "heading": "#e4e9f8",
        text: "#d5d9ee",
        "text-alt": "#b0bccc",
      },

      fontFamily: {
        assistant: ["Assistant", ...fontFamily.sans],
        sans: ["IBM Plex Sans", ...fontFamily.sans],
        mono: ["JetBrains Mono", ...fontFamily.mono],
      },

      typography: () => ({
        lg: {
          css: {
            "font-size": "16px",
            "line-height": "1.5",
          }
        },
        invert: {
          css: {
            "--tw-prose-invert-body": "#d5d9ee",
            "--tw-prose-bullets": "#898f9a",
          },
        },
      }),
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
  ],
};
