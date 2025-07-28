const mongoose = require('mongoose');
const myModel = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    }
});
const Valid = mongoose.model('Valid' , myModel);
module.exports = Valid;