const merge = require('webpack-merge')
const base = require('./webpack.base.config')

module.exports = merge(base, {
  output: {
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
    ]
  }
})
