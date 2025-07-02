var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var logger = require('./middleware/logger');
var timing = require('./middleware/timing');
// var auth = require('./middleware/auth');
// var validateBody = require('./middleware/validateBody');
var attachTimestamp = require('./middleware/attachTimestamp');
const errorHandler = require('./middleware/errorHandler');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tweetsRouter = require('./routes/tweets');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

var app = express();

// app.use(logger('dev'));

app.use(logger);
app.use(timing);
// app.use(auth('editor'));
// app.use(validateBody(['title', 'text'])); 
app.use(attachTimestamp);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);

app.use(errorHandler);

module.exports = app;