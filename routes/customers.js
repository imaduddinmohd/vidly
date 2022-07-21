const mongoose=require('mongoose');
const express=require('express');
const {Customer,validateCustomer}=require('../models/customers.js');
const { Genre } = require('../models/genres.js');


const router=express.Router(); 

router.get('/',async(req,res)=>{
    try{
       const customers= await Customer.find().sort('name');
       return res.status(200).send(customers);
    }
    catch(err){
        return res.status(500).send('Could not process the request');

    }
}) 


router.get('/:id',async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
       return  res.status(400).send('ID IS INCORRECT');
    } 
    try{
        const customer=await Customer.findById(req.params.id);
        if(!customer){
            return res.status(404).send('CUSTOMER WITH GIVEN ID DOES NOT EXIST');
        } 
        return res.status(200).send(customer);
    }
    catch(err){
   return res.status(500).send('COULD NOT PROCESS THIS REQUEST');
    }

});


router.post('/',(req,res)=>{
    const {error}=validateCustomer(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);

    } 
    try{
        const customer=new Customer({
            name:req.body.name,
            isGold:req.body.isGold,
            phone:req.body.phone
        }); 
        customer.save();
        res.status(200).send(customer);

    }
    catch(err){
       return res.status(500).send('COULD NOT PROCESS THIS REQUEST');

    }
});

router.put('/:id',async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
     return res.status(400).send('ID IS INCORRECT');        
    } 

   const customer=await Customer.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            isGold:req.body.isGold,
            phone:req.body.phone
        }
    },{new:true});  
    if(!customer){
        return res.status(404).send('CUSTOMER WITH GIVEN ID DOES NOT EXIST');
    }
    return res.status(200).send(customer);
});


router.delete('/',async(req,res)=>{
   const customers= await Customer.deleteMany();
   res.status(200).send(customers);
});

router.delete('/:id',async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(404).send('CUSTOMER WITH GIVEN ID DOES NOT EXIST');  
    } 

   const customer=await Customer.deleteOne({_id:req.params.id});
   res.status(200).send(customer);
})


module.exports=router;