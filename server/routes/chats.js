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
            res.send(job);
        });
    } else {
        res.send(false);
    }
});

router.put('/date/:id', function(req, res) {
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
                res.sendStatus(200);
            });
        });
    } else {
        res.send(false);
    }
});

router.put('/:id', function (req, res) {
    if (req.isAuthenticated()) {
  var id = req.params.id;
  var message = req.body; // {object}
  var exists = false;
console.log('req.body', req.body);
 Job.findById(id, function (err, job) {
    if (err) {
      res.sendStatus(500);
      return;
    }
console.log('job', job);
if (job){
  job.chat.messages.forEach(function(item,index){
    if (item.timestamp==message.timestamp) {
      exists = true;
    }
  });

  if(!exists){
    job.chat.messages.push(message);
}
    job.save(function (err) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      res.sendStatus(204);
    });
  }
  });
  }
});


module.exports = router;
