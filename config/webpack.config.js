const validator = require('webpack-validator');
const webpack = require('webpack');
const helpers = require('./helpers');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = validator({
    entry: {
        app: './src/app/app.js',
        vendor: './src/vendor.js'
    },

    output: {
        filename: '[name].[chunkhash].js',
        path: helpers.absolutePath('build')
    },

    module: {
        preLoaders: [
            {
                test : /\.js$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/
            }
        ],

        loaders: [
            {
                test : /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    presets: ["es2015"]
                }
            },
            {
                test : /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass'),
                exclude: /(node_modules)/
            },
            {
                test : /\.html/,
                loader: 'raw-loader',
                exclude: [helpers.absolutePath('src/index.html')]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),

        new cleanWebpackPlugin(['build'], {
            root: helpers.absolutePath(''),
            verbose: true
        }),

        new ExtractTextPlugin('[name].[chunkhash].css')
    ],

    eslint: {
        configFile: './config/eslintrc.json'
    },

    devServer: {
        port: 3000,
        host: 'localhost',
        inline: true,
        historyApiFallback: 'true',
        watchOptions: {
            aggregateTimeout: 300
        },
        stats: 'errors-only'
    }
});