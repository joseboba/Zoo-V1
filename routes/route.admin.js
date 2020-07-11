'use strict';

var express = require('express');
var adminController = require('../controllers/controller.admin');

var api = express();

api.post('/saveManager', adminController.saveManager);
api.get('/searchManager', adminController.searchManager);
api.get('/getManagers', adminController.getManagers);
api.post('/login', adminController.login);
// Animals
api.put('/setAnimal/:id', adminController.setAnimal);
api.post('/searchAnimal', adminController.searchAnimal);


module.exports = api;