/**
 * Created by moored on 18/09/15.
 */
var jade = require('jade');
var jadeConfig = require('../config/jade')();
var Watcher = require('./lib/fileWatcher');
var async = require('async');
var dir = require('node-dir');
var _ = require('lodash');
var fs = require('fs');
var JadeProcessor = require('./lib/processJade');
//var randomString = require('random-string');

module.exports = function () {

    var render = function (path, stats) {

        var i18nScriptLocation = require.resolve('../../src/i18n');
        delete require.cache[i18nScriptLocation];
        var i18n = require('../../src/i18n');

        // Copy src/i18n/locales/index.js to express/i18n/locales/index.js
        var prodOutputPath = path.replace('src/i18n/', 'express/i18n/');

        return new fs.readFile(path, function (err, data) {
            if (err) throw err;
            fs.writeFile(prodOutputPath, data, function (err) {
                if (err) throw err;
                //console.log('1require.cache: ', require.cache);
                return new process(i18n);
            });
        });
    };

    var process = function(i18n) {
        var locales = new i18n();
        var jadeSrcDirectory = __dirname.replace('stack/tasks', 'src/html');
        var devOutputPath = __dirname.replace('stack/tasks', 'public');

        dir.files(jadeSrcDirectory, function(err, files) {
            if (err) throw err;
            // sort ascending

            _.map(files, function(filePath) {
                var filename = filePath.match(/([^\/]+).jade$/, '')[1];
                var outFile = devOutputPath + '/' + filename + '.html';
                //console.log('****jadeConfig: ', jadeConfig.exclude);
                //console.log('****filename: ', filename);
                //console.log('jadeConfig.exclude.indexOf(filename): ', jadeConfig.exclude.indexOf(filename));

                if(jadeConfig.exclude.indexOf(filename) == -1) {
                    async.waterfall([
                        function (callback) {

                            var fn = jade.compileFile(filePath, {
                                filename: filename,
                                compileDebug: true,
                                cache: false
                            });

                            var html = fn(locales.get({
                                'language': 'en',
                                'page': filename
                            }));

                            //html += "<!--" + randomString({length: 100}) + "-->";

                            callback(null, html);
                        },
                        function (html, callback) {

                            //console.log('2require.cache: ', require.cache);
                            //console.log('html: ', html);
                            //console.log('****outFile: ', outFile);

                            fs.writeFile(outFile, html, function (err) {
                                if (err) throw err;
                                //console.log('It saved!');
                            });

                            callback(null, 'done');
                        }
                    ], function (err, result) {
                        if (err) throw err;
                        //console.log('result: ', result);
                    });
                }
            })
        });
    };

    var jadeWatcher1Config = {
        path: "./src/html/*.jade",
        onEvents: ['add', 'change'],
        onEventFunctions: {
            add: function (path, stats) {
                render(path, stats)
            },
            change: function (path, stats) {
                render(path, stats)
            },
            ready: function (path, stats) {
                render(path, stats)
            }
        }
    };

    var jadeWatcher2Config = {
        path: "./src/html/**/*.jade",
        onEvents: ['add', 'change'],
        onEventFunctions: {
            add: function (path, stats) {
                render(path, stats)
            },
            change: function (path, stats) {
                render(path, stats)
            },
            ready: function (path, stats) {
                render(path, stats)
            }
        }
    };

    return {
        jadeWatcher1: new Watcher(jadeWatcher1Config),
        jadeWatcher2: new Watcher(jadeWatcher2Config)
    };
};