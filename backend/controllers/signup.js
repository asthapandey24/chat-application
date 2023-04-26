const Usertable = require('../models/Usertable')
const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');


exports.signup = async(req, res, next)=>{
    try {
        saltround=10;
        const password=req.body.password
        const isEmailExist=await Usertable.findOne({where:{email:req.body.email}})
        if(isEmailExist===null)
        {
            bcrypt.hash(password,saltround,async(err,hashpwd)=>{
                
                 Usertable.create({
                        username:req.body.name,
                        email:req.body.email,
                        mobile:req.body.phonenumber,
                        password:hashpwd
                    }).then((response)=>{
                        res.send({success:true,msg:"Insert successfully"})
                    }).catch(error=>{
                         throw new Error("something went wrong in insert data");
                    })

            })
        }else{
            res.send({success:false,msg:"Email-id Exist!!"})
        }
       
       
        
    } catch (error) {
        res.status(400).send({success:false,msg:error})
    }

}





function token(id,name)
{
    return jwt.sign({ userid: id, username:name }, 'secretkey');
}


 exports.login= async(req,res)=>{
    try {
        console.log("useremail",req.body.email)
   const data= await Usertable.findOne({where:{email:req.body.email}});

    if(data===null)
    {
        res.send({success:false,msg:"Email_id does not exits"});
    }else{
        
        bcrypt.compare(req.body.password,data.password, (err,response)=>{
            if(err)
            {
                throw new Error("Something went wrong in password")
            }
            console.log(response);
            if(response===true)
            {
                res.send({success:true,msg:"login Successfully",userdata:token(data.id,data.username)}) 
            }else{
                res.send({success:false, msg:"Password does not match"}) 
            }
                
           
        })
    }

} catch (error) {
        console.log(error);
}
    
 }






