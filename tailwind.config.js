module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bgGray: "#f5f5f7",
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
        inter: ["var(--font-inter)"],
        family: [
          "var(--font-garamond)",
          "Helvetica",
          "var(--font-inter)",
          "Arial",
          "sans-serif",
        ],
        kor: ["Helvetica", "var(--font-inter)", "sans-serif"],
        eng: ["var(--font-garamond)", "Helvetica", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
