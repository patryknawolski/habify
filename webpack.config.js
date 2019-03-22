const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const development = process.env.NODE_ENV === 'development'

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Habify - the app for controlling your habits'
    })
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }
}

if (development) {
  config.mode = 'development'
  config.devtool = 'inline-source-map'
  config.devServer = {
    contentBase: './dist'
  }
} else {
  config.plugins.push(new CleanWebpackPlugin())
}

module.exports = config
