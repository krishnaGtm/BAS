let webpack = require('webpack'); // Requiring the webpack lib
let path =require("path");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports={

    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://10.0.1.14:8887', // Setting the URL for the hot reload
        'webpack/hot/only-dev-server', // Reload only the dev server
        path.resolve(__dirname,"app","js","index.js")
    ],
    output: {
        path:  path.resolve(__dirname,"dist/"),
        filename: "/index.bundle.js"

    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname,"app"),
        compress: true,
        hot:true,
        host: "0.0.0.0",
        port:8887,
        inline:true
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude:/node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style?sourcemap!css?sourcemap'
            },
            {
                test: /\.scss$/,
                loaders: ["style?sourcemap", "css?sourcemap", "sass?sourcemap"]
            },
            /*{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')
            },*/
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?.*$|$)$/,
                loader: 'file?name=/fonts/[name].[ext]'
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                loader: 'file?name=/img/[name].[ext]'
            }
        ]
    },

    devtool : "source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Wire in the hot loading plugin
        new HtmlWebpackPlugin({
            title: 'BAS: Breeding Administration System',
            template: 'app/index.html'
        }),
        new ExtractTextPlugin('/style.min.css')
    ]
}