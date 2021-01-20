var express = require('express');
var result = require('dotenv').config();
var path = require('path');
var app = express();
var mysql = require('mysql');
var mongoose   = require('mongoose');
mongoose.connect('mongodb+srv://braunker:braunker51@cluster0.4chpf.mongodb.net/articulos?retryWrites=true&w=majority', {useNewUrlParser:true});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // bodyParser, this will let us get the data from a POST
app.use(bodyParser.json());

var apiRouter = require('./routes/api-router');
var whRouter = require('./routes/shopify-wh-router');
app.use('/', apiRouter);
app.use('/shopify', whRouter);

var userHttp = require('http').Server(app);
var userPort = process.env.PORT || 8080;  // set our port
userHttp.listen(userPort, function(){
  console.log('user server running @ port:'+userPort);
});
