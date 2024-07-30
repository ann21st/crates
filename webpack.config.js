const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

const babelRule = require('./webpack/rule-babel')
const { getEnv } = require("./webpack/utils");


module.exports = () => {
    const env = getEnv(__dirname)

    const config = {
        mode: env.MODE,  // production
        entry: {
            main: './src/main.js',
        },
        output: {
            filename: 'src/[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            publicPath: env.PUBLIC_PATH,
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Crates',
            }),
            new WebpackManifestPlugin({}),
            new VueLoaderPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'public'),
                        to: path.resolve(__dirname, 'dist')
                    }
                ]
            })
        ],
        module: {
            rules: [
                { test: /\.vue$/, loader: 'vue-loader', exclude: /node_modules/ },
                { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource', },
                { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
                { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' },
                babelRule,
            ]
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            }
        },
        optimization: {
            runtimeChunk: 'single',
            moduleIds: 'deterministic',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    }
                }
            }
        }
    }

    if (env.MODE === 'development') {
        config.devtool = 'inline-source-map';
    }

    return config;
};
