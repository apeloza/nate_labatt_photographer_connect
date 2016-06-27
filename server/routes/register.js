var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/user');
var path = require('path');



// Handles POST request with new user data
router.post('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        Users.create(req.body, function(err, post) {
            if (err) {
                next(err);
            } else {

                res.redirect('/');
            }
        });
    } else {
        res.send(false);
    }
});


module.exports = router;
