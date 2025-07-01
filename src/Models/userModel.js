const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
    },
    contact:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    refresh_token:{
        type:String,
    },
    saved_items:{
        type:Array,
    }

});

const userModel = mongoose.model('user',userSchema);

module.exports = {
    userModel,
}