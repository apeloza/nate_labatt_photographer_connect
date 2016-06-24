var express = require('express');
var router = express.Router();
var passport = require('passport');
var Job = require('../models/job');
var path = require('path');

router.get('/', function(req, res, next) {
  Job.find({}, function (err, jobs) {
  res.send(jobs);
  });
});

// Handles POST request with job data
router.post('/', function(req, res, next) {
    var job = new Job(req.body);
    console.log('req.body', req.body);
    job.save(function (err) {
      if (err) {
        res.sendStatus(500);
        console.log(err);
        return;
      }

      res.sendStatus(201);
    });
});
router.put('/takejob', function(req, res) {

});

router.get('/alljobs', function (req, res) {
  Job.find({}, function (err, data) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(data);
  });
});

module.exports = router;
