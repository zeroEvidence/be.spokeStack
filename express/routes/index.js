var express = require('express');
var i18n = require('../i18n')
var locales = new i18n();
var router = express.Router();

/* GET home page. */
router.get('/:language', function(req, res, next) {
  res.render('index', locales.get({
    'language': req.params.language,
    'page': 'index'
  }));
});

module.exports = router;
