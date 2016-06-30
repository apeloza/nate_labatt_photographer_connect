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
router.post('/', function(req, res) {
    if (req.isAuthenticated()) {
        var price = new Price(req.body);
        price.save(function(err) {
            if (err) {
                console.log(err);
                return;
            }
            res.sendStatus(201);
        });
    } else {
        res.send(false);
    }
});

router.put('/:id', function(req, res) {
    if (req.isAuthenticated()) {
        console.log("Hello");
        Price.findOne({
            _id: req.params.id
        }, function(err, price) {
            if (err) {
                console.log(err);
            }
            price.name = req.body.name;
            price.value = req.body.value;
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
router.delete('/:id', function(req, res) {
    if (req.isAuthenticated()) {
        Price.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            res.sendStatus(204);
        });
    } else {
        res.send(false);
    }
});
module.exports = router;
