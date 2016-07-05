var express = require('express');
var router = express.Router();
var passport = require('passport');
var Job = require('../models/job');
var path = require('path');


// Handles POST request with job data
router.post('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        var job = new Job(req.body);
        console.log('req.body', req.body);
        job.save(function(err) {
            if (err) {
                res.sendStatus(500);
                console.log(err);
                return;
            }

            res.sendStatus(201);
        });
    } else {
        res.send(false);
    }
});

//Updates a job to accepted status. Checks to see if the job is taken before changes are made.
router.put('/:id', function(req, res) {

    console.log(req.body);


    if (req.isAuthenticated()) {
        console.log(req.body);

        Job.findOne({
            _id: req.params.id
        }, function(err, job) {
            if (job.jobStatus == "open") {
                job.jobStatus = "accepted";
                job.jobAcceptedBy = req.body.username;
                job.save(function(err) {

                    if (err) {
                        console.log(err);
                    }
                    res.send(job);

                });
            } else {
                res.sendStatus(500);
            }
        });
    } else {
        res.send(false);
    }
});

//Sets a job's status to 'finished'.
router.put('/finish/:id', function(req, res) {
    if (req.isAuthenticated()) {
        Job.findOne({
            _id: req.params.id
        }, function(err, job) {
            job.jobStatus = 'finished';
            job.save(function(err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                res.send(job);
            });
        });
    } else {
        res.send(false);
    }
});

//Re-opens a job so that photographers can accept it again.
router.put('/reopen/:id', function(req, res) {
    var id = req.params.id;
    if (req.isAuthenticated()) {
        console.log(req.body);

        Job.findOne({
            _id: id
        }, function(err, job) {
            job.jobStatus = "open";
            job.jobAcceptedBy = '';
            job.save(function(err) {

                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                res.sendStatus(204);

            });
        });
    } else {
        res.send(false);
    }
});

router.put('/update/:id', function(req, res) {
    var id = req.params.id;
    if (req.isAuthenticated()) {
        Job.findOne({
            _id: id
        }, function(err, job) {
            job.address = req.body.address;
            job.name = req.body.name;
            job.totalPrice = req.body.totalPrice;
            job.save(function(err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                res.sendStatus(204);
            });
        });
    } else {
        res.send(false);
    }
});

//Deletes a job, searches by ID.
router.delete('/:id', function(req, res) {
    if (req.isAuthenticated()) {
        Job.findByIdAndRemove(req.params.id, function(err) {
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

//Gets all jobs.
router.get('/alljobs', function(req, res) {
    if (req.isAuthenticated()) {
        Job.find({}, function(err, data) {
            if (err) {
                res.sendStatus(500);
                return;
            }

            res.send(data);
        });
    } else {
        res.send(false);
    }
});

module.exports = router;
