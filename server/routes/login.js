var express = require ('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.post('/', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/'
})
);
module.exports = router;
