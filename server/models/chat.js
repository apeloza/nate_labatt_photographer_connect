var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
messages: {type: Array},
date: {type: String},
time: {type: String}
});

module.exports = mongoose.model('Chat', ChatSchema);
