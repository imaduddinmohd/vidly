const mongoose=require('mongoose'); 
const express=require('express');
const {Movie,validateMovie}=require('../models/movies.js');
const {Genre}=require('../models/genres.js');

const router=express.Router();


router.get('/',async(req,res)=>{
   const movies=await Movie.find().sort('title');
   res.status(200).send(movies);
});

router.post('/',async(req,res)=>{
   const{error}=validateMovie(req.body);
   if(error){
    return res.status(400).send(error.details[0].message);
   }

   try{
    const genre=await Genre.findOne({_id:req.body.genreId});
    if(!genre)
    {
        return res.status(404).send('GENRE WITH GIVEN ID DOES NOT EXIST');
    } 

    const movie=new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    movie.save(); 
   return res.status(200).send(movie);

   }
   catch(err){
        return res.status(500).send('COULD NOT PROCESS THIS REQUEST');
   }


})



module.exports=router;