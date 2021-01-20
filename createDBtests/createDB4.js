var mongoose = require('../libs/mongoose');
//mongoose.set('debug', true);
var async = require('async');
var User = require('../models/user').User;

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
    async.parallel(
        [
            function (callback) {
                var vasya = new User({ username: 'Вася', password: '3' });
                vasya.save(function (err) {
                    callback(err, vasya);
                });
            },
            function (callback) {
                var petya = new User({ username: 'Петя', password: '2' });
                petya.save(function (err) {
                    callback(err, petya);
                });
            },
            function (callback) {
                var admin = new User({ username: 'Админ', password: '1' });
                admin.save(function (err) {
                    callback(err, admin);
                });
            },
        ],
        callback
    );
}

function close(callback) {
    mongoose.disconnect(callback);
}
