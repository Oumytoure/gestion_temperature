 const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let infoCapteurs = new Schema({
    temp: { type: Number},
    hum: { type: Number },
    date: { type: Date },
    heure: { type: Date },
    
}, {timestamps: true},
{
    collection: 'recupDataCateur'
})

infoCapteurs.plugin(uniqueValidator, { message: 'Compte déjà existant !' });

module.exports = mongoose.model('recupDataCateur', infoCapteurs)
 