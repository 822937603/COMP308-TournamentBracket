let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Tourney4 = require('../models/tourney4');
let Tournament4  = Tourney4.Tournament4;

//check if authenticated
function requireAuth(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.redirect('user/login');
  }
  next();
}

/* GET tourney page. */
router.get('/tourney',requireAuth,  (req, res, next) => {
  res.render('content/tourney', { 
    title: 'Tourney',
    username: req.user ? req.user.username : '' });
});

/* POST Tourney Page */
router.post('/add', requireAuth, (req,res,next) => {
    let newTourney = Tourney4({
       "player1": req.body.player1,
       "player2": req.body.player2,
       "player3": req.body.player3,
       "player4": req.body.player4
    });

    Tourney4.create(newTourney, (err,Tourney4) => {
        if(err){
            res.end(err);
        } else {
            res.redirect('/bracket/bracket');
        }
    })
});

/* GET bracket page. */
router.get('/bracket',requireAuth,  (req, res, next) => {
  res.render('content/bracket', { 
    title: 'Tournament Bracket',
    username: req.user ? req.user.username : '' });
});

/* POST bracket page */
router.post('/bracket',requireAuth,  (req, res, next) => {
   res.redirect('/'); // redirect to homepage
});

module.exports = router;