const mongoose = require('mongoose');
const express = require('express');
const userSchema = new mongoose.Schema({
    username:{
        type:String
    },
    mobileno:{
        type:String
    },
    dob:{
        type:String
    },
    name:{
        type:String
    },
    number:{
        type:String
    },
    date:{
        type:String,
    },
    pass:{
        type:String
    },
    otp:{
        type:String
    }
});
const Details = mongoose.model('Details' , userSchema);
module.exports = Details;
