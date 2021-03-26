module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: (theme) => ({
      ...theme('colors'),
      turquoise: '#5DC2AF',
      'pri-2': '#F37323',
    }),
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'gray-l': '#F5F5F5',
      primary: '#140039',
    }),
    extend: {
      spacing: {
        3.6: '3.6rem',
        55: '55rem',
        50: '50rem',
        35: '35rem',
        ntd: {
          10: '10rem',
          20: '20rem',
          25: '25rem',
          30: '30rem',
          35: '35rem',
          40: '40rem',
        },
      },
      height: {
        10: '10rem',
        20: '20rem',
        25: '25rem',
        30: '30rem',
        35: '35rem',
        40: '40rem',
      },
      fontSize: {
        14: '1.4rem',
        16: '1.6rem',
        18: '1.8rem',
        20: '2rem',
        22: '2.2rem',
        24: '2.4rem',
        30: '3rem',
        40: '4rem',
        50: '5rem',
        140: '14rem',
      },
      boxShadow: {
        around: '0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%)',
      },
      colors: {
        orange: {
          DEFAULT: '#F37224',
          hard: '#d97032',
        },
        purple: {
          DEFAULT: '#140039',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
