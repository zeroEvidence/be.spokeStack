var sass = require('node-sass');
var Watcher = require('./lib/fileWatcher');
var fs = require('fs');
var dir = require('node-dir');
var _ = require('lodash');
var async = require('async');
var browserSync  = require('browser-sync')

module.exports = function() {

    var render = function(path, stats) {

        //console.log('path:', path);
        var nodeSassLocation = require.resolve('node-sass');
        delete require.cache[nodeSassLocation];
        var nodeSass = require('node-sass');

        var matches = path.match(/([^\/]+).(?:scss|sass)/);
        var filename = matches[1];

        return new process(path, filename, nodeSass);
    };

    var process = function (path, filename, nodeSass) {

        var expressOutputFilePath = 'express/public/stylesheets/' + filename + '.css';
        var devlOutputFilePath = 'public/stylesheets/' + filename + '.css';

        nodeSass.render({
            file: path,
            includePaths: ['./src/stylesheets/lib/'],
            outputStyle: 'compressed',
            outFile: devlOutputFilePath,
            sourceMap: true // or an absolute or relative (to outFile) path
        }, function(error, result) { // node-style callback from v3.0.0 onwards
            if (error) {
                console.log(error.status); // used to be "code" in v2x and below
                console.log(error.column);
                console.log(error.message);
                console.log(error.line);
            }

            //console.log("css:", JSON.stringify(result.css.toString())); // note, JSON.stringify accepts Buffer too
            //console.log("map:", JSON.stringify(result.map.toString())); // note, JSON.stringify accepts Buffer too
            fs.writeFile(expressOutputFilePath, result.css.toString(), function (err) {
                if (!err) {
                    //console.log("express stylesheet written");
                }
            });
            fs.writeFile(devlOutputFilePath, result.css.toString(), function (err) {
                if (!err) {
                    //console.log(path + " wr");
                    browserSync.reload()
                }
            });
            fs.writeFile('public/stylesheets/' + filename + '.css.map', result.map.toString(), function (err) {
                if (!err) {
                    //console.log("dev stylesheet map written");
                }
            });
        });

    };

    var config = {
        path: "./src/stylesheets/*.sass",
        onEvents: ['add', 'change'],
        onEventFunctions: {
            add: function(path, stats) {render(path, stats)},
            change: function(path, stats) {render(path, stats)}
        }
    };

    return {
        watcher1: new Watcher(config)
    };
};