const {Genre,validateObjectId,validateGenre}=require('../models/genres.js');
const auth=require('../middleware/auth.js');
const mongoose=require('mongoose');
 const express=require('express'); 
 const router=express.Router(); 

 router.get('/',async(req,res)=>{
    const genres=await Genre.find();
   res.send(genres);
 }); 

 router.get('/:id',async (req,res)=>{
    if(!validateObjectId(req.params.id)){
       return res.status(400).send('BAD ID ');
      } 
   try{
    const genre=await Genre.findOne({_id:req.params.id});
    if(!genre){
        return res.status(404).send('Genre not found with given id');
    }
    res.status(200).send(genre);

   }catch(err){
          //  return res.status(400).send('not found')
   }
 });


 router.post('/',auth,async (req,res)=>{ 
    const {error}=validateGenre(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
           } 
           try{ 
           const genrePresent= await Genre.findOne({name:req.body.name});
            if(genrePresent){
            return    res.status(400).send('GENRE ALREADY PRESENT');
            }
        const genre=new Genre({
            name:req.body.name
                 }); 

        genre.save();
        res.status(200).send(genre);
        }
         catch(err){
            

        }
 });


  router.put('/:id',async (req,res)=>{
    if(!validateObjectId(req.params.id))
    {
        return res.status(400).send('BAD ID');

    } 
    const {error}=validateGenre(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }  
    
    try{ 
        
        const genre=await Genre.findById(req.params.id);
        if(!genre){
            return res.status(404).send('GENRE WITH GIVEN ID DOES NOT EXIST');

        }
        const genrePresent=await Genre.findOne({name:req.body.name});
        if(genrePresent){
            return res.status(400).send('GENRE ALREADY PRESENT');
        }

     
           genre.set({
                name: req.body.name
            }); 
          //  genre.save();
            res.status(200).send(genre);
            genre.save();
            return;
         
    } catch(err){
        return res.status(404).send('Duplicates not allowed');
    }


  }); 


  router.delete('/:id',async(req,res)=>{
    if(!validateObjectId(req.params.id)){
        return res.status(400).send('INCORRECT OBJECT ID, BAD REQUEST');
    } 

    //I need to find for the given id
    try{
      const deletedGenre=  await Genre.deleteOne({_id:req.params.id});
     if(deletedGenre.deletedCount==0){
        return res.status(404).send('Genre could not be found, Genre with given id not found');
     }
      res.status(200).send(deletedGenre);
      return;
    }
    catch(err){
     
    }

  })







 module.exports=router;







