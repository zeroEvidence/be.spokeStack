/**
 * Created by moored on 12/09/15.
 */
var devConfig       = require('../config/webpack')('development')
var prodConfig       = require('../config/webpack')('production')
//var logger       = require('../lib/compileLogger')
var webpack      = require('webpack')
var browserSync  = require('browser-sync')

//console.log('config: ' + JSON.stringify(config));

// returns a Compiler instance
var devCompiler = webpack(devConfig);
devCompiler.watch(200, function(err, stats) {
    //logger(err, stats)
    browserSync.reload()
});


// returns a Compiler instance
var prodCompiler = webpack(prodConfig);
prodCompiler.watch(200, function(err, stats) {
    //logger(err, stats)
});

module.exports = {
    devCompiler: devCompiler,
    proCompiler: prodCompiler
};