var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var passport = require('passport');
var flash = require('connect-flash');


var index = require('./routes/index');

var bucket = require('./routes/bucket');
var mandal = require('./routes/mandal'); 
var calendar = require('./routes/calendar');

var auth = require('./routes/auth');
var profile = require('./routes/profile');


var http = require('http');


var app = express();

// configuration ================================================

require('./config/passport')(passport);


// view engine setup ============================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(path.join(__dirname, 'public/js/vendor')));

app.use('/', index);

app.use('/bucket', bucket);
app.use('/mandal', mandal);
app.use('/calendar', calendar);

app.use('/auth', auth);
app.use('/profile', profile);



app.use(function(req, res) {
	res.render('404', {
		url: req.url
	});
});

// catch 404 and forward to error handler ======================
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers ==============================================

// development error handler ===================================
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('500', {
			message: err.message,
			error: err
		})
	});
}

// production error handler ====================================
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('500', {
		message: err.message,
		error: {}
	})
});


app.use(cookieParser());
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'session secret key',
	secure: true,
	cookie: { maxAge: 60000000 }
}));


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


module.exports = app;
