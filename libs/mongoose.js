var mongoose = require('mongoose');
var config = require('../config');

var ARurl = config.get('mongoose:local');

console.log(`DB CONNECTION URL: ${ARurl}`);

mongoose.connect(ARurl,
                 config.get('mongoose:options'));

module.exports = mongoose;