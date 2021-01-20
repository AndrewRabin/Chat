var express = require('express');
var router = express.Router();

//var log = require('../libs/log')(module);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
