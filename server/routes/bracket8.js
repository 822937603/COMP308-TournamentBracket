/*
  File Name: bracket8.js
  Website Name: http://comp308-tournamentbracket.herokuapp.com/
  Description: routes to handle the 8 man tournament
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User

let Tourney8 = require('../models/tourney8');

//check if authenticated
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/user/login');
    }
    next();
}

router.get('/', (req, res, next) => {
    if (req.user !== undefined) {
        Tourney8.find({ userID: req.user.username },
            (err, newTourney) => {
                res.render('content/viewbracket8', {
                    title: 'Tournament Bracket 8',
                    username: req.user ? req.user.username : '',
                    Tourney8: newTourney
                })
            })
    } else {
        Tourney8.find({},
            (err, newTourney) => {
                res.render('content/viewbracket8', {
                    title: 'Tournament Bracket 8',
                    Tourney8: newTourney,
                    username: req.user ? req.user.username : ''
                })
            })
    }
})

/* GET tourney page. */
router.get('/tourney', requireAuth, (req, res, next) => {
    res.render('content/tourney', {
        title: 'Tourney',
        username: req.user ? req.user.username : ''
    });
});

/* GET tourney page. */
router.get('/eightman', requireAuth, (req, res, next) => {
    res.render('content/eightman', {
        title: '8Man Tourney',
        username: req.user ? req.user.username : ''
    });
});

/* POST Tourney Page - Process the tourney page */
router.post('/eightman', requireAuth, (req, res, next) => {
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
                ],
                'pair3': [
                    {
                        'playerName': req.body.player5, Wins: 0, Losses: 0
                    },
                    {
                        'playerName': req.body.player6, Wins: 0, Losses: 0
                    }
                ],
                'pair4': [
                    {
                        'playerName': req.body.player7, Wins: 0, Losses: 0
                    },
                    {
                        'playerName': req.body.player8, Wins: 0, Losses: 0
                    }
                ]
            }],
            'round2': [{
                'pair5': [
                    {
                        'playerName': req.body.player9, Wins: 0, Losses: 0
                    },
                    {
                        'playerName': req.body.player10, Wins: 0, Losses: 0
                    }
                ],
                'pair6': [
                    {
                        'playerName': req.body.player11, Wins: 0, Losses: 0
                    },
                    {
                        'playerName': req.body.player12, Wins: 0, Losses: 0
                    }
                ]
            }],
            'round3': [{
                'pair7': [
                    {
                        'playerName': req.body.player13, Wins: 0, Losses: 0
                    },
                    {
                        'playerName': req.body.player14, Wins: 0, Losses: 0
                    }
                ]
            }],
            'winner1': req.body.player1, 'status': req.body.status, 'title': req.body.eightManTitle
        }],
        userID: req.body.id
    }
    // console.log(JSON.stringify(object))
    let newTourney8 = Tourney8(object)
    //Tourney = newTourney;

    Tourney8.create(newTourney8, (err, Tourney8) => {
        console.log(JSON.stringify(Tourney8));
        if (err) {
            res.end(err);
        } else {
            res.redirect('/bracket8/' + Tourney8._id);
        }
    })
});

/* GET bracket page. */
router.get('/:id', (req, res, next) => {
    /* res.render('content/bracket', {
         title: 'Tournament Bracket',
         username: req.user ? req.user.username : '',
         Tourney: newTourney
     });*/
    console.log("before try");
    try {
        // get a reference to the id from the url
        let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        // find one game by its id
        console.log("before find");
        Tourney8.findById(id, (err, newTourney8) => {
            console.log("Inside if");
            if (err) {
                console.log(err);
                res.end(error);
            } else {
                // show the game details view
                //console.log(newTourney);
                res.render('content/bracket8', {
                    title: 'Tournament Bracket',
                    username: req.user ? req.user.username : '',
                    Tourney8: newTourney8,
                    TourneyString: JSON.stringify(newTourney8)
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.redirect('/errors/404');
    }
});

router.post('/:id', (req, res, next) => {
    try {
        console.log(req.params.id);
        let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        Tourney8.findById(id, (err, newTourney8) => {
            if (err) {
                res.end(error);
            } else {
                newTourney8.rounds[0].round2[0].pair5[0].playerName = req.body.round2name1;
                newTourney8.rounds[0].round2[0].pair5[1].playerName = req.body.round2name2;
                newTourney8.rounds[0].round2[0].pair6[0].playerName = req.body.round2name3;
                newTourney8.rounds[0].round2[0].pair6[1].playerName = req.body.round2name4;
                newTourney8.rounds[0].round3[0].pair7[0].playerName = req.body.round3name1;
                newTourney8.rounds[0].round3[0].pair7[1].playerName = req.body.round3name2;
                newTourney8.rounds[0].winner1 = req.body.winner;
                Tourney8.update({ _id: id }, newTourney8, function (err) {
                    if (err) {
                        res.end(err);
                    }
                    else {
                        res.redirect('/bracket8/' + newTourney8._id);
                    }
                })
            }
        })

    } catch (err) {
        console.log(err);
        res.redirect('/errors/404');
    }
});

//});

// /* POST bracket page */
// router.post('/:id', /*requireAuth,*/ (req, res, next) => {
//     try {
//         let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

//         Tourney8.update({ _id:id}, {
//             $push: {
//                 "round2": [{ 
//                     "pair3": [{ 
//                         "playerName": req.body.name, 
//                         "Wins": req.body.win, 
//                         "Losses": req.body.loss 
//                     }] 
//                 }]
//             }
//         },{upsert:"true"},function(err){
//             if (err){
//                res.json({"text":"ERRROR"});                 
//             } else{            
//                 res.json({"text":"HI"});
//             }
//         })
//     }
//     catch (err) {
//         console.log(err);
//     }


// });

module.exports = router;