let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Tourney8 = require('../models/tourney8');

//check if authenticated
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/user/login');
    }
    next();
}

router.get('/', (req, res, next) => {
    res.render('content/bracket');
})

/* GET tourney page. */
router.get('/tourney', requireAuth, (req, res, next) => {
    res.render('content/tourney', {
        title: 'Tourney',
        username: req.user ? req.user.username : ''
    });
});

/* POST Tourney Page - Process the tourney page */
router.post('/tourney', requireAuth, (req, res, next) => {
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
                 'pair7': [
                    {
                        'playerName': req.body.player13, Wins: 0, Losses: 0
                    },
                    {
                        'playerName': req.body.player14, Wins: 0, Losses: 0
                    }
                ]
            //'winner1': req.body.player1, 'winner2': req.body.player1, loser1: req.body.player1
        }],
        userID: String
    }
    console.log(JSON.stringify(object))
    let newTourney8 = Tourney8(object)
    //Tourney = newTourney;

    Tourney8.create(newTourney8, (err, Tourney8) => {
        console.log(JSON.stringify(Tourney8));
        if (err) {
            res.end(err);
        } else {
            res.redirect('/bracket8');
        }
    })
});

/* GET bracket page. */
router.get('/:id', requireAuth, (req, res, next) => {
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
                    Tourney8: newTourney8
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.redirect('/errors/404');
    }
});
//});

/* POST bracket page */
router.post('/:id', /*requireAuth,*/ (req, res, next) => {
    try {
        let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        Tourney8.update({ _id:id}, {
            $push: {
                "round2": [{ 
                    "pair3": [{ 
                        "playerName": req.body.name, 
                        "Wins": req.body.win, 
                        "Losses": req.body.loss 
                    }] 
                }]
            }
        },{upsert:"true"},function(err){
            if (err){
               res.json({"text":"ERRROR"});                 
            } else{            
                res.json({"text":"HI"});
            }
        })
    }
    catch (err) {
        console.log(err);
    }


});

module.exports = router;