const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config')
// schema model
const user = require('../schemas/users');
const auth = require('../authenticate/auth');


router.get('/',async (req,res)=>{
    try{
        const users = await user.find({});
        res.json(users);
    }catch(e){
        res.send('fields do not match');
    }
})

// register a user
router.post('/users',async (req,res)=>{
    const {username,email,password} = req.body;
    try{
        if(email && username && password){
            const loggin_user = await user.findOne({email});
            if(loggin_user){
                return res.status(400).send('user already taken');
            }
            const users = new user({username,email,password});
            await users.save();
            const token = await jwt.sign({id:users._id},config.get('jwtSecret'),{expiresIn:9800});
            console.log(token);
            res.status(201).json({token,users});
       }else{
           res.status(400).send('please provide all fields');
       }
    }catch(e){
        res.send(e);
    }
})

// the opem login route 
router.post('/authenticate',async (req,res)=>{
        const  {email,password} = req.body;
    try{
        if(email && password){
            const users = await user.findOne({email});
            if(!users){
               return res.send('please register first not found in database');
            }
            const ver = await bcrypt.compare(password,users.password);
            if(!ver){
                return res.status(400).send('the password did not matched');
            }
            // generate a token when the user sign in if user is there in db
            const token = await jwt.sign({id:users._id},config.get('jwtSecret'),{expiresIn:9800});
            res.json({token,users});
       }else{
           res.status(400).send('please provide all fields');
       }
    }catch(e){
        res.send(e);
    }
})

// private route jwt verified express middleware
router.get('/auth/users',auth,async (req,res)=>{
    const user_authenticated = await user.findById(req.user).select('-password');
    res.send(user_authenticated);
})


module.exports = router;
