/**
 * Created by moored on 12/09/15.
 */
var path            = require('path')
var paths           = require('./')
var webpack         = require('webpack')
var webpackManifest = require('../lib/webpackManifest')

module.exports = function(env) {
    var jsSrc = path.resolve(paths.sourceAssets + '/javascripts/')
    var publicPath = 'javascripts/'

    var webpackConfig = {
        context: jsSrc,

        plugins: [],

        resolve: {
            extensions: ['', '.js']
        }

        //module: {
        //    loaders: [
        //        {
        //            test: /\.js$/,
        //            loader: 'babel-loader?stage=1',
        //            exclude: /node_modules/
        //        }
        //    ]
        //}
    }

    if(env === 'test') {
        webpackConfig.plugins.push(require("karma-webpack"));
    }

    if(env !== 'test') {
        // Karma doesn't need entry points or output settings
        webpackConfig.entry = {
            index: [ './index.js' ]
        };



        // Factor out common dependencies into a shared.js
        //webpackConfig.plugins.push(
        //    //new webpack.optimize.CommonsChunkPlugin({
        //    //    name: 'shared',
        //    //    filename: env === 'production' ? '[name]-[hash].js' : '[name].js',
        //    //})
        //)
    }

    if(env === 'development') {
        webpackConfig.devtool = 'source-map'
        webpack.debug = true

        var jsDest = paths.publicAssets + '/javascripts/'

        webpackConfig.output = {
            path: jsDest,
            filename: '[name].js',
            publicPath: publicPath
        }
    }

    if(env === 'production') {

        var jsDest = './express/public/javascripts/'

        webpackConfig.output = {
            path: jsDest,
            filename: '[name].js',
            publicPath: publicPath
        }

        webpackConfig.plugins.push(
            new webpackManifest(publicPath, 'public'),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.NoErrorsPlugin()
        )
    }

    return webpackConfig
}