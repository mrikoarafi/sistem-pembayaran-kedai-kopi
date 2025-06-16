/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#fdf7f0",
          100: "#fbeee0",
          200: "#f6ddc0",
          300: "#efc296",
          400: "#e6a06a",
          500: "#de8147",
          600: "#d0683c",
          700: "#ad5134",
          800: "#8a4232",
          900: "#6f372a",
        },
      },
    },
  },
  plugins: [],
};
