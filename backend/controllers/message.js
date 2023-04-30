const sequelize=require('sequelize');
const userdetail= require('../models/Usertable')
const msgtable=require('../models/msgtable');







exports.Adduserchat=(async (req,res)=>{
    console.log(req.body.message);
    try {
   const response=await msgtable.create({
          message:req.body.message,
          userdetailId:req.user.id
      })
      console.log(response)
      
      res.send({success:true,msg:"successfull inserted"})
    } catch (error) {
      res.send({success:false,msg:error})
    }
   
})


exports.getdata = (async(req,res)=>{
  try{
  const userchat = await msgtable.findAll({
    include:[{
     model: userdetail,
     attributes: ['username']
    }]
  })
  console.log(userchat)
  res.send({success: true, userchat: userchat})
}
catch(err){
console.log(err)

}
})


exports.getNewData=(async (req,res)=>{
  try {
          console.log("i ma calling"+req.query.lastmessageid);
          const userchat= await msgtable.findAll({
            where: {
              id: { [sequelize.Op.gt]:req.query.lastmessageid}
            },
            include: [{
              model: userdetail,
              attributes: ['username']
            }]
          })
          console.log("ouput"+userchat.length)
          res.send({success:true,userchat:userchat});
  } catch (error) {
    
  }
 
})































