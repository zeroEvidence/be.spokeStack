module.exports = function(i18n) {

    var locales = new i18n();
    var jadeSrcDirectory = __dirname.replace('stack/tasks/lib', 'src/html');
    var devOutputPath = __dirname.replace('stack/tasks/lib', 'public');

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

                        html += "<!--" + randomString({length: 100}) + "-->";

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
    })};