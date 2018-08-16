import path from 'path'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import StartServerPlugin from 'start-server-webpack-plugin'
import packageJson from './package.json'

const nodeEnv = process.env.NODE_ENV
const DEVELOPMENT = nodeEnv === 'development'
const PRODUCTION = nodeEnv === 'production'

export default {
  target: 'node',
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
        include: path.resolve(__dirname, 'source'),
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.gql$/,
        include: path.resolve(__dirname, 'source'),
        exclude: /node_modules/,
        use: ['graphql-tag/loader'],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(nodeEnv),
    }),
    new webpack.DefinePlugin({
      __DEV__: DEVELOPMENT,
      __PROD__: PRODUCTION,
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
  devtool: 'sourcemap',
}
