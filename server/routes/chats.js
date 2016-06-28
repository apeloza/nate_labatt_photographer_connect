var express = require('express');
var router = express.Router();
var passport = require('passport');
var Job = require('../models/chat');
var path = require('path');

router.get('/:id', function(req, res, next){
if(req.isAuthenticated()){

} else {
  res.send(false);
}
});

router.put('/', function(req,res, next){
  if(req.isAuthenticated()){

  } else {
    res.send(false);
  }
});

router.post('/', function(req, res, next){
  if(req.isAuthenticated()){

  } else {
    res.send(false);
  }
});

module.exports = router;
