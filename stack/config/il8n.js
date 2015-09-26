/**
 * Created by moored on 19/09/15.
 */
module.exports = function(env) {

    var il8nConfig = {
        // setup some locales - other locales default to en silently
        locales:['en', 'es', 'fr'],

        // sets a custom cookie name to parse locale settings from
        cookie: 'mySiteName',

        // where to store json files - defaults to './locales'
        directory: __dirname + '/locales'
    }

    return il8nConfig;
}