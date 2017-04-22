/*
  File Name: bracket.js
  Website Name: http://comp308-tournamentbracket.herokuapp.com/
  Description: routes to handle the 4 bracket page
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User

let Tourney4 = require('../models/tourney4');
//let Tournament4  = Tourney4.Tournament4;

//let Tourney = new Tourney4();
//check if authenticated
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/user/login');
    }
    next();
}

router.get('/', (req, res, next) => {
    if (req.user !== undefined) {
        Tourney4.find({ userID: req.user.username },
            (err, tournament) => {
                res.render('content/viewbracket', {
                    title: 'Tournament Bracket',
                    username: req.user ? req.user.username : '',
                    Tourney: tournament
                })
            })
    } else {
        Tourney4.find({},
            (err, tournament) => {
                res.render('content/viewbracket', {
                    title: 'Tournament Bracket',
                    Tourney: tournament,
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
router.get('/fourman', requireAuth, (req, res, next) => {
    User.find({
        username: req.user.username
    }, (err, user) => {
        res.render('content/fourman', {
            title: '4Man Tourney',
            username: req.user ? req.user.username : '',
        });
    })
});

/* POST Tourney Page - Process the tourney page */
router.post('/fourman', requireAuth, (req, res, next) => {

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
            'winner1': req.body.player1, 'status': req.body.status, 'title': req.body.fourManTitle
        }],
        'userID': req.body.id
    }
    //console.log(JSON.stringify(object))
    let newTourney = Tourney4(object)
    //Tourney = newTourney;

    Tourney4.create(newTourney, (err, Tourney4) => {
        console.log(JSON.stringify(Tourney4));
        if (err) {
            res.end(err);
        } else {
            res.redirect('/bracket/' + Tourney4._id);
            // res.json({test: "works"});
        }
    })
});

// router.post('/api/', (req, res, next)=>{
//     let tourney = req.body.tourney;

// });

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
        Tourney4.findById(id, (err, newTourney) => {
            console.log("Inside if");
            if (err) {
                console.log(err);
                res.end(error);
            } else {
                // show the game details view
                console.log(newTourney);
                res.render('content/bracket', {
                    title: 'Tournament Bracket',
                    username: req.user ? req.user.username : '',
                    Tourney: newTourney,
                    TourneyString: JSON.stringify(newTourney)
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

        Tourney4.findById(id, (err, newTourney) => {
            if (err) {
                res.end(error);
            } else {
                newTourney.rounds[0].round2[0].pair3[0].playerName = req.body.round2name1;
                newTourney.rounds[0].round2[0].pair3[1].playerName = req.body.round2name2;
                newTourney.rounds[0].winner1 = req.body.winner;
                Tourney4.update({ _id: id }, newTourney, function (err) {
                    if (err) {
                        res.end(err);
                    }
                    else {
                        res.redirect('/bracket/' + newTourney._id);
                    }
                })
            }
        })

    } catch (err) {
        console.log(err);
        res.redirect('/errors/404');
    }
});

// /* POST bracket page */
// router.post('/:id', requireAuth, (req, res, next) => {
//     try {
//         let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

//         Tourney4.update({ _id:id}, {
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