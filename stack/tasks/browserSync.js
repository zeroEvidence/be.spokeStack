module.exports = function() {
  /**
   * Require Browsersync
   */
  var browserSync = require('browser-sync');

  /**
   * Run Browsersync with server config
   */
  browserSync({
    server: "./public",
    files: [
      "./public/*.html",
      "./public/**/*.html",
      "./public/css/*.css",
      "./public/css/**/*.css",
      "./public/js/*.js",
      "./public/js/**/*.js"
    ],
    ui: {
      port: 3001,
      weinre: {
        port: 9090
      }
    }
  });
};