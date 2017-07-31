/**
 * Created by dbasukala on 5/27/2016.
 */
const gulp = require('gulp');
const gutil = require("gulp-util")
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackDevConfig = require("./webpack.config.js");


//task to spit production scripts;
gulp.task("prod:js", function(){
    return gulp.src("app/js/index.production.js")
        .pipe(webpackStream(require("./webpack.production.config.js")))
        .pipe(gulp.dest('dist/'));
});

gulp.task("prod",["prod:js"])

gulp.task("dev", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackDevConfig);
        myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        stats: {
            colors: true
        },
        historyApiFallback: true,
        contentBase: __dirname +"/app",
        hot:true,
        host: "0.0.0.0",
        port:8887,
        inline:true
    }).listen(8887, "10.0.1.14", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://10.0.1.14:8887/webpack-dev-server/index.html");
    });
});

gulp.task("default", ["dev"]);