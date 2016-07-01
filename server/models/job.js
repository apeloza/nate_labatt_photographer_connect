var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmailSchema = require('./email').schema;//for when we have an array of emails
var AddressSchema = require('./address').schema;
var ChatSchema = require('./chat').schema;


// Mongoose Schema
var JobSchema = new Schema({
    name: {type: String, required: true},
    emails: {type: Array, required: true},
    phone: {type: String},
    address: AddressSchema,
    dueDate: {type: Date},
    squareFeet: {type: Object},
    timeFrame: {type: String},
    totalPrice: {type: Number},
    afterDark: {type: Object},
    preferredDate: {type: Date},
    notes: {type: String},
    entryMethod: {type: String},
    addons: {type: Array},
    jobStatus: {type: String},
    jobAcceptedBy: {type: String},
    chat: ChatSchema,

});


module.exports = mongoose.model('Job', JobSchema);
