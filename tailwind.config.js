module.exports = {
  content: ["index.html", "src/**/*.ts", "src/**/*.tsx"],
  theme: {
    extend: {
      inset: {
        "1/10": "10%",
      },
      flex: {
        0.5: "0.5 1 0%",
        1.5: "1.5 1 0%",
      },
      animation: {
        shake: "shake 600ms",
        "pop-in": "pop-in 100ms",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translateX(-1px)",
          },
          "20%, 80%": {
            transform: "translateX(2px)",
          },
          "30%, 50%, 70%": {
            transform: "translateX(-4px)",
          },
          "40%, 60%": {
            transform: "translateX(4px)",
          },
        },
        "pop-in": {
          from: {
            transform: "scale(0.8)",
            opacity: "0",
          },

          "40%": {
            transform: "scale(1.1)",
            opacity: "1",
          },
        },
      },
    },
  },
};
