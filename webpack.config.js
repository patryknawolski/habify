const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const development = process.env.NODE_ENV === 'development'

const config = {
  mode: development ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: []
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
  Object.assign(config, {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    }
  })
  config.module.rules[0].use = ['style-loader', 'css-loader?sourceMap']
} else {
  const CleanWebpackPlugin = require('clean-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
  Object.assign(config, {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin()
      ]
    }
  })
  config.plugins.push(new CleanWebpackPlugin(), new MiniCssExtractPlugin())
  config.module.rules[0].use = [MiniCssExtractPlugin.loader, 'css-loader']
  config.module.rules.push({
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  })
}

module.exports = config
