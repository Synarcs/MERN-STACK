const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const user_schema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error();
            }
        }
    },
    password:{
        type:String,
        required:true,
    }
})

user_schema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10);
    }
    next();
})


const user = mongoose.model('users',user_schema);

module.exports =  user;