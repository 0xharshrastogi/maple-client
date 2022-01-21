module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        uiBlue: "#0033A0",
        uiWhite: "#F2F2F2",
        uiBlueLight: "#E7F2F2",
        uiRed: "#FF4242",
        uiGray: "#2D2D2A",
        uiGrayLight: "#4B4D4D",
      },
      fontFamily: {
        ["TTNorms"]: ["TTNorms", "sans-serif"],
      },
    },
  },
  plugins: [],
};
