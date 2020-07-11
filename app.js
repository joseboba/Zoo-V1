'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var adminRoutes = require('./routes/route.admin');


var app = express();

// Parseo de JavaScript a Json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configuración de CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/admin', adminRoutes);

module.exports = app;