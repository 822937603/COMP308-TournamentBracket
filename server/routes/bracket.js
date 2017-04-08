let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Tourney4 = require('../models/tourney4');
//let Tournament4  = Tourney4.Tournament4;

//check if authenticated
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('user/login');
    }
    next();
}

/* GET tourney page. */
router.get('/tourney', requireAuth, (req, res, next) => {
    res.render('content/tourney', {
        title: 'Tourney',
        username: req.user ? req.user.username : ''
    });
});

/* POST Tourney Page - Process the tourney page */
router.post('/tourney', requireAuth, (req, res, next) => {
    // let newTourney = Tourney4({
    //    "player1": req.body.player1,
    //    "player2": req.body.player2,
    //    "player3": req.body.player3,
    //    "player4": req.body.player4
    // });
    console.log(req.body.player4);
    let object = {
        'rounds': [{
            'round1': [{
                'pair1': [
                    {
                        'playerName': req.body.player1, Wins: 0, Losses: 0
                    },
                    {
                        'playerName': req.body.player2, Wins: 0, Losses: 0
                    }
                ],
                'pair2': [
                    {
                        'playerName': req.body.player3, Wins: 0, Losses: 0
                    },
                    {
                        'playerName': req.body.player4, Wins: 0, Losses: 0
                    }
                ]
            }],
            'round2': [{
                'pair3': [
                    {
                        'playerName': req.body.player1, Wins: 0, Losses: 0
                    },
                    {
                        'playerName': req.body.player2, Wins: 0, Losses: 0
                    }
                ]
            }],
            //'winner1': req.body.player1, 'winner2': req.body.player1, loser1: req.body.player1
        }],
        userID: String
    }
    console.log(JSON.stringify(object))
    let newTourney = Tourney4(object)

    Tourney4.create(newTourney, (err, Tourney4) => {
        console.log(JSON.stringify(Tourney4));
        if (err) {
            res.end(err);
        } else {
            res.redirect('/bracket/bracket');
        }
    })
});

/* GET bracket page. */
router.get('/bracket', requireAuth, (req, res, next) => {
    res.render('content/bracket', {
        title: 'Tournament Bracket',
        username: req.user ? req.user.username : ''
    });
});

/* POST bracket page */
router.post('/bracket', requireAuth, (req, res, next) => {
    res.redirect('/'); // redirect to homepage
});

module.exports = router;