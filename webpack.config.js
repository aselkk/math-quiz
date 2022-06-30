const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractWebpackPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PAGES_DIR = `${path.resolve(__dirname, "src")}/pages/`;

const PAGES = fs
    .readdirSync(PAGES_DIR)
    .filter((fileName) => fileName.endsWith(".html"));

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, './src/js/main.js')
    },
    output: {
        filename: '[name].js',
        clean: true,
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[name][ext]'
    }, 
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            },
        port: 3000,
        open: true,
        hot: true,
        compress: true, 
        historyApiFallback: true,
        watchFiles: {
            paths: PAGES.map(i => {
                return `./src/pages/`
            }), 
                options: {
                usePolling: true,
                },
            },
    },
    module: {
        rules : [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractWebpackPlugin.loader,
                    // "style-loader",
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader'
                ]
            },
            { 
                test: /\.(png|svg|jpg|jpeg|gif|ttf)$/i, 
                type: 'asset/resource', 
            }
        ]
    },
    plugins: [
        ...PAGES.map(
            (page) =>
            new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/${page}`,
                filename: `${page}`,
            })
        ),
        new HtmlWebpackPlugin({
            template: "./src/pages/index.html",
        }),
        new MiniCssExtractWebpackPlugin({
            filename: '[name].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./src/assets",
                    to: "./assets",
                    noErrorOnMissing: true
                }
            ]
        }),
    ]
};
