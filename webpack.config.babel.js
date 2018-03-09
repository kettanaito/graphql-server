import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
// import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
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
        test: /\.ts$/,
        include: path.resolve(__dirname, 'source'),
        exclude: /node_modules/,
        use: ['awesome-typescript-loader']
      },
      {
        test: /\.gql$/,
        include: path.resolve(__dirname, 'source'),
        exclude: /node_modules/,
        use: ['graphql-tag/loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'source'),
      '@classes': path.resolve(__dirname, 'source/classes'),
      '@schema': path.resolve(__dirname, 'source/schema'),
      '@utils': path.resolve(__dirname, 'source/utils')
    },
    extensions: ['.ts', '.js']
  },
  devtool: 'sourcemap'
};
