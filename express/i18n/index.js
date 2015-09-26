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

    this.get = function(args) {
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

        return result
    }

    return this;
};