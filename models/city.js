const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: String,
    food: [{
        name: String,
        price: Number
    }]
})

module.exports = mongoose.model('City', citySchema)