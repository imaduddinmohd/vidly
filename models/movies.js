const mongoose=require('mongoose');
const Joi=require('joi'); 
const number = require('joi/lib/types/number');

const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:50,
       required:true
        
    }
});

const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50,
        trim:true
    },
    genre:{
        type:genreSchema,
        required:true
    } ,
    numberInStock:{
        type:Number,
        min:0,
        max:255,
        required:true
    },
    dailyRentalRate:{
        type:Number,
        min:0,
        max:255,
        required:true
    }
    
});

const Movie=mongoose.model('Movie',movieSchema);



function movieValidate(movie){
    const movieJoiSchema={
        title:Joi.string().min(3).max(50).required(),
        genreId:Joi.string().required(),
        numberInStock:Joi.number().min(0).max(255).required(),
        dailyRentalRate:Joi.number().min(0).max(255).required()
    };

    return Joi.validate(movie,movieJoiSchema);
}

module.exports.Movie=Movie;
module.exports.validateMovie=movieValidate;