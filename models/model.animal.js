'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var animalSchema = Schema ({       
        name: String,
        kind: String,
        age: String,
        advanceName: String
});

module.exports = mongoose.model('animal', animalSchema);