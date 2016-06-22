var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/user');
var path = require('path');

router.post('/', function(req, res, next) {
  console.log(req.body);
  Users.create(req.body, function(err, post) {
    if(err) {
      next(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
