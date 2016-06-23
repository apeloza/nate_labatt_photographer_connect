var express = require('express');
var router = express.Router();
var passport = require('passport');
var Jobs = require('../models/job');
var path = require('path');


router.get('/', function(req, res, next) {

});

// Handles POST request with job data
router.post('/', function(req, res, next) {
    Jobs.create(req.body, function(err, post) {
         if(err) {
             next(err);
         } else {
             res.redirect('/');
         }
    });
});


module.exports = router;
