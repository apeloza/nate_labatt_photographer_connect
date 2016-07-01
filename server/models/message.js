var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  username: { type: String},
  message: { type: String},
  timestamp: { type: Date, index: { unique: true }},
  msgType: {type: String}

});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
