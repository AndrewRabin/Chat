var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.get('mongoose:local'),
                 config.get('mongoose:options'),
                 (err)=>{if(!err) console.log("DB connected to " + 
                                    config.get('mongoose:local'));});

module.exports = mongoose;