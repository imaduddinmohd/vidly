const mongoose=require('mongoose');
const express=require('express'); 
const {Customer}=require('../models/customers.js');
const {Movie}=require('../models/movies.js');
const {Rental,validateRental}=require('../models/rentals.js');


const router=express.Router();


router.get('/',async(req,res)=>{
    const rentals=await Rental.find().sort('-dateOut');
    res.status(200).send(rentals);
});

router.post('/',async(req,res)=>{
    const {error}=validateRental(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const customer=await Customer.findById(req.body.customerId);
    if(!customer){
        return res.status(404).send('CUSTOMER WITH GIVEN ID DOES NOT EXIST');
    } 
    const movie=await Movie.findById(req.body.movieId);
    if(!movie){
        return res.status(404).send('MOVIE WITH GIVEN ID DOES NOT EXIST');
    }  

    if(movie.numberInStock==0){
        return res.status(400).send('MOVIE NOT IN STOCK');
    }

    const rental=new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        }
    });

    rental.save();
    movie.numberInStock--;
    movie.save();
    return res.status(200).send(rental);

})





module.exports=router;