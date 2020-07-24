/* eslint-disable */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const CopyPlugin = require('copy-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'


const config = {
  entry: path.resolve(__dirname, 'src/App.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'main-[hash].js',
    chunkFilename: 'chunk-[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, 'public'),
      },
    ]),
    new HtmlWebpackPlugin({
      minify: isDev
        ? false
        : {
            collapseWhitespace: true,
            removeComments: true,
            useShortDoctype: true,
            minifyCSS: true,
          },
      template: './static/index.html',
      title: 'Spring Initializr',
      description: `Initializr generates spring boot project with just what you need to start quickly!`,
      url: 'https://start.spring.io',
      twitter: '@springboot',
      image: `https://start.spring.io/images/initializr-card.jpg`,
      theme: `#6db33f`,
    }),
    new WebpackPwaManifest({
      name: 'spring-initializr',
      short_name: 'Start',
      description: `Initializr generates spring boot project with just what you need to start quickly!`,
      background_color: '#6db33f',
      inject: true,
      fingerprints: true,
      ios: true,
      start_url: '/',
      crossorigin: null,
      icons: [
        {
          src: path.resolve('src/images/initializr-icon.png'),
          sizes: [48, 72, 96, 144, 192, 256, 384, 512],
        },
      ],
    }),
  ],
}

module.exports = config
