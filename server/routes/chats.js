var express = require('express');
var router = express.Router();
var passport = require('passport');
var Chat = require('../models/chat');
var path = require('path');

router.get('/:id', function(req, res, next) {
    if (req.isAuthenticated()) {

    } else {
        res.send(false);
    }
});

router.put('/date/:id', function(req, res, next) {
    if (req.isAuthenticated()) {
        Chat.findOne({
            _id: req.params.id
        }, function(err, chat) {
            chat.date = req.body.date;
            chat.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.send(chat);
            });
        });
    } else {
        res.send(false);
    }
});

router.post('/', function(req, res, next) {
    if (req.isAuthenticated()) {
      var chat = new Chat(req.body);
      chat.save(function(err){
        if (err){
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

module.exports = router;
