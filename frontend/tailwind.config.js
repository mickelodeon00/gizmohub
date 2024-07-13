/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        h1: '2em', // 32px
        h2: '1.5em', // 24px
        h3: '1.17em', // 18.72px
        h4: '1em', // 16px
        h5: '0.83em', // 13.28px
        h6: '0.67em', // 10.72px
        p: '1em', // 16px
      },
    },
  },
  plugins: [],
};
