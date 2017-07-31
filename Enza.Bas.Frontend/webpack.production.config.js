
const webpack = require('webpack'); // Requiring the webpack lib
const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports={

    entry:path.join(__dirname, "app","js","index.production.js"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index.bundle.js"
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude:/node_modules/,
                loader: 'babel',
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')
            },
            {
                test: /app[\\\/]fonts[\\\/]fontello[\\\/].*\.(eot|svg|ttf|woff|woff2)(\?.*$|$)$/,
                loader: 'file?name=/fonts/fontello/[name].[ext]'
            },
            {
                test: /app[\\\/]fonts[\\\/]roboto[\\\/].*\.(eot|svg|ttf|woff|woff2)(\?.*$|$)$/,
                loader: 'file?name=/fonts/roboto/[name].[ext]'
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                loader: 'file?name=/img/[name].[ext]'
            }
        ]
    },

    devtool : "source-map",
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true,
                dead_code: true,
                global_defs: {
                    __REACT_HOT_LOADER__: undefined // eslint-disable-line no-undefined
                }
            },
            comments: false,
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
            title: 'BAS: Breeding Administration System',
            template: 'app/index.html'
        }),
        new ExtractTextPlugin('style.min.css')
    ]
}