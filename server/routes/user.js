var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var User = require('../models/user');


// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
    console.log('get /user route');
    // check if logged in
    if (req.isAuthenticated()) {
        // send back user object from database
        console.log('logged in');
        res.send(req.user);
    } else {
        // failure best handled on the server. do redirect here.
        console.log('not logged in');
        // res.sendFile(path.join(__dirname, '../public/views/index.html'));
        res.send(false);
    }
});

//Finds all users except for the admin.
router.get('/allusers', function(req, res) {
    if (req.isAuthenticated()) {
        User.find({
            $or: [{
                level: 'user'
            }, {
                level: 'applicant'
            }]
        }, function(err, user) {
            res.send(user);
        });
    } else {
        res.send(false);
    }

});

//Deletes a user from the database. Searches by ID.
router.delete('/:id', function(req, res) {
    if (req.isAuthenticated()) {
        User.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.sendStatus(204);

        });
    } else {
        res.send(false);
    }
});

//Updates user information in the database.
router.put('/update/:id', function(req, res) {
    if (req.isAuthenticated()) {
        User.findOne({
            _id: req.params.id
        }, function(err, user) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            console.log(req.body);
            user.username = req.body.username;
            user.email = req.body.email;
            user.phoneNumber = req.body.phoneNumber;

            user.save(function(err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                console.log("/PUT user");
                res.send(user);
            });
        });
    } else {
        res.send(false);
    }
});

//Approves a user for website use by changing user level.
router.put('/approve/:id', function(req, res) {
    if (req.isAuthenticated()) {
        User.findOne({
            _id: req.params.id
        }, function(err, user) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }

            user.level = 'user';

            user.save(function(err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                console.log("/PUT user");
                res.send(user);
            });
        });
    } else {
        res.send(false);
    }
});
// clear all server session information about this user
router.get('/logout', function(req, res) {
    // Use passport's built-in method to log out the user
    console.log('Logged out');
    req.logOut();
    res.sendStatus(200);
});


module.exports = router;
