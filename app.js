var createError = require('http-errors');
var express = require('express');
var mongoose = require('./libs/mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var favicon = require('serve-favicon');
var HttpError = require('./error').HttpError;
var config = require('./config');
var log = require('./libs/log')(module);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');

app.use(logger('dev')); // MORGAN (Logging to terminal window)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//////////////////////// session //////////////////
var MongoStore = require('connect-mongo')(session);

var sess = {
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
};

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

// app.use(function(req, res, next){
//   req.session.numberOfVisits = req.session.numberOfVisits +1 || 1;
//   res.send("Visits: " + req.session.numberOfVisits);
// })

///////////////////////////////////////////

app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(require('./middleware/sendHttpError'));

app.use(require('./middleware/loadUser'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    if (typeof err == 'number') {
        // next(404);
        err = new HttpError(err, "Wrong password!");
        //res.render('error');

    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development') {
            //express.errorHandler()(err, req, res, next);
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
            //res.send("error")
            //res.redirect('/');
            
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

// My modifiet Kantor error handler
// app.use(function (err, req, res, next) {
//     if (typeof err == 'number') {
//         // next(404);
//         err = new HttpError(err);
//     }

//     if (err instanceof HttpError) {
//         res.sendHttpError(err);
//     } else {
//         //log.error(err);
//         err = new HttpError(500);
//         res.sendHttpError(err);
//     }
// });

// Standart Express error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
