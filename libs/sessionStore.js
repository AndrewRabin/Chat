
var mongoose = require('./mongoose');

module.exports = function(session){
    var MongoStore = require('connect-mongo')(session);
    return new MongoStore ({ mongooseConnection: mongoose.connection });
}

