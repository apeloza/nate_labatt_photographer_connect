var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var passport = require('./strategies/userStrategy');
var session = require('express-session');

// Route includes

//Body Parser
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public')));

//Passport Configuration

app.use(session({
  secret: 'secret',
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: {maxage: 60000, secure: false}
}));

//Start Passport
app.use(passport.initialize());
app.use(passport.session());

//Routes

//Mongo Connection

//Port
app.set('port', (process.env.PORT || 3000));

//Listen
app.listen(app.get('port'), function(){
  console.log('Listening on port: ' + app.get('port'));
});
