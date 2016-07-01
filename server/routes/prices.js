var express = require('express');
var router = express.Router();
var passport = require('passport');
var Price = require('../models/price');

router.get('/', function(req, res) {
    if (req.isAuthenticated()) {
        Price.find({}, function(err, price) {
            if (err) {
                res.send(err);
            }
            res.send(price);
        });
    } else {
        res.send(false);
    }
});
router.put('/addons', function(req, res) {
    if (req.isAuthenticated()) {
        Price.findOne({}, function(err, price) {
            console.log(price);
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

router.put('/', function(req, res) {
    if (req.isAuthenticated()) {
        console.log("Hello");
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
router.delete('/', function(req, res) {
    if (req.isAuthenticated()) {
      console.log('Body: ' + req.body);
        Price.findOne({}, function(err, price) {
            if (err) {
                console.log(err);
            }
            price.addons = req.body;
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
