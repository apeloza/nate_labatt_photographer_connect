var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmailSchema = require('./email').schema;

// Mongoose Schema
var JobSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    email: [EmailSchema],
    phone: {type: String, required: true},
    squareFeet: {type: String},
    dueDate: {type: Date},
    timeFrame: {type: String},
    afterDark: {type: Number},
    preferredDate: {type: Date},
    notes: {type: String},
    entryMethod: {type: String}

});


module.exports = mongoose.model('Job', JobSchema);
