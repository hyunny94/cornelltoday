var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var event = new Schema({
    title: String,
    date: String
 
});

module.exports = mongoose.model('Event', event);