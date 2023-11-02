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
      fontFamily: {
        poppins: ['Poppins'],
      },
      
      backgroundImage: {
        'login-pattern': "url('../public/images/login-title.png')",
      },

      colors: {
        'pp-red': '#FF1053',
        'pp-accentred': '#9C133A',

        'pp-blue': '#88D9E6',
        'pp-accentblue': '#5F98A1',

        'pp-green': '#BEE460',
        'pp-accentgreen': '#778C42',
        
        'pp-gray': '#2E2A36',
        'pp-accentgray': '#413D48',

        'pp-darkpurple': '#190B28',
        'pp-lightpurple': '#6C6EA0',
      },
    },
  },
  plugins: [],
};
