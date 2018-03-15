import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import packageJson from './package.json';

export default {
  target: 'node',
  entry: {
    index: path.resolve(__dirname, packageJson.source)
  },
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname),
    filename: packageJson.main
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
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
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
