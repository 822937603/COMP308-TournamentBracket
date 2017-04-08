let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a model class
let Tourney4PairSchema = new Schema ({
    playerName: String,
    Wins: Number,
    Losses: Number
})
let Tourney4Schema = new Schema({
    rounds: [{
        round1: [{
            pair1: [Tourney4PairSchema],
            pair2: [Tourney4PairSchema]
        }],
        round2: [{
            pair3: [Tourney4PairSchema]
        }],
        winner1: String, winner2: String, loser1: String
    }],
    userID: String
},
{
    collection: "tourney"
});

module.exports = mongoose.model('Tourney4', Tourney4Schema);
