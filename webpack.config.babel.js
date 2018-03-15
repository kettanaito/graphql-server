import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import StartServerPlugin from 'start-server-webpack-plugin';
import packageJson from './package.json';

const DEVELOPMENT = (process.env.NODE_ENV === 'development');

export default {
  target: 'node',
  entry: {
    index: ['webpack/hot/poll?1000', path.resolve(__dirname, packageJson.source)]
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
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
    new StartServerPlugin('index.js'),

    new webpack.EnvironmentPlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new webpack.NamedModulesPlugin(),
    DEVELOPMENT && new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin()
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'source'),
      '@classes': path.resolve(__dirname, 'source/classes'),
      '@schema': path.resolve(__dirname, 'source/schema'),
      '@utils': path.resolve(__dirname, 'source/utils')
    }
  },
  devtool: 'sourcemap'
};
