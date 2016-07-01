var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessageSchema = require('./message').schema;

var ChatSchema = new Schema({
messages: [MessageSchema],
date: {type: String},
time: {type: String}
});

module.exports = mongoose.model('Chat', ChatSchema);
