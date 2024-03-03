const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInlineScriptWebpackPlugin = require('html-inline-script-webpack-plugin');
// const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    main: '/src/script.tsx',
    initColorScheme: '/src/initColorScheme.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  optimization: {
    runtimeChunk: mode === 'production' ? false : 'single',
  },
  resolve: {
    extensions: ['.jsx', '.tsx', '.ts', '.js', '.json', '.wasm', '...'],
    alias: {
      '@components': path.resolve('./src/Components'),
    },
  },
  devServer: {
    open: true,
    client: {
      overlay: false,
    },
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg|jpg|png$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new HtmlInlineScriptWebpackPlugin({
      scriptMatchPattern: [/initColorScheme\..+\.js$/],
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.[contenthash].css',
    }),
    // new StylelintWebpackPlugin({
    //   files: '{**/*,*}.ccs',
    // }),
    new EslintWebpackPlugin({
      files: '{**/*,*}.{jsx,tsx,js,ts}',
    }),
  ],
};
