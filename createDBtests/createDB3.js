var mongoose = require('../libs/mongoose');
var User = require('../models/user').User;

var user = new User({
    username: 'Tester16',
    password: 'secret',
    /*salt: 'salt'*/
});

user.save(function (err, user, affected) {
    if (err) throw err;

    User.findOne({ username: 'Tester' }, function (err, tester) {
        if (err) throw err;

        console.log(`${tester.username} (${tester.id})`);
    });
});

function showDB() {
    User.find((err, result) => {
        if (err) throw err;

        for (r in result) {
            console.log(`${r.username} (${r.id})`);
        }
    });
}

mongoose.connection.on('open', () => {
    showDB();
});
