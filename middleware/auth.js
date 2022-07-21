const jwt=require('jsonwebtoken');

 module.exports=function(req,res,next){
    const token=req.header('x-auth-token');
    if(!token){
       return res.status(401).send('ACCESS DENIED, NO TOKEN PROVIDED');
    } 
   try{
   const decoded= jwt.verify(token,'jwtprivatekey');
   req.user=decoded;
   next();
   }
   catch(err){
    return res.status(400).send('INVALID TOKEN');
   }
 }