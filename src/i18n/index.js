/**
 * Created by moored on 19/09/15.
 */
var locales = new require('./locales')();
//var locales = {
//    'en': {
//        'index': {
//            'title': 'Express',
//            'welcome': 'Welcome to Express'
//        }
//    },
//    'fr': {
//        'index': {
//            'title': 'Express',
//            'welcome': 'Bienvenue à Express'
//        }
//    }
//};
//var locales = {};

module.exports = function() {

    var localesScriptLocation = require.resolve('./locales');
    delete require.cache[localesScriptLocation];
    var locales = new require('./locales')();

    return {
        get: function(args) {
            var language = args.language || '';
            var page = args.page || '';
            var result = {};

            if (typeof locales === 'object') {
                if (typeof locales[language] ===  'object') {
                    if (typeof locales[language][page] == 'object') {
                        result = locales[language][page]
                    }
                }
            }

            //console.log('result in i18n/index.js:', Object(result));
            return Object.create(result);
        }
    }
};