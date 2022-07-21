const mongoose=require('mongoose');
const Joi=require('joi');


const customerSchema=new mongoose.Schema({
  name:{
    type: String,
    minlength:3,
    maxlength:50,
    required:true,
  } ,
  isGold:{
    type:Boolean,
    required:true
  } ,
  phone:{
    type:String,
    minlength:10,
    maxlength:20,
    required:true
  }
}); 

const Customer=mongoose.model('Customer',customerSchema);

module.exports.Customer=Customer; 


module.exports.validateCustomer=function(customer){
    const customerJoiSchema={
        name:Joi.string().min(3).max(50).required(),
        isGold:Joi.boolean().required(),
        phone:Joi.string().min(10).max(20).required()

    } 
    
    
    return Joi.validate(customer,customerJoiSchema);

}