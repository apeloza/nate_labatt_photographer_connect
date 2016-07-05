var express = require('express');
var router = express.Router();
var passport = require('passport');
var Price = require('../models/price');

//Returns the entire prices object which contains all set prices.
router.get('/', function(req, res) {
    if (req.isAuthenticated()) {
        Price.findOne({}, function(err, price) {
            if (err) {
                res.send(err);
            }
            res.send(price);
        });
    } else {
        res.send(false);
    }
});

//Updates addons with new data. Addons is an array of objects with a value and a name.
router.put('/addons', function(req, res) {
    if (req.isAuthenticated()) {
        Price.findOne({}, function(err, price) {
            price.addons = req.body;
            price.save(function(err) {
                if (err) {
                    console.log(err);
                    return;
                }
            });

            res.sendStatus(201);
        });
    } else {
        res.send(false);
    }
});

//Updates pricing. All pricing is stored in one large Price object.
router.put('/', function(req, res) {
    if (req.isAuthenticated()) {
        Price.findOne({}, function(err, price) {
            if (err) {
                console.log(err);
            }
            price.sqft = req.body.sqft;
            price.afterDark = req.body.afterDark;
            price.addons = req.body.addons;
            console.log(price);
            price.save(function(err) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.sendStatus(201);
            });
        });
    } else {
        res.send(false);
    }
});


module.exports = router;
