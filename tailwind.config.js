/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      keyframes: {
        "bounce-glow": {
          "0%, 100%": {
            transform: "translateY(0)",
            opacity: "0.5",
            boxShadow: "0 0 0px #60a5fa",
          },
          "50%": {
            transform: "translateY(-10px)",
            opacity: "1",
            boxShadow: "0 0 8px #60a5fa",
          },
        },
      },
      animation: {
        "bounce-glow": "bounce-glow 1s infinite ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/animate")],
};
