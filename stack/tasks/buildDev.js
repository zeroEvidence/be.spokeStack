/**
 * Created by moored on 12/09/15.
 */
var BrowserSync = require('./browserSync');
var Sass = require('./sass');
var Jade = require('./jade');
var webpack = require('./webpack');
var il8n = require('./il8n');

module.exports = {
    browserSync: new BrowserSync(),
    sass: new Sass(),
    jade: new Jade(),
    il8n: new il8n(),
    webpack: webpack
};