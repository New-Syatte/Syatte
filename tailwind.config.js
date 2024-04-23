module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bgGray: "#f9f9f9",
        primaryBlue: "#9bb5b5",
        lightGray: "#d9d9d9",
        darkGray: "#888",
        borderGray: "#ccc",
        tableBorderGray: "#e4e4e4",
        colorWhite: "#fff",
        colorBlack: "#222",
        colorRed: "#ff0000",
      },
      height: {
        headerHeight: "80px",
        footerHeight: "400px",
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
        GmarketSans: ["GmarketSans", "Helvetica", "Arial", "sans-serif"],
        NotoSansKR: [
          "var(--font-noto-sans-kr)",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
};
