var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var passport = require('./strategies/userStrategy');
var session = require('express-session');

// Route includes
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');
var jobs = require('./routes/jobs');
var mail = require('./routes/mail');

//Body Parser
app.use(bodyParser.json());

// Catch direct requests and make sure the user can view this page
// app.use('/views/user.html', user)

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
app.use('/register', register);
app.use('/user', user);
app.use('/jobs', jobs);
app.use('/mail', mail);
app.use('/*', index);

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
