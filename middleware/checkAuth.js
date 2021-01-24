var HttpError = require('../error');

module.exports = function(req, res, next){
    if(!global.user){
        return next(new HttpError(401, 'AR Not autorized'));
    }

    next();
};