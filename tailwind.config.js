/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // Just-in-Time mode for faster compilation (requires Tailwind CSS v2.2.0 or later)
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], // Paths to your project's HTML or JSX files
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
