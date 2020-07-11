'use strict';

var mongoose = require('mongoose');
var app = require('./app');
var port = 3300;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Laboratorio2', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected');
        app.listen(port, () => {
            console.log('El servidor está corriendo en el purto: ', port);
        });
    })
    .catch( err => {
        console.log('No se ha conectado', err);
    });