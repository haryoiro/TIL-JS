var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet')
var session = require('express-session')
var passport = require('passport')
var GitHubStrategy = require('passport-github2').Strategy
var config = require('./config')


passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((obj, done) => {
    done(null, obj)
})

passport.use(new GitHubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            return done(null, profile)
        })
    }
))

var routes = require('./routes/back');
var users = require('./routes/users');
var game = require('./routes/game')

var app = express();
app.use(helmet())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// GitHub OAuth for front
app.use(session({ secret: '9a9fb4fc0fdc2717', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes);
app.use('/users', ensureAuthenticated, users);
app.use('/game', game)

app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }),
    (req, res) => {}
)

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
    res.redirect('/')
})

// login/logout
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

function ensureAuthenticated (req, res, next) {
    if(req.isAuthenticated()) {return next()}
    res.redirect('/login')
}

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
