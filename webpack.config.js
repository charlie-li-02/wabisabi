const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    entry: {
        panel: './src/panel.jsx',
        content_parser: './src/content_parser.jsx',
        content_observer: './src/content_observer.jsx',
        background: './src/background.jsx',
        components: './src/components.jsx',
        theme: './src/theme.jsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.platform': JSON.stringify(process.platform || null),
        }),
        new HtmlWebpackPlugin({
            template: './src/panel.html',
            filename: 'panel.html',
        }),
    ],
    resolve: {
        alias: {
            kuromoji: __dirname + '/kuromoji',
        }
    }
};