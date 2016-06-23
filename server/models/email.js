var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailSchema = new Schema({
  email: { type: String},
});

var Email = mongoose.model('Email', EmailSchema);

module.exports = Email;
