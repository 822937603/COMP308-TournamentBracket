let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a model class
let Tourney4Schema = new Schema({
    player1: {
        type: String,
        default: '',
        trim: true,
        required: 'player1 name is required'
    },
    player2: {
        type: String,
        default: '',
        trim: true,
        required: 'player2 name is required' 
    },
    player3: {
        type: String,
        default: '',
        trim: true,
        required: 'player3 name is required' 
    },
    player4: {
        type: String,
        default: '',
        trim: true,
        required: 'player4 name is required' 
    }
},
{
    collection: "tourney"
});

exports.Tourney4 = mongoose.model('Tourney4', Tourney4Schema);
