let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a model class
let Tourney8PairSchema = new Schema ({
    playerName: String,
    Wins: Number,
    Losses: Number
})
let Tourney8Schema = new Schema({
    rounds: [{
        round1: [{
            pair1: [Tourney8PairSchema],
            pair2: [Tourney8PairSchema],
            pair3: [Tourney8PairSchema],
            pair4: [Tourney8PairSchema]
        }],
        round2: [{
            pair5: [Tourney8PairSchema],
            pair6: [Tourney8PairSchema]
        }],
        round3: [{
            pair7: [Tourney8PairSchema]
        }],
        winner1: String, winner2: String, loser1: String
    }],
    userID: String
},
{
    collection: "tourney8"
});

module.exports = mongoose.model('Tourney8', Tourney4Schema);
