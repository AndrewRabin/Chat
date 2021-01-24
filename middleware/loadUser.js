var User = require('../models/user').User;

module.exports = function(req, res, next){
    global.user = null;

    if (!req.session.user) return next();

    User.findById(req.session.user, function(err, user){
        if (err) return next(err);

        ///*req.user =*/ req.locals.user = user;
        console.log("User is now GLOBAL.");
        global.user = user;
        next();
    });
};