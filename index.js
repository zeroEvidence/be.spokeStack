process.argv.forEach(function(val, index, array) {
    if (val === "build:development")
        require('./stack/tasks/buildDev');
});