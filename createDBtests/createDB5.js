var mongoose = require('../libs/mongoose');

var async = require('async');
var User = require('../models/user').User;


//mongoose.set('debug', true);
var config = require('../config');



async.series([
    open,
    dropDatabase,
    createUsers,
    close],
    (err, results) => {
        console.log(results);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    mongoose.connection.db.dropDatabase(callback);
}

function createUsers(callback) {
    var users = [
        {username: 'Вася', password: 'supervasya'},
        {username: 'Петя', password: '123'},
        {username: 'admin', password: 'thetruehero'}
      ];

      async.each(users, function(userData, callback){
          var user = new User(userData);
          user.save(callback);
      }, callback);


}

function close(callback) {
    mongoose.disconnect(callback);
}
