const mongoose=require('mongoose');
const express=require('express'); 
const genreRouter=require('./routes/genres.js');
const customerRouter=require('./routes/customers.js');
const movieRouter=require('./routes/movies.js');
const rentalRouter=require('./routes/rentals.js');
const userRouter=require('./routes/users.js');
const authRouter=require('./routes/auth.js');
const app=express();



  mongoose.connect('mongodb+srv://vidlyuser:hzaafkeieyza@cluster0.mtgergr.mongodb.net/vidly',{ useNewUrlParser: true },{ useUnifiedTopology: true })
  .then(()=> console.log('Connected to MongoDb Database'))
  .catch((err)=>{
    console.log('Could not connect to Mongodb')
  });
  

  app.get('/api/imad',(req,res)=>{
    res.send('BISMILLAH');
  })

  app.use(express.json());
  app.use('/api/genres',genreRouter);
  app.use('/api/customers',customerRouter);
  app.use('/api/movies',movieRouter);
  app.use('/api/rentals',rentalRouter);
  app.use('/api/users',userRouter); 
  app.use('/api/auth',authRouter);
 
  

  const port=process.env.PORT|| 3000; 
 // console.log(process.env.PATH)
  app.listen(port,()=>{
    console.log('Listening on port ',port);
  }); 

