var jwt = require('jsonwebtoken');
const usertable=require('../models/Usertable')
const path=require('path');




 exports.authentication= async(req,res,next)=>{
    try {

        const token=req.header('Authorization');
        var decoded = jwt.verify(token, 'secretkey')
        
       const userdetail = await  usertable.findByPk(decoded.userid);
       if(userdetail===null)
       {
            console.log("this is not valid user");
             res.status(401).send({success:false,msg:"user not found"});
       }else{
            req.user=userdetail
            next();
       }
    } catch (error) {
        res.status(401).send({success:false,msg:"user is not valid"});
          
        
    }
}