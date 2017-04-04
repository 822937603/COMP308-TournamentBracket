let express = require('express');
let router = express.Router();

let passport = require('passport');
let UserModel = require('../models/users');
let User = UserModel.User;

//check if authenticated
function requireAuth(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.redirect('user/login');
  }
  next();
}

/* GET home page. */
router.get('/',requireAuth,  (req, res, next) => {
  console.log(req.user);
  res.render('content/index', { 
    title: 'Home',
    username: req.user ? req.user.username : '' });
});

/* GET bracket page. */
router.get('/bracket',requireAuth,  (req, res, next) => {
  res.render('content/bracket', { 
    title: 'Tournament Bracket',
    username: req.user ? req.user.username : '' });
});

/* POST bracket page */
router.post('/bracket',requireAuth,  (req, res, next) => {
   res.redirect('content/bracket'); // redirect to homepage
});

module.exports = router;