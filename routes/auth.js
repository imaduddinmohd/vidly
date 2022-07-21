const express=require('express');
const {User}=require('../models/users.js');
const Joi=require('joi'); 
const bcrypt=require('bcrypt');
const router=express.Router(); 

router.post('/',async(req,res)=>{
    const {error}=validateUser(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
   } 
   let user=await User.findOne({email:req.body.email});
   if(!user){
    return res.status(400).send('INVALID USERNAME Or PASSWORD');
  } 

  if(! await bcrypt.compare(req.body.password,user.password)){
    return res.status(400).send('INVALID USERNAME Or PASSWORD');
  } 

  return res.status(200).send('USER LOGGED IN SUCCESSFULLY');
})



function validateUser(user){
    const userJoiSchema={
        email:Joi.string().required().email(),
        password:Joi.string().min(8).required()
    }; 

    return Joi.validate(user,userJoiSchema);
}



module.exports=router;