const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: './src/script.js',
    output: {
        path: path.resolve( __dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        clean: true,
    },
    devServer: {
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/i,
                use: ["style-loader","css-loader"],
            },
            {
                test: /\.svg$/i,
                type: 'asset/resource',
            }
        ],

    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
    })],
}