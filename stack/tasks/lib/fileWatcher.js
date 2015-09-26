var chokidar = require('chokidar');
var _ = require('lodash');

module.exports  = function(args) {
    var path = args.path || new Exception('path required');
    var onEvents = args.onEvents || new Exception('onEvents array required');
    var onEventFunctions = args.onEventFunctions || new Exception('path required');

    var watcher = chokidar.watch(path, {
        ignored: /[\/\\]\./,
        persistent: true
    });

    var log = console.log.bind(console);

    if (_.indexOf(onEvents, 'add')) {
        watcher.on('add', function(path, stats) {
            log('File', path, 'has been added');
            onEventFunctions.add(path, stats);
        });
    }

    if (_.indexOf(onEvents, 'change')) {
        watcher.on('change', function(path, stats) {
            log('File', path, 'has been changed');
            onEventFunctions.change(path, stats);
        });
    }

    if (_.indexOf(onEvents, 'unlink')) {
        watcher.on('unlink', function(path, stats) {
            log('File', path, 'has been removed');
            onEventFunctions.unlink(path, stats);
        });
    }

    if (_.indexOf(onEvents, 'addDir')) {
        watcher.on('addDir', function(path, stats) {
            log('Directory', path, 'has been added');
            onEventFunctions.addDir(path, stats);
        });
    }

    if (_.indexOf(onEvents, 'unlinkDir')) {
        watcher.on('unlinkDir', function(path, stats) {
            log('Directory', path, 'has been removed');
            onEventFunctions.unlinkDir(path, stats);
        });
    }

    watcher.on('error', function(error) {
        log('Error:', error);
    });

    // 'add', 'addDir' and 'change' events also receive stat() results as second
    // argument when available: http://nodejs.org/api/fs.html#fs_class_fs_stats
    //watcher.on('change', function(path, stats) {
    //    if (stats) console.log('File', path, 'changed size to', stats.size);
    //});

    // Watch new files.
    //watcher.add('new-file');
    //watcher.add(['new-file-2', 'new-file-3', '**/other-file*']);

    // Un-watch some files.
    //watcher.unwatch('new-file*');

    // Only needed if watching is `persistent: true`.
    //watcher.close();

    // Full list of options. See below for descriptions.
    //chokidar.watch('file', {
    //    persistent: true,
    //
    //    ignored: '*.txt',
    //    ignoreInitial: false,
    //    followSymlinks: true,
    //    cwd: '.',
    //
    //    usePolling: true,
    //    alwaysStat: false,
    //    depth: undefined,
    //    interval: 100,
    //
    //    ignorePermissionErrors: false,
    //    atomic: true
    //});
};