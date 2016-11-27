const webpack = require('webpack')
const path    = require('path')
const ExtractTextPlugin  = require('extract-text-webpack-plugin')


const publicPath       = '/public/assets'
let cssName            = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css'
let jsName             = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js'



let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new ExtractTextPlugin(cssName)
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CleanWebpackPlugin([ 'public/assets/' ], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  );
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}



module.exports = {

  entry: ['./src/index.js'],
  debug: process.env.NODE_ENV !== 'production',
  resolve: {
    root:               path.join(__dirname, 'src'),
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js', '.jsx']
  },

  output: {
    path: __dirname + '/public/assets',
    filename: jsName,
    publicPath
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /public/],
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },

  plugins,
  devServer: {
   headers: { 'Access-Control-Allow-Origin': '*' }
   },

  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null

}
