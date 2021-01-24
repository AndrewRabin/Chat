var express = require('express');
var async = require('async');
var router = express.Router();

var User = require('../models/user').User;
var AuthError = require('../models/user').AuthError;
var HttpError = require('../error');
var checkAuth = require('../middleware/checkAuth');

//Express standart

router.get('/', function (req, res, next) {
    res.render('frontpage');
});

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username, password, function(err, user) {
        if (err) {
          if (err instanceof AuthError) {
            //return next(new HttpError(403, err.message));
            return next(403);
          } else {
            return next(err);
          }
        }
    
        req.session.user = user._id;
        res.send({});
    
      });

   
});

router.post('/logout', function(req, res){
    console.log("POST logout");
    req.session.destroy();
    res.redirect('/');
})

router.get('/logout', function(req, res){
    console.log("GET logout");
    req.session.destroy();
    res.redirect('/');
})

router.get('/chat', checkAuth, function (req, res, next) {
    res.render('chat');
    
});

module.exports = router;

// Kantor deprecated ))
// module.exports = function(app){

//   app.get('/', require('./frontpage').get);

//   app.get('/login', require('./login').get);

//   app.get('/chat', require('./chat').get);
// };
