const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// schema model
const modals = require('../schemas/mongoose');
const auth = require('../authenticate/auth');


router.get('/display',async (req,res)=>{
    try{
        const data = await modals.find({})       
        res.json(data);
    }catch(e){
        res.send(e);
    }
})

router.post('/display',auth,async (req,res)=>{
   try{
       const {item} = req.body;
       const items = new modals({item});
       await items.save();
       res.json(items);
   }catch(e){
       res.json(e);
   }
})

router.delete('/display/:id',auth,async (req,res)=>{
    try{
        const user = await modals.findByIdAndRemove(req.params.id);
        res.json(user)
    }catch(e){
        res.json(e);
    }
})


router.delete('/delete',async (req,res)=>{
    const body ={ item:'Double Cheese Taco',
    comp:'Sym',
    status:'register',}
        try{
            const user = await modals.findByIdAndDelete('5d1c45859b560817fc39734f');
            const data = await modals.find({});
            res.json(user);
        }catch(e){
            res.json(e);
        }
})  


module.exports = router;
