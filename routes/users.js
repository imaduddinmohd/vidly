const mongoose=require('mongoose');
const {User,validateUser}=require('../models/users.js');
const bcrypt=require('bcrypt');
const express=require('express');


const router=express.Router();

router.get('/',async(req,res)=>{
    const users=await User.find();
    return res.status(200).send(users);
})



router.post('/',async(req,res)=>{
    const {error}=validateUser(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);   
    }

    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).send('USER ALREADY EXISTS');
    } 

    user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });  

    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);

    user.save();
    return res.header('x-auth-token',user.genAuthToken()).status(200).send(user);

}); 



module.exports=router;