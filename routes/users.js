var express = require('express');
var HttpError = require('../error').HttpError;
var router = express.Router();

var mongoose = require('../libs/mongoose');
//mongoose.set('debug', true);
//var async = require('async');
var ObjectID = require('mongodb').ObjectID;
var User = require('../models/user').User;

/* GET users listing. */
router.get('/', function (req, res, next) {
    // connection established
    User.find({}, function (err, users) {
        if (err) return next(err);

        res.json(users);
    });
});

router.get('/:id', function (req, res, next) {
    try{
        var id = new ObjectID(req.params.id);
    } catch(e){
        return next(new HttpError(404, 'User ' + req.params.id + ' not found.'));
    }
    User.findById(id, function (err, user) {
        if (err) return next(err);
        if (!user) {
            next(new HttpError(404, 'User ' + req.params.id + ' not found.'));
        } else {
            res.json(user);
        }
    });
});

module.exports = router;
