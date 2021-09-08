// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [require('./node_modules/tailwindcss', require('autoprefixer')],
    },
  },
}
