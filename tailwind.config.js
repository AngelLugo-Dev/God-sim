/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Trebuchet MS"', "Arial", "sans-serif"],
        body: ['"Trebuchet MS"', "Arial", "sans-serif"],
      },
      boxShadow: {
        pixel: "0 0 0 1px rgba(255,255,255,0.08), 0 18px 40px rgba(0,0,0,0.45)",
      },
      keyframes: {
        flash: {
          "0%, 100%": { opacity: "0" },
          "10%, 60%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        flash: "flash 0.45s ease-out",
        bob: "bob 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
