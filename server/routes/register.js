var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/user');
var path = require('path');



// Handles POST request with new user data
router.post('/', function(req, res, next) {
        Users.create(req.body, function(err, post) {
            if (err) {
                next(err);
            } else {
res.sendStatus(200);
            }
        });
});


module.exports = router;
