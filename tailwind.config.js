/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        poppin: ["Poppins"],
      },
      backgroundImage: {
        staticBanner: "url('images/banner-static-firma.webp')",
      },
    },
  },
  plugins: [],
};
