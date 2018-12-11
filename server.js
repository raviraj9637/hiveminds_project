
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var consolidate = require('consolidate');
var path = require('path');
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/client')));

//view engine setup
app.engine('html',consolidate.swig);
app.set('views', path.join(__dirname,'/views'));
app.set('view engine','html');

//Actual Routes
var auth = require('./routes/api/auth');
var question = require('./routes/api/question');

//Actual Routes
app.use('/api/auth', auth);
app.use('/api/question', question);

//Mongo db configuration
var key = require('./dbsetup/dburl');
var db = require('./dbsetup/dburl').mongoURL

//connect to MongoDB mlab
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log(err))

// Passport Middleware 
app.use(passport.initialize());

//config for passport 'jwt' strategy
require('./strategies/jsonwtStrategy')(passport);

app.get('/',function(req, res){
    console.log('this is testing');    
    res.sendfile(__dirname+'/client/index.html');
});

//port and server listen method
var port = 3000;
var hostname = '127.0.0.1';
app.listen(port, (err) => console.log(`server is running on ${hostname}:${port}`));