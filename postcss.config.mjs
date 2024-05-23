/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'autoprefixer': {},
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 6,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
    'tailwindcss': {},
  },
};

export default config;
