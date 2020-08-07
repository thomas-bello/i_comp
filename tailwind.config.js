/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

// const getPObj = (start = 2, end = 5) => {
//   const returnObj = {}
//   for (let i = start; i <= end; i++) {
//     for (let j = 1; j < i; j++) {
//       const key = `${j}/${i}`
//       const value = `${(j / i) * 100}%`
//       returnObj[key] = value
//     }
//   }
//   return returnObj
// }

module.exports = {
  theme: {
    extend: {
      // height: getPObj(),
      zIndex: {
        '-1': '-1',
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
