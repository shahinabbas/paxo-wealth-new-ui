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
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
        fadeIn: "fadeIn 1s ease-in forwards",
        slideDown: "slideDown 0.8s ease-out forwards",
        slideUp: "slideUp 0.8s ease-out forwards",
      },
      screens: {
        xs: "640px", // Default small screens
        sm: "768px", // Medium screens (small tablets)
        md: "1024px", // 1024x768 Larger tablets
        lg: "1280px", // 1280x720 resolution
        xl: "1440px", // 1440x900 (13-inch laptops)
        "2xl": "1792px", // 1792x1120 (16-inch laptops)
        "3xl": "1920px", // 1920x1080 (Full HD)
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      colors: {
        customGreen: {
          DEFAULT: "#1DF6A7",
        },
        customGreen1: {
          DEFAULT: "#0CB184",
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
