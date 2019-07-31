const mongoose = require('mongoose');
const express = require('express');

const list_schema = new mongoose.Schema({
    item:{
        type:String,
        required:true,
        trim:true,
        minlength:2
    },
    Date:{
        type:Date,
        default:Date.now,
        required:false
    },
    price:{
        type:Number,
        required:false,
        validate(value){
            if(!typeof(value)===Number){
                throw new Error();
            }
        }
    }
})


const list_items = mongoose.model('items',list_schema);

module.exports =  list_items;