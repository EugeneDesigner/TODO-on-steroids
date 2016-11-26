const path = require('path')

const destination = (process.env.NODE_ENV === production) ?
  'dist' :
  'build'

module.exports = {
  entry: [
    '.src/index.jsx'
  ],
  resolve: {
    extensions: ['.js', '', '.jsx']
  },
  output: {
    path: path.join(__dirname, destination),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
}
