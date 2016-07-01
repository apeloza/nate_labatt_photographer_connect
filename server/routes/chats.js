var express = require('express');
var router = express.Router();
var passport = require('passport');
var Chat = require('../models/chat');
var Job = require('../models/job');
var path = require('path');

router.get('/:id', function(req, res) {
    if (req.isAuthenticated()) {
        Job.findOne({
            _id: req.params.id
        }, function(err, job) {
            if (err) {
                res.send(err);
            }
            console.log(job);
            res.send(job.chat);
        });
    } else {
        res.send(false);
    }
});

router.put('/date/:id', function(req, res, next) {
    if (req.isAuthenticated()) {
        Job.findOne({
            _id: req.params.id
        }, function(err, job) {
            job.chat.date = req.body.date;
            job.chat.time = req.body.time;
            job.jobStatus = 'finalized';
            job.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.send(job);
            });
        });
    } else {
        res.send(false);
    }
});

router.put('/:id', function(req, res, next) {
    if (req.isAuthenticated()) {
        console.log(req.body);
        Job.findOne({
            _id: req.params.id
        }, function(err, job) {
            job.chat.messages = req.body.messages;
            job.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.send(job);
            });
        });
    } else {
        console.log("False!");
        res.send(false);
    }
});

module.exports = router;
