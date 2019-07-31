const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const isDocker = require('is-docker');


const app = express();

// connect to database
mongoose.connect(config.get('mongoURI'),{useNewUrlParser:true,useCreateIndex:true}).then(()=>console.log('connected to mongodb atlas')).catch(err=>console.log(err));     

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/items',require('./Modals/Routes_api/route'));
app.use('/api/',require('./Modals/Routes_api/user'));

// open route not protected

const port = process.env.Port || 5000;
app.listen(5000,()=>{
    console.log('server running');
})