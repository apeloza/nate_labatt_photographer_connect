var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
  line1: {type: String},
  city: {type: String},
  zip: {type: String},
  state: {type: String},
});

// var Address = mongoose.model('Address', AddressSchema);
//
// module.exports = Address;

module.exports = mongoose.model('Address', AddressSchema);
