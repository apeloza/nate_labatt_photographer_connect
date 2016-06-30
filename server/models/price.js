var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PriceSchema = new Schema({
  sqft: {type: Array, required: true},
  afterDark: {type: Array, required: true},
  addons: {type: Array}
});

module.exports = mongoose.model('Price', PriceSchema);
