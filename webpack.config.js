const webpack = require('webpack')
const path    = require('path')
const ExtractTextPlugin  = require('extract-text-webpack-plugin')
const autoprefixer       = require('autoprefixer')
const precss             = require('precss')
const stylelint          = require('stylelint')


const publicPath       = 'http://localhost:8050/public/assets/'
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
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[name].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }

    ]
  },
  postcss: () => [precss, autoprefixer],
  plugins,
  devServer: {
   headers: { 'Access-Control-Allow-Origin': '*' },
   historyApiFallback: true,
   },

  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null,


}
