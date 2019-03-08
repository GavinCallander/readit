const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/passportConfig');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      console.log('User created');
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      console.log('Email already exists');
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'You have logged in!',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password'
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out!');
  res.redirect('/');
});

module.exports = router;
