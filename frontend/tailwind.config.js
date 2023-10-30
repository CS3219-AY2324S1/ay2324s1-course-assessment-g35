/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pp-red': '#FF1053',
        'pp-blue': '#88D9E6',
        'pp-gray': '#2E2A36',
        'pp-darkpurple': '#190B28',
        'pp-lightpurple': '#6C6EA0',
      },
    },
  },
  plugins: [],
};
