var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var passport = require('./strategies/userStrategy');
var session = require('express-session');

// Route includes
var createuser = require('./routes/createuser');
var login = require('./routes/login');
var user = require('./routes/user');

//Body Parser
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, './public')));
app.get('/*', function(req, res) {
  console.log('request params', req.params);
var file = req.params[0] || 'views/index.html';
res.sendFile(path.join(__dirname, "./public", file));
});


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
app.use('/createuser', createuser);
app.use('/user', user);
app.use('/login', login);

//Mongo Connection
var databaseURI = 'mongodb://admin:natelabatt@ds011873.mlab.com:11873/photographerconnectusers';
mongoose.connect(databaseURI);
mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open ', databaseURI);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose error connecting ', err);
});

//Port
app.set('port', (process.env.PORT || 3000));

//Listen
app.listen(app.get('port'), function(){
  console.log('Listening on port: ' + app.get('port'));
});
