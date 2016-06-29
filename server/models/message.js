var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  username: { type: String},
  message: { type: String},
  timestamp: { type: Date}

});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
