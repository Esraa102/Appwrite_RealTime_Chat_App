/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#131315",
        bgSecondaryColor: "#18181B",
        mainColor: "#DB1A5A",
      },
    },
  },
  plugins: [],
};
