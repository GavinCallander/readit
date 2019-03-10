require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const passport = require('./config/passportConfig');
const session = require('express-session');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const methodOverride = require('method-override');
const request = require('request');
const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(ejsLayouts);
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(helmet());

const sessionStore = new SequelizeStore({
  db: db.sequelize, 
  expiration: 30 * 60 * 1000
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

// Use this line once to set up the store table
sessionStore.sync();

// This must come after the session and before passport
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Anonymous middleware function that attaches flash messages to response
app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.get('/preferences', isLoggedIn, function(req, res) {
  res.render('preferences');
});

app.get('/explore', function(req, res) {
  var newsUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=64e994e4023c47fe955340cf8c870b1a'
  request(newsUrl, function(error, response, body) {
    var news = JSON.parse(body);
    res.render('explore', {news});
  });
});

app.get('/articles', isLoggedIn, function(req, res) {
  var newsUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=64e994e4023c47fe955340cf8c870b1a'
  request(newsUrl, function(error, response, body) {
    var news = JSON.parse(body);
    res.render('articles', {news});
  });
});

app.use('/auth', require('./controllers/auth'));
app.use('/list', require('./controllers/articles'));
app.use('/user', require('./controllers/user'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
