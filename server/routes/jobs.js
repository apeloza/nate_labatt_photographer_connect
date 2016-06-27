var express = require('express');
var router = express.Router();
var passport = require('passport');
var Job = require('../models/job');
var path = require('path');

router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        Job.find({}, function(err, jobs) {
            res.send(jobs);
        });
    } else {
        res.send(false);
    }
});

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
router.put('/:id', function(req, res) {
<<<<<<< HEAD
  console.log(req.body);

=======
  if(req.isAuthenticated()){
    console.log(req.body);
>>>>>>> 0dab11b132d79761442d0d3261188836c6d11bea
    Job.findOne({
        _id: req.params.id
    }, function(err, job) {
        job.jobStatus = "accepted";
        job.jobAcceptedBy = req.body.username;
        job.save(function(err) {
<<<<<<< HEAD
          if(err){
            console.log(err);
          }
          //res.send(job);
=======
            if (err) {
                console.log(err);
            }
            res.send(job);
>>>>>>> 0dab11b132d79761442d0d3261188836c6d11bea
        });
    });
  } else {
    res.send(false);
  }
});

router.put('/reopen/:id', function(req, res) {
  if(req.isAuthenticated()){
    console.log(req.body);
    Job.findOne({ //can use findById too
        _id: req.params.id
    }, function(err, job) {
        job.jobStatus = 'open';
        job.jobAcceptedBy = '';
        job.save(function(err) {
            if (err) {
                console.log(err);
            }
            res.send(job);
        });
    });
  } else {
    res.send(false);
  }
});

router.delete('/:id', function(req, res) {
  if(req.isAuthenticated()){
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
router.get('/alljobs', function(req, res) {
  if(req.isAuthenticated()){
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
