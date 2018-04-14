import path from 'path'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import StartServerPlugin from 'start-server-webpack-plugin'
import packageJson from './package.json'

const DEVELOPMENT = process.env.NODE_ENV === 'development'

export default {
  target: 'node',
  entry: {
    index: [
      DEVELOPMENT && 'webpack/hot/signal',
      path.resolve(__dirname, packageJson.source)
    ].filter(Boolean)
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/signal']
    })
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'source'),
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.gql$/,
        include: path.resolve(__dirname, 'source'),
        exclude: /node_modules/,
        use: ['graphql-tag/loader']
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),

    DEVELOPMENT &&
      new StartServerPlugin({
        name: 'index.js',
        signal: true
      }),

    new webpack.NamedModulesPlugin(),
    DEVELOPMENT && new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin()
  ].filter(Boolean),
  resolve: {
    extensions: ['.flow.js', '.js']
  },
  devtool: 'sourcemap'
}
