module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bgGray: "#fcfcfc",
        lightGray: "#d9d9d9",
        darkGray: "#888",
        borderGray: "#ccc",
        tableBorderGray: "#eee",
        colorWhite: "#fff",
        colorBlack: "#222",
        colorRed: "#ff0000",
      },
      height: {
        headerHeight: "70px",
        footerHeight: "384px",
      },
      minHeight: {
        contentHeight: "calc(100vh - headerHeight - footerHeight)",
      },
      fontFamily: {
        helvetica: ["Helvetica", "Arial", "sans-serif"],
        garamond: ["var(--font-garamond)"],
        family: ["var(--font-garamond)", "Helvetica", "Arial", "sans-serif"],
        kor: ["Helvetica", "Arial", "sans-serif"],
        eng: ["var(--font-garamond)", "Helvetica", "Arial", "sans-serif"],
        crimson: ["var(--font-crimson)"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
