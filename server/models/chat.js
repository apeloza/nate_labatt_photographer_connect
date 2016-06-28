var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
messages: {type: Array},
date: {type: Date}
});

module.exports = mongoose.model('Chat', ChatSchema);
