var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
router.get('/', function(req, res) {
  console.log('get /user route');
  if(req.isAuthenticated()) {
    console.log('logged in');
    res.send(req.user);
  } else {
    console.log('not logged in');
    res.send(false);
  }
});

module.exports = router;
