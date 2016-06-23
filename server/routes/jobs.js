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
    job.save(function (err) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      res.sendStatus(201);
    });
});

module.exports = router;
