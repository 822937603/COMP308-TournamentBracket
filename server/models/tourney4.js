let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a model class
let Tourney4Schema = new Schema({
    rounds: [{
        round1: [{
            pair1: [
                {
                    player1: String, Wins: 0, Losses: 0
                },
                {
                    player2: String, Wins: 0, Losses: 0
                }
                ],
             pair2: [
                {
                    player3: String, Wins: 0, Losses: 0
                },
                {
                    player4: String, Wins: 0, Losses: 0
                }
                ]
        }],
        round2: [{
            pair1: [
                {
                    player1: String, Wins: 0, Losses: 0
                },
                {
                    player2: String, Wins: 0, Losses: 0
                }
            ]
        }],
        winner1: String, winner2: String, loser1: String
    }]
},
{
    collection: "tourney"
});

module.exports = mongoose.model('Tourney4', Tourney4Schema);
