var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
messages: {type: Array, required: true},
date: {type: Date},
jobID: {type: String}
});

module.exports = mongoose.model('Chat', ChatSchema);
