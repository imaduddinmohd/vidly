 const mongoose=require('mongoose');
 const Joi=require('joi');



 const genreSchema=new mongoose.Schema({
    name:{
      type:String,
      minlength:3,
      maxlength:50,
      required:true,
      unique:true
    }
 });

 const Genre=mongoose.model('Genre',genreSchema);
 

 module.exports.Genre=Genre;
 module.exports.validateObjectId=function(id){
    if(!mongoose.Types.ObjectId.isValid(id))
       return false;
     return true;
 };

 module.exports.validateGenre=function(genre){
  const genresJoiSchema={
    name: Joi.string().min(3).max(50).required()
  }
  
  return Joi.validate(genre,genresJoiSchema);
 };
