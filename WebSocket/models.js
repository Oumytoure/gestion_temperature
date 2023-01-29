const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Temperature: {type: String},
    Humidity: {type: String},
    Date: {type: String},
    Heure: {type: String}
},
{
    collection: 'temphums'
});

module.exports = mongoose.model('temphums', schema);