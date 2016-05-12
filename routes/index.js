var express = require('express');
var router = express.Router();
var passport=require('passport');

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/dashboard');
}

module.exports = function(passport){

  /* GET login page. */
  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('index', {
          message: req.flash('message') ,
    isAuthenticated:req.isAuthenticated(),
    user:req.user});
  });

  /* GET login Page */
  router.get('/signin', function(req, res){
    console.log('get login!');
    res.render('signin',{message: req.flash('message')});
  });

  /* Handle Signin POST */
  router.post('/signin', passport.authenticate('signin', {

    successRedirect: '/dashboard',
    failureRedirect: '/signin',
    failureFlash : true

  }));



  /* GET Registration Page */
  router.get('/signup', function(req, res){
    res.render('signup',{message: req.flash('message')});
  });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* GET Home Page */
  router.get('/dashboard', isAuthenticated, function(req, res){
    res.render('dashboard', { user: req.user });
  });

  /* GET setting Page */
  router.get('/setting', isAuthenticated, function(req, res){
    res.render('setting', { user: req.user });
  });
  /* GET help Page */
  router.get('/help', isAuthenticated, function(req, res){
    res.render('help', { user: req.user });
  });
  /* GET profile Page */
  router.get('/profile', isAuthenticated, function(req, res){
    res.render('profile', { user: req.user });
  });
  /* Handle Logout */
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
}