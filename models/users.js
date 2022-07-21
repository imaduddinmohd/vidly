const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const Joi=require('joi');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,  
        min:8,
        max:1050
    }
}); 

userSchema.methods.genAuthToken=function(){
    const token=jwt.sign({_id:this._id},'jwtprivatekey');
    return token;

}

const User=mongoose.model('User',userSchema);

function validateUser(user){
    const userJoiSchema={
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().required().email(),
        password:Joi.string().min(8).max(255).required()
    };

    return Joi.validate(user,userJoiSchema);
}

module.exports.User=User;
module.exports.validateUser=validateUser;






