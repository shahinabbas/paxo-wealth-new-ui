const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 60s linear infinite", 
      },
      colors: {
        customGreen: {
          DEFAULT: "#1DF6A7",
        },
        customBlue: {
          DEFAULT: "#0056E0",
        },
        customYellow: {
          DEFAULT: "#FFCE3A",
        },
      },

      backgroundImage: {
        "custom-gradient-360":
          "linear-gradient(360deg, rgba(2,0,36,1) 0%, rgba(9,77,121,1) 61%, rgba(0,40,255,1) 100%)",
      },

      fontFamily: {
        meuthanies: ["Meuthanies", "sans-serif"], // Add the font family
        "sf-pro": ["SF Pro", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    // ...
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
