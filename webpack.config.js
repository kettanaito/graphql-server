const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const packageJson = require('./package.json')

const { NODE_ENV: nodeEnv } = process.env
const DEVELOPMENT = nodeEnv === 'development'

module.exports = {
  target: 'node',
  mode: nodeEnv,
  entry: {
    index: [
      DEVELOPMENT && 'webpack/hot/signal',
      'regenerator-runtime/runtime',
      path.resolve(__dirname, packageJson.source),
    ].filter(Boolean),
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/signal'],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // include: path.resolve(__dirname, 'source'),
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.gql$/,
        // include: path.resolve(__dirname, 'source'),
        exclude: /node_modules/,
        use: ['graphql-tag/loader'],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),

    DEVELOPMENT &&
      new StartServerPlugin({
        name: 'index.js',
        signal: true,
      }),

    new webpack.NamedModulesPlugin(),
    DEVELOPMENT && new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: ['.flow.js', '.js'],
  },
  devtool: 'source-map',
}
