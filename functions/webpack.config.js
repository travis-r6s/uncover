const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: {
    graphql: './src/graphql'
  },
  output: {
    path: __dirname,
    filename: '[name]/index.js',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        use: ['babel-loader'],
        exclude: /(node_modules)/,
        test: /\.js$/
      }
    ]
  },
  plugins: [new ProgressBarPlugin()]
}
