var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PriceSchema = new Schema({
  name: {type: String, required: true},
  value: {type: String, required: true},
  group: {type: String}
});

module.exports = mongoose.model('Price', PriceSchema);
