'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = Schema ({
    name : String,
    position : String,
    phone : Number,
    sex : String,
    email: String,
    password: String,
    animals: [{
        name: String,
        kind: String,
        age: String,
        advanceName: String
    }]
});


module.exports = mongoose.model('admin', adminSchema);