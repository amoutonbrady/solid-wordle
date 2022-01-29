module.exports = {
  content: ["index.html", "src/**/*.ts", "src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        correct: "var(--green)",
        present: "var(--yellow)",
        absent: "var(--gray)",
      },
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
        "slide-in": "slide-in 100ms linear",
        "slide-out": "slide-out 150ms linear",
        flip: "flip 400ms ease-in var(--delay, 0ms) forwards",
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
        flip: {
          "0%": { transform: "rotateX(0)" },
          "50%": { transform: "rotateX(-90deg)" },
          "100%": {
            transform: "rotateX(0)",
            background: "var(--background, transparent)",
            "border-color": "var(--background, transparent)",
            color: "white",
          },
        },
        "slide-in": {
          "0%": {
            "--tw-translate-y": "30px",
            opacity: 0,
          },
          "100%": {
            "--tw-translate-y": "0",
            opacity: 1,
          },
        },
        "slide-out": {
          "0%": {
            "--tw-translate-y": "0",
            opacity: "1",
          },
          "90%": {
            opacity: "0",
          },
          "100%": {
            opacity: "0",
            "--tw-translate-y": "60px",
          },
        },
      },
    },
  },
};
